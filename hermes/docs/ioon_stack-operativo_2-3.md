# Stack Operativo ioon — v2.0

> *"La tecnología sin alma es solo ruido, y el alma sin tecnología es invisible."*

**Versión:** 2.3  
**Fecha:** Abril 2026  
**Cambio principal vs v2.2:** Consolidación de Whisper (STT) en **Gemini API** — un solo proveedor de IA para transcripción + inteligencia.  
**Archivo de la versión anterior:** [`stack_operativo_v1.md`](./stack_operativo_v1.md)

---

## 1. Principio Rector

> **Soberanía donde sea posible, excelencia donde sea necesario.**

Cada herramienta del estudio debe ser **reemplazable** y **auditable**. Donde exista una alternativa open-source competitiva, se elige soberanía. Donde la excelencia del entregable lo exija, se elige la mejor herramienta del mercado.

Si un proveedor cierra mañana, ioon sigue operando. **Soberanía tecnológica = Independencia creativa.**

---

## 2. El Stack Soberano

### 🎤 Interfaz (La Voz del Estudio)

| Herramienta | Función | Tipo |
|:---|:---|:---|
| **Telegram Bot** | Interfaz primaria de voz y texto con el agente IA | Cloud (API gratuita) |

**¿Por qué Telegram?**
- El fundador creativo piensa hablando, no escribiendo código. Su flujo natural es dictar ideas, enviar notas de voz y dar instrucciones en movimiento.
- Telegram es la app que ya usa a diario. Cero fricción de adopción.
- La API de bots es gratuita, robusta y sin límites de mensajes.
- Soporta notas de voz, archivos, imágenes y texto — todo en un solo canal.
- Cifrado, multiplataforma (móvil + escritorio), sin compresión de archivos.

### 🧠 Inteligencia (El Cerebro)

| Herramienta | Función | Tipo |
|:---|:---|:---|
| **ii-agent** | Agente IA autónomo — research, código, análisis, ejecución de tareas complejas | Self-Hosted |
| **Gemini API** | Modelo fundacional multimodal. Procesa audio (STT), texto e imágenes. Un solo API key para todo | API (free tier vía AI Studio) |

### 🎨 Creación (La Lente de Deseabilidad)

| Herramienta | Función | Tipo |
|:---|:---|:---|
| **Figma** | Diseño UI/UX — estándar de la industria, colaboración en tiempo real | SaaS (decisión pragmática) |
| **OpenArt.ai** | Generación visual IA — personajes, bocetos, arte conceptual | SaaS |

### ⚙️ Automatización & Orquestación (El Sistema Nervioso)

| Herramienta | Función | Tipo |
|:---|:---|:---|
| **n8n** | Workflows visuales, webhooks, APIs. Orquesta todo el pipeline de voz→agente→acción | Self-Hosted |
| **Mautic** | CRM y marketing automation open-source. Email, landing pages, lead scoring, nurturing | Self-Hosted |
| **Coolify** | Despliegue con un click. PaaS self-hosted | Self-Hosted |

### 🏗️ Infraestructura (Los Cimientos)

| Herramienta | Función | Tipo |
|:---|:---|:---|
| **Hetzner Cloud** | VPS europeo. Relación costo/potencia imbatible | VPS |
| **GitHub** | Mono-repo versionado. Todo cambio es rastreable | Cloud |
| **ioon.mx** | Dominio propio para servicios y marca | Dominio |

---

## 3. Arquitectura de la Interfaz de Voz

El cambio más significativo de la v2.0 es la capa de voz. El flujo técnico funciona así:

