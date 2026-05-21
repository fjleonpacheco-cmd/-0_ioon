# Hoja de Ruta: Implementación del Stack ioon

> **Objetivo:** Llevar el stack operativo de ioon de documento a realidad funcional.
> **Tiempo estimado:** 2–3 semanas (ritmo de 2–3 horas/día)
> **Presupuesto mensual resultado:** ~MXN $2,000–2,500/mes

---

## Visión General

```
┌─────────────────────────────────────────────────────────────────┐
│                     STACK ioon — v2.2                           │
│                                                                 │
│  📱 INTERFAZ         🧠 INTELIGENCIA      🎨 CREACIÓN          │
│  ┌──────────────┐   ┌──────────────┐    ┌──────────────┐       │
│  │ Telegram Bot │   │  ii-agent    │    │   Figma      │       │
│  │ + Whisper    │   │  Gemini/     │    │   OpenArt    │       │
│  │   (STT)      │   │  Claude      │    │              │       │
│  └──────┬───────┘   └──────┬───────┘    └──────────────┘       │
│         │                  │                                    │
│         ▼                  ▼                                    │
│  ┌─────────────────────────────────────────────────────┐       │
│  │              ⚙️ n8n (ORQUESTADOR)                   │       │
│  │         Conecta todo. Webhooks, APIs, lógica.       │       │
│  └──────────┬──────────────────────┬───────────────────┘       │
│             │                      │                           │
│             ▼                      ▼                           │
│  ┌──────────────────┐   ┌──────────────────┐                  │
│  │    Mautic         │   │    GitHub         │                  │
│  │  CRM & Marketing  │   │  Mono-repo       │                  │
│  └──────────────────┘   └──────────────────┘                  │
│                                                                 │
│  ════════════════════════════════════════════════════════       │
│  🏗️ CIMIENTOS: Coolify → Hetzner Cloud VPS → ioon.mx          │
│  ════════════════════════════════════════════════════════       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Fase 0: Prerrequisitos (Día 1)

> **Qué:** Tener las cuentas y accesos necesarios antes de tocar infraestructura.

### Checklist

- [ ] **Cuenta Hetzner Cloud** — Registrarse en [hetzner.com/cloud](https://www.hetzner.com/cloud)
  - Necesitas: tarjeta de crédito/débito internacional
  - Plan recomendado: **CX32** (4 vCPU, 8 GB RAM, 80 GB SSD) — ~€8.49/mes
  - Ubicación: **Falkenstein (FSN1)** o **Helsinki (HEL1)** (mejor latencia para MX)
- [ ] **Dominio ioon.mx** — Comprado y con acceso al panel DNS
  - Apuntar `A record` del dominio al IP del VPS (se configura en Fase 1)
- [ ] **Cuenta GitHub** — Repo `0_ioon` ya existe ✅
- [ ] **SSH Key** generada y añadida a Hetzner
  - `ssh-keygen -t ed25519 -C "ioon@hetzner"` (si no tienes una)
- [ ] **Cuenta OpenAI** — Para Whisper API (transcripción de voz)
  - Obtener API key en [platform.openai.com](https://platform.openai.com)
- [ ] **Cuenta Figma** — Free Starter plan (ya la tienen probablemente)
- [ ] **API key de Gemini** — En [aistudio.google.com](https://aistudio.google.com)

### Resultado esperado
Tienes: VPS contratado, dominio apuntando, SSH key lista, API keys de IA obtenidas.

---

## Fase 1: Cimientos — Coolify (Días 2–3)

> **Qué:** Instalar Coolify en el VPS. Coolify es el PaaS que desplegará todo lo demás.

### Pasos

1. **Crear el VPS en Hetzner**
   ```bash
   # Desde el panel de Hetzner Cloud:
   # - Tipo: CX32
   # - OS: Ubuntu 24.04
   # - SSH Key: la que generaste
   # - Nombre: ioon-vps
   ```

2. **Conectarse al VPS**
   ```bash
   ssh root@<IP_DEL_VPS>
   ```

3. **Instalar Coolify** (un solo comando)
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```

