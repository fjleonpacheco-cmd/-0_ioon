# Stack Operativo ioon — v2.0

> **Estado:** Activo
> **Fecha:** Abril 2026
> **Cambio principal respecto a v1.0:** Incorporación de Telegram como interfaz de voz primaria del agente IA, con transcripción y comprensión mediante Gemini API (Google AI Studio).

---

## Contexto

Stack soberano de ioon, diseñado para operar con máxima autonomía, mínima dependencia de SaaS propietarios y costo mensual controlado. La v2.0 cierra la brecha crítica de la v1.0: el fundador creativo ahora puede interactuar con el agente IA hablando, desde cualquier lugar, a través de Telegram.

---

## Stack Tecnológico v2.0

| Capa | Herramienta | Tipo | Reemplaza |
|:---|:---|:---|:---|
| **Interfaz de voz** | **Telegram Bot** | **Cloud (gratuito)** | **Discord (solo texto/voz sin transcripción)** |
| **Transcripción y comprensión** | **Gemini API (AI Studio)** | **API Cloud** | **Whisper / soluciones de pago** |
| Agente IA | ii-agent | Self-Hosted | Dependencia de SaaS de IA |
| Automatización | n8n | Self-Hosted | Zapier, Make, GHL automations |
| Despliegue | Coolify | Self-Hosted | Heroku, Vercel, Render |
| Diseño | Figma | SaaS (Free Starter) | Canva |
| Presentaciones | Reveal.js | Open Source | PowerPoint, Google Slides |
| Control de versiones | GitHub | Cloud | — |
| Infraestructura | Hetzner Cloud | VPS | AWS, DigitalOcean |
| Comunicación interna | Discord | Cloud | — |

---

## Arquitectura por Capas

### 🎙️ Interfaz (nuevo en v2.0)
- **Telegram Bot:** Canal primario de interacción con el agente IA. Recibe mensajes de voz (`.ogg`/`.mp3`), texto e imágenes directamente desde el móvil.
- **Gemini API (AI Studio):** Procesa los archivos de audio enviados por Telegram — transcribe, interpreta la intención y genera la respuesta o acción correspondiente. Se conecta vía n8n al resto del stack.

> **Flujo de voz:**
> `Nota de voz (Telegram) → Webhook (n8n) → Gemini API (transcripción + comprensión) → ii-agent (acción) → Respuesta en Telegram`

---

### 🧠 Inteligencia
- **ii-agent:** Agente IA autónomo — research, código, análisis y ejecución de tareas complejas.
- **Gemini API:** Modelo fundacional para transcripción de voz, estrategia y refinamiento de narrativa.
- **Claude:** Modelo de apoyo para análisis profundo y generación de contenido estructurado.

### 🎨 Creación
- **Figma:** Diseño UI/UX. Plan Free Starter suficiente para el volumen del estudio.
- **OpenArt.ai:** Generación visual IA — personajes, bocetos, arte conceptual.
- **Reveal.js:** Entregables interactivos *Quiet Luxury*.

### ⚙️ Operaciones
- **n8n:** Workflows visuales, webhooks, APIs. Orquesta la comunicación entre Telegram, Gemini API e ii-agent.
- **Coolify:** Despliegue con un click. Reemplaza Heroku/Vercel/Render.

### 🏗️ Base
- **Hetzner Cloud:** VPS europeo, relación costo/potencia imbatible.
- **GitHub:** Mono-repo versionado.
- **ioon.mx:** Dominio propio.

---

## Workflows v2.0

### Workflow A: "De la Chispa al Escenario" *(actualizado)*
1. **Captura (Telegram → n8n):** Nota de voz enviada desde móvil, recibida vía webhook en n8n.
2. **Transcripción (Gemini API):** n8n envía el audio a Gemini API; obtiene transcripción + intención estructurada.
3. **Expansión (ii-agent + Gemini):** Investigación, arquetipos, taglines enriquecidos a partir de la transcripción.
4. **Dirección de Arte (Figma + OpenArt):** Diseño visual + generación IA.
5. **Despliegue (Reveal.js → Coolify):** Presentación versionada en GitHub, desplegada en ioon.mx.
6. **Confirmación (Telegram):** Notificación de entrega al fundador directamente en el chat.

### Workflow B: "El Hand-off Automatizado" *(sin cambios)*
1. **Estrategia:** Promesa de marca documentada en GitHub.
2. **Automatización:** Commit dispara workflow de n8n → notificación en Discord.
3. **Ejecución:** Vibe coding con Cursor + ii-agent.

### Workflow C: "El Centro de Mando" *(sin cambios)*
1. **Aplicativo (Vibe Coding):** Recopila datos operativos del cliente.
2. **Procesamiento (n8n):** Centraliza SLAs, métricas, alertas automatizadas.
3. **Reporteo (Reveal.js + Coolify):** Entregables mensuales desplegados en ioon.mx.

### Workflow D: "El Dictado Estratégico" *(nuevo en v2.0)*
> Para capturar ideas en movimiento sin perder el hilo.
1. **Input de voz (Telegram):** Francisco dicta una idea, instrucción o briefing mientras está en tránsito.
2. **Transcripción + estructuración (Gemini API):** La idea se convierte en un documento estructurado (brief, tarea, nota estratégica).
3. **Registro (GitHub):** El documento se guarda automáticamente en el mono-repo vía n8n.
4. **Confirmación (Telegram):** Respuesta con el resumen estructurado para validación rápida.

---

## Inversión Mensual v2.0

| Servicio | Costo |
|:---|---:|
| Hetzner VPS (CX32) | ~€8 / mes |
| Dominio ioon.mx | ~$300 MXN / año |
| GitHub (Free tier) | $0 |
| Coolify, n8n | $0 (self-hosted) |
| Figma (Free Starter) | $0 |
| Telegram Bot API | $0 |
| Gemini API (AI Studio) — consumo de voz + texto | $0–$300 MXN / mes* |
| **TOTAL ESTIMADO** | **~MXN $1,500–1,800 / mes** |

*\*Gemini API ofrece un **free tier real** en Google AI Studio para desarrollo. Los modelos **Gemini 2.5 Flash** y **Gemini 3 Flash** tienen acceso gratuito con límites de tasa (RPM/TPD). Para el volumen de un estudio en etapa temprana (notas de voz, tareas estratégicas), el free tier es suficiente. El costo sube solo si el volumen de procesamiento escala significativamente.*

---

## Notas de Implementación

- El bot de Telegram se configura con **BotFather** (gratuito, sin servidor propio).
- n8n recibe el webhook de Telegram, descarga el archivo de audio y lo envía a la **Gemini API multimodal** (acepta audio nativo en formatos OGG, MP3, WAV — sin conversión previa).
- **Modelo recomendado para transcripción:** `gemini-2.5-flash` — disponible en el free tier de AI Studio, rápido y preciso para notas de voz en español.
- **Modelo recomendado para análisis estratégico:** `gemini-2.5-pro` o `gemini-3-flash` según el nivel de razonamiento requerido.
- ⚠️ El free tier tiene límites de tasa por proyecto (no por API key). Para producción con múltiples clientes, vincular billing en Google Cloud y cambiar a pago por consumo.
- Todo el stack sigue alojado en Hetzner; Telegram y Gemini API son los únicos servicios cloud externos con dependencia activa.

---

*Versión anterior archivada en: `stack_operativo_v1.md`*