```
┌──────────────────────────────────────────────────────────┐
│                    FLUJO DE VOZ                          │
│                                                          │
│  📱 Telegram                                             │
│  ┌─────────────┐                                        │
│  │ Nota de voz │──────┐                                 │
│  │ o mensaje   │      │                                 │
│  └─────────────┘      ▼                                 │
│                  ┌──────────┐                            │
│                  │   n8n    │ Telegram Trigger            │
│                  │ workflow │                             │
│                  └────┬─────┘                            │
│                       │                                  │
│                       ▼                                  │
│            ┌────────────────┐                            │
│            │   Gemini API    │ Procesa audio + texto      │
│            │  (multimodal)   │ en un solo paso             │
│            │   STT + IA      │                            │
│            └────────┬───────┘                            │
│                     ▼                                    │
│            ┌────────────────┐                            │
│            │   Respuesta    │ Texto, archivos,           │
│            │   vía Telegram │ código, reportes           │
│            └────────────────┘                            │
└──────────────────────────────────────────────────────────┘
```

### Componentes del Pipeline de Voz (n8n)

1. **Telegram Trigger:** Escucha mensajes entrantes del bot (@ioon_agent_bot).
2. **Switch Node:** Detecta si es nota de voz, archivo, imagen o texto plano.
3. **Get File (Telegram API):** Descarga el archivo de voz usando `file_id`.
4. **Gemini API (multimodal):** Recibe el audio directamente, lo transcribe Y lo procesa en un solo paso. No requiere STT separado.
5. **Send Message (Telegram API):** Devuelve la respuesta al usuario por Telegram.

### Capacidades de la Interfaz de Voz

| Acción | Ejemplo |
|:---|:---|
| 🎤 Dictar ideas | *"Investiga tendencias de branding para clínicas veterinarias premium en CDMX"* |
| 📋 Crear tareas | *"Crea un buyer persona para Serclin basado en hombres de 35-50 años"* |
| 🔍 Investigar | *"¿Cuál es el benchmark de NPS para salones de belleza en Latinoamérica?"* |
| 📊 Generar reportes | *"Dame el resumen semanal de SLAs de Serclin"* |
| 🎨 Dirigir arte | *"Genera 3 opciones de paleta de colores para una marca que transmita confianza y herencia"* |
| 🔧 Ejecutar código | *"Actualiza la presentación de Serclin con los nuevos datos del pivote"* |
| 📁 Enviar archivos | Envía PDFs, imágenes, docs → el agente los procesa |

---

## 4. Workflows Principales

### Workflow A: "De la Chispa al Escenario" (Creación de Narrativa Visual)

> **Cambio v2.0:** La captura ahora inicia desde Telegram (voz), no desde Discord.

1. **🎤 Captura (Telegram ➔ n8n ➔ Gemini):** El fundador envía una nota de voz al bot de Telegram. n8n la recibe y Gemini la procesa directamente (audio → comprensión), archivando el insight en la base de conocimiento.
2. **🧠 Expansión (ii-agent + Gemini):** n8n pasa la instrucción al agente autónomo, que investiga, genera arquetipos, refina taglines y devuelve análisis enriquecidos — la respuesta llega de vuelta por Telegram.
3. **🎨 Dirección de Arte (Figma + OpenArt):** Diseño del sistema visual en Figma. Generación de personajes y assets con IA.
4. **🚀 Despliegue (Reveal.js ➔ Coolify):** Presentación interactiva versionada en GitHub, desplegada automáticamente en ioon.mx.

### Workflow B: "El Hand-off Automatizado" (Deseabilidad 🤝 Factibilidad)

1. **💡 Estrategia:** La promesa de marca se aprueba y se documenta en el repo de GitHub.
2. **🔄 Automatización:** Un commit dispara un workflow de n8n que notifica vía **Telegram** al equipo técnico.
3. **🛠️ Ejecución:** Vibe coding con Cursor + ii-agent, orientado por el contexto de marca del repo.

### Workflow C: "El Centro de Mando" (Operación Continua)

1. **📱 Aplicativo (Vibe Coding):** Recopila datos operativos de las sucursales del cliente.
2. **⚙️ Procesamiento (n8n + Mautic):** Centraliza SLAs, métricas y dispara alertas vía Telegram. Mautic gestiona el nurturing y seguimiento automatizado del cliente.
3. **📊 Reporteo (Reveal.js + Coolify):** Entregables mensuales de la "Salud del Prestigio" desplegados en ioon.mx para cada cliente.