4. **Configurar dominio**
   - En tu panel DNS (donde compraste ioon.mx), agregar:
     ```
     A     @           → <IP_DEL_VPS>
     A     *.apps      → <IP_DEL_VPS>
     A     coolify     → <IP_DEL_VPS>
     ```
   - Acceder a Coolify en `http://<IP_DEL_VPS>:8000`
   - Configurar el dominio principal: `coolify.ioon.mx`
   - Habilitar SSL automático (Let's Encrypt)

5. **Verificar acceso**
   - `https://coolify.ioon.mx` debe cargar el dashboard de Coolify

### Resultado esperado
Coolify corriendo en `coolify.ioon.mx` con SSL. Listo para desplegar servicios.

### ⏱️ Tiempo estimado: 1–2 horas

---

## Fase 2: Automatización — n8n (Días 3–4)

> **Qué:** Desplegar n8n vía Coolify. Es el orquestador central que conectará todo.

### Pasos

1. **En Coolify → New Resource → Docker**
   - Imagen: `n8nio/n8n:latest`
   - Dominio: `n8n.ioon.mx`
   - Variables de entorno:
     ```env
     N8N_HOST=n8n.ioon.mx
     N8N_PORT=5678
     N8N_PROTOCOL=https
     WEBHOOK_URL=https://n8n.ioon.mx/
     N8N_ENCRYPTION_KEY=<generar_string_random_32chars>
     GENERIC_TIMEZONE=America/Mexico_City
     ```
   - Volumen persistente: `/home/node/.n8n` → volumen Docker

2. **Configurar SSL** (Coolify lo hace automático)

3. **Primer acceso**
   - Ir a `https://n8n.ioon.mx`
   - Crear cuenta de administrador (email + contraseña)
   - **GUARDAR estas credenciales en un lugar seguro**

4. **Configurar credenciales iniciales en n8n**
   - Settings → Credentials → Agregar:
     - **OpenAI** (API key) — para Whisper
     - **Telegram Bot** (token) — se creará en Fase 4
     - **GitHub** (Personal Access Token)

### Resultado esperado
n8n corriendo en `n8n.ioon.mx`. Dashboard accesible. Credenciales configuradas.

### ⏱️ Tiempo estimado: 1–2 horas

---

## Fase 3: CRM — Mautic (Días 4–5)

> **Qué:** Desplegar Mautic vía Coolify para CRM y marketing automation.

### Pasos

1. **En Coolify → New Resource → Docker Compose**
   - Usar la imagen oficial: `mautic/mautic:latest`
   - Necesita una base de datos MySQL/MariaDB (desplegar junto)
   - Dominio: `crm.ioon.mx`
   - Variables de entorno:
     ```env
     MAUTIC_DB_HOST=db
     MAUTIC_DB_NAME=mautic
     MAUTIC_DB_USER=mautic
     MAUTIC_DB_PASSWORD=<contraseña_segura>
     MAUTIC_RUN_CRON_JOBS=true
     ```

2. **Configurar DNS**
   ```
   A     crm         → <IP_DEL_VPS>
   ```

3. **Primer acceso**
   - `https://crm.ioon.mx` → Wizard de instalación
   - Configurar: nombre del estudio, email, contraseña admin
   - Configurar email sending (SMTP) — puede ser con Gmail, Mailgun, o Amazon SES

4. **Configuración inicial**
   - Crear segmentos de contactos: `Clientes Activos`, `Leads`, `Pipeline`
   - Crear campos personalizados: `Proyecto`, `Fase`, `Valor del Retainer`
   - Crear un formulario de captura básico

### Resultado esperado
Mautic corriendo en `crm.ioon.mx`. CRM funcional con segmentos y campos personalizados.

### ⏱️ Tiempo estimado: 2–3 horas

---

## Fase 4: Interfaz de Voz — Telegram Bot (Días 5–7)

> **Qué:** Crear el bot de Telegram y construir el pipeline de voz en n8n.

### Paso 4.1: Crear el Bot

1. **Abrir Telegram → buscar @BotFather**
2. Enviar `/newbot`
3. Nombre: `ioon Agent`
4. Username: `ioon_agent_bot` (o el que esté disponible)
5. **Guardar el token** que BotFather te da
6. Configurar descripción: `/setdescription` → "Agente IA del estudio ioon"
7. Configurar foto de perfil: `/setuserpic` → subir logo de ioon

### Paso 4.2: Construir el Workflow de Voz en n8n

1. **En n8n → New Workflow → "ioon Voice Pipeline"**

2. **Nodos del workflow:**

   ```
   [Telegram Trigger] → [Switch] → [Get File] → [Whisper STT] → [AI Agent] → [Telegram Reply]
                            ↓
                       [Texto directo] ──────────────────→ [AI Agent] → [Telegram Reply]
   ```

3. **Nodo 1: Telegram Trigger**
   - Trigger on: `message`
   - Credential: token del bot

4. **Nodo 2: Switch**
   - Condición: Si `message.voice` existe → rama "Voz"
   - Else → rama "Texto"

5. **Nodo 3: Telegram — Get File** (rama Voz)
   - Operación: Get File
   - File ID: `{{ $json.message.voice.file_id }}`

6. **Nodo 4: OpenAI — Transcribe** (rama Voz)
   - Operación: Transcribe Recording
   - Model: `whisper-1`
   - Input: binary data del archivo de voz

7. **Nodo 5: AI Agent / HTTP Request**
   - Enviar el texto (transcrito o directo) a ii-agent
   - O usar el nodo de OpenAI/Gemini directamente como LLM intermedio
   - Incluir system prompt con contexto de ioon

8. **Nodo 6: Telegram — Send Message**
   - Chat ID: `{{ $json.message.chat.id }}`
   - Text: respuesta del agente

### Paso 4.3: Testear

- [ ] Enviar un mensaje de texto al bot → debe responder
- [ ] Enviar una nota de voz al bot → debe transcribir y responder
- [ ] Enviar un archivo → debe procesarlo

### Resultado esperado
Bot de Telegram funcional. Puedes hablarle por voz y recibe respuestas inteligentes.

### ⏱️ Tiempo estimado: 3–4 horas

---

## Fase 5: Inteligencia — ii-agent (Días 7–10)

> **Qué:** Desplegar ii-agent en el VPS para tareas autónomas complejas.

### Pasos

1. **Clonar el repositorio**
   ```bash
   ssh root@<IP_DEL_VPS>
   git clone https://github.com/Intelligent-Internet/ii-agent.git
   cd ii-agent
   ```

2. **Configurar según la documentación oficial**
   - Revisar el README del repo para requisitos (Docker, API keys)
   - Configurar variables de entorno:
     ```env
     GEMINI_API_KEY=<tu_key>
     ANTHROPIC_API_KEY=<tu_key>  # opcional
     ```

3. **Desplegar vía Coolify** (si tiene Dockerfile) o Docker directo

4. **Conectar con n8n**
   - En n8n, agregar un nodo HTTP Request que envíe tareas a ii-agent
   - Endpoint: `http://ii-agent:puerto/api/task` (red interna Docker)
   - El workflow de Telegram (Fase 4) ahora rutea tareas complejas a ii-agent

5. **Testear el pipeline completo**
   - Nota de voz en Telegram → Whisper → n8n → ii-agent → respuesta en Telegram

### ⚠️ Nota importante
ii-agent es un proyecto relativamente nuevo. Su API y forma de despliegue puede cambiar. Revisa la documentación oficial al momento de implementar. Si el despliegue self-hosted es complejo, una alternativa es usar los modelos (Gemini/Claude) directamente desde n8n como "cerebro" del agente.

### Resultado esperado
ii-agent coriendo en el VPS. Conectado a n8n. Puede ejecutar tareas autónomas.

### ⏱️ Tiempo estimado: 3–5 horas (depende de la documentación de ii-agent)

---

## Fase 6: Interconexión (Días 10–12)

> **Qué:** Conectar todas las piezas entre sí mediante workflows de n8n.

### 6.1 — Workflow A: "De la Chispa al Escenario"
```
Telegram (voz) → Whisper → n8n clasifica intención → ii-agent investiga
→ resultado guardado en GitHub (commit al repo) → notificación por Telegram
```
**Nodos n8n adicionales:**
- GitHub node: crear/actualizar archivo en el repo con el output del agente

### 6.2 — Workflow B: "Hand-off Automatizado"
```
GitHub (webhook on push) → n8n detecta cambio en /clients/ o /docs/
→ Telegram notification al equipo técnico con resumen del cambio
```
**Configurar en GitHub:**
- Settings → Webhooks → Add webhook
- Payload URL: `https://n8n.ioon.mx/webhook/github-push`
- Content type: `application/json`
- Events: `push`

### 6.3 — Workflow C: "Centro de Mando"
```
n8n (cron cada lunes 9am) → consulta métricas de Mautic (API)
→ genera resumen → envía reporte semanal por Telegram
```
**Conexión n8n ↔ Mautic:**
- Mautic API credentials en n8n
- Endpoint: `https://crm.ioon.mx/api/`

### 6.4 — Workflow D: "Dictado Ejecutivo"
```
Telegram (voz) → Whisper → n8n clasifica:
  - "idea" → guardar en GitHub + enriquecer con IA
  - "tarea" → ejecutar vía ii-agent
  - "pregunta" → responder con Gemini/Claude
  - "archivo" → procesar y resumir
→ respuesta por Telegram
```

### Resultado esperado
Los 4 workflows funcionando. El stack está vivo e interconectado.

### ⏱️ Tiempo estimado: 4–6 horas

---

## Fase 7: Pruebas y Polish (Días 12–14)

> **Qué:** Testear todo end-to-end, documentar, y asegurar resiliencia.

### Checklist de pruebas

- [ ] **Voz → Respuesta:** Enviar nota de voz al bot, recibir respuesta coherente
- [ ] **Texto → Respuesta:** Enviar mensaje de texto, recibir respuesta
- [ ] **GitHub → Notificación:** Hacer push al repo, recibir notificación en Telegram
- [ ] **Mautic → Reporte:** Ejecutar workflow de reporte, recibir resumen en Telegram
- [ ] **Archivo → Procesamiento:** Enviar PDF al bot, recibir resumen
- [ ] **Resiliencia:** Reiniciar el VPS, verificar que todos los servicios arrancan solos
- [ ] **Backups:** Configurar backup automático en Hetzner (snapshots semanales)

### Seguridad

- [ ] Cambiar contraseñas por defecto de todos los servicios
- [ ] Configurar firewall del VPS (solo puertos 80, 443, 22)
- [ ] Habilitar 2FA en Coolify, n8n, y Mautic
- [ ] Restringir el bot de Telegram a tu chat ID (que solo responda a ti)
  ```javascript
  // En n8n, nodo IF después del Telegram Trigger:
  // Condition: message.chat.id === TU_CHAT_ID
  ```

### Documentación

- [ ] Actualizar `stack_operativo.md` con URLs reales de los servicios
- [ ] Guardar todas las credenciales en un password manager (1Password, Bitwarden)
- [ ] Documentar los IDs de workflows de n8n

### Resultado esperado
Stack 100% funcional, seguro, documentado y con backups.

### ⏱️ Tiempo estimado: 3–4 horas

---

## Resumen de Fases

| Fase | Qué | Tiempo | Dependencias |
|:---|:---|:---|:---|
| **0** | Prerrequisitos (cuentas, keys, DNS) | Día 1 | Ninguna |
| **1** | Coolify en Hetzner VPS | Días 2–3 | Fase 0 |
| **2** | n8n (orquestador) | Días 3–4 | Fase 1 |
| **3** | Mautic (CRM) | Días 4–5 | Fase 1 |
| **4** | Telegram Bot + Whisper | Días 5–7 | Fases 2 |
| **5** | ii-agent (IA autónoma) | Días 7–10 | Fases 1, 2 |
| **6** | Interconexión (Workflows A-D) | Días 10–12 | Fases 2–5 |
| **7** | Pruebas, seguridad y backups | Días 12–14 | Todas |

---

## Costos de Implementación (Únicos)

| Concepto | Costo |
|:---|---:|
| Tiempo de setup (tuyo/hermano) | ~20–30 horas |
| Dominio ioon.mx (si no lo tienen) | ~$300 MXN / año |
| Todo lo demás (Coolify, n8n, Mautic, Telegram) | $0 |

## Costos Recurrentes (Mensuales)

| Servicio | Costo |
|:---|---:|
| Hetzner VPS (CX32) | ~€8.49/mes (~MXN $180) |
| APIs de IA (Whisper + Gemini) | ~$500–800 MXN/mes |
| Figma (Free Starter) | $0 |
| Telegram Bot API | $0 |
| Dominio (prorrateado) | ~$25 MXN/mes |
| **TOTAL** | **~MXN $700–1,000/mes** |

---

## Orden de Prioridad si el Tiempo es Limitado

Si solo puedes hacer **una cosa esta semana**, haz esto:

1. 🥇 **Fase 0 + 1** → Tener el VPS con Coolify corriendo
2. 🥈 **Fase 2 + 4** → n8n + Bot de Telegram (el pipeline de voz es el game-changer)
3. 🥉 **Fase 3** → Mautic (puede esperar hasta tener un cliente que lo necesite)
4. ⏳ **Fase 5** → ii-agent (requiere más investigación; Gemini/Claude directo funciona mientras tanto)

---

> [!TIP]
> **Regla de oro de implementación:** No intentes hacer todo perfecto de una vez. Despliega lo mínimo funcional (Coolify + n8n + Telegram) y ve añadiendo capas. El stack está diseñado para crecer incrementalmente.