### Workflow D: "Dictado Ejecutivo" (NUEVO en v2.0)

> **Flujo exclusivo de voz** para el día a día del fundador creativo.

1. **🎤 Dictado (Telegram):** El fundador graba una nota de voz con una instrucción, idea o pregunta.
2. **🧠 Procesamiento (Gemini multimodal):** n8n envía el audio directamente a Gemini, que transcribe + comprende + ejecuta en un solo paso.
3. **⚙️ Ejecución (ii-agent):** El agente interpreta la intención y ejecuta:
   - Si es una **idea** → la archiva y enriquece.
   - Si es una **tarea** → la ejecuta (código, investigación, diseño).
   - Si es una **pregunta** → investiga y responde.
   - Si es un **archivo adjunto** → lo procesa y resume.
4. **💬 Respuesta (Telegram):** El agente responde con texto, archivos o links directamente en el chat.

---

## 5. Inversión Mensual

| Servicio | Costo |
|:---|---:|
| Hetzner VPS (CX32) | ~€8 / mes |
| Dominio ioon.mx | ~$300 MXN / año |
| GitHub (Free tier) | $0 |
| Coolify, n8n, Mautic | $0 (self-hosted) |
| Figma (Starter / Free) | $0–$15 USD / mes |
| Gemini API (AI Studio free tier) | $0 |
| Telegram Bot API | $0 |
| **TOTAL ESTIMADO** | **~MXN $500–1,000 / mes** |

> *vs. GoHighLevel solo: ~$97 USD/mes (~MXN $1,900)*
> El stack completo de ioon cuesta lo mismo que UNA herramienta SaaS, pero incluye agente IA, automatización, diseño, despliegue y ahora interfaz de voz.

---

## 6. Changelog

| Versión | Fecha | Cambios |
|:---|:---|:---|
| **v1.0** | Abril 2026 | Stack inicial: ii-agent, n8n, Coolify, Penpot, Reveal.js, GitHub. Interacción solo por texto/código. |
| **v2.0** | Abril 2026 | **+ Telegram Bot** como interfaz primaria de voz. **+ Whisper** para STT. **+ Workflow D** (Dictado Ejecutivo). Notificaciones migran de Discord a Telegram. |
| **v2.1** | Abril 2026 | **Penpot → Figma** (decisión pragmática). **+ Mautic** (CRM & marketing automation self-hosted). Principio rector actualizado. |
| **v2.2** | Abril 2026 | **- Reveal.js** del grid (es formato de entrega, no infraestructura). Stack consolidado a 8 herramientas. |
| **v2.3** | Abril 2026 | **- Whisper**. Consolidación en **Gemini API** (multimodal: audio + texto + imagen). Un solo proveedor IA. Stack: 7 herramientas. |

---

## 7. Próximos Pasos de Implementación

1. **Crear el bot de Telegram** vía @BotFather → obtener API token.
2. **Configurar credenciales de Telegram** en n8n (self-hosted).
3. **Diseñar el workflow de voz** en n8n: Trigger → Switch → Get File → Whisper → ii-agent → Reply.
4. **Configurar API key de OpenAI** para Whisper (transcripción).
5. **Testear el pipeline completo:** nota de voz → transcripción → respuesta del agente.
6. **Iterar:** Añadir comandos específicos (/research, /task, /report) para acelerar la clasificación de intenciones.

---

> [!TIP]
> **La regla de oro:** Ninguna herramienta técnica o aplicativo debe existir si antes no está justificada por la estrategia de Deseabilidad y Narrativa. La tecnología (Factibilidad) siempre debe seguir al Alma (Deseabilidad). La interfaz de voz existe porque **el alma del estudio habla, no escribe código**.
