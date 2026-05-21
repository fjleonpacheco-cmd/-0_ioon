# Stack Operativo ioon — v1.0 (Archivo)

> **Estado:** Archivado — Sustituido por v2.0
> **Fecha:** Abril 2026
> **Razón de archivo:** Esta versión no incluía la interfaz de voz por Telegram como canal primario de interacción con el agente IA. La v2.0 corrige esta omisión crítica.

---

## Contexto

Esta fue la primera versión del stack soberano de ioon, diseñada para reemplazar las herramientas SaaS propietarias (Notion, Canva, GoHighLevel, Trello, Zapier) con alternativas open-source y self-hosted.

## Stack Tecnológico v1.0

| Capa | Herramienta | Tipo | Reemplaza |
|:---|:---|:---|:---|
| Agente IA | ii-agent | Self-Hosted | Dependencia de SaaS de IA |
| Automatización | n8n | Self-Hosted | Zapier, Make, GHL automations |
| Despliegue | Coolify | Self-Hosted | Heroku, Vercel, Render |
| Diseño | Penpot | Open Source | Figma, Canva |
| Presentaciones | Reveal.js | Open Source | PowerPoint, Google Slides |
| Control de versiones | GitHub | Cloud | — |
| Infraestructura | Hetzner Cloud | VPS | AWS, DigitalOcean |
| Comunicación interna | Discord | Cloud | — |

## Arquitectura por Capas

### 🧠 Inteligencia
- **ii-agent:** Agente IA autónomo — research, código, análisis.
- **Gemini / Claude:** Modelos fundacionales para estrategia y refinamiento de narrativa.

### 🎨 Creación
- **Penpot:** Diseño UI/UX open-source. Reemplaza Figma.
- **OpenArt.ai:** Generación visual IA — personajes, bocetos, arte conceptual.
- **Reveal.js:** Entregables interactivos *Quiet Luxury*.

### ⚙️ Operaciones
- **n8n:** Workflows visuales, webhooks, APIs. Reemplaza Zapier y GHL automations.
- **Coolify:** Despliegue con un click. Reemplaza Heroku/Vercel/Render.

### 🏗️ Base
- **Hetzner Cloud:** VPS europeo, relación costo/potencia imbatible.
- **GitHub:** Mono-repo versionado.
- **ioon.mx:** Dominio propio.

## Workflows v1.0

### Workflow A: "De la Chispa al Escenario"
1. **Captura (Discord ➔ n8n):** Notas de voz capturadas, procesadas vía webhook.
2. **Expansión (ii-agent + Gemini):** Investigación, arquetipos, taglines enriquecidos.
3. **Dirección de Arte (Penpot + OpenArt):** Diseño visual + generación IA.
4. **Despliegue (Reveal.js ➔ Coolify):** Presentación versionada en GitHub, desplegada en ioon.mx.

### Workflow B: "El Hand-off Automatizado"
1. **Estrategia:** Promesa de marca documentada en GitHub.
2. **Automatización:** Commit dispara workflow de n8n → notificación en Discord.
3. **Ejecución:** Vibe coding con Cursor + ii-agent.

### Workflow C: "El Centro de Mando"
1. **Aplicativo (Vibe Coding):** Recopila datos operativos del cliente.
2. **Procesamiento (n8n):** Centraliza SLAs, métricas, alertas automatizadas.
3. **Reporteo (Reveal.js + Coolify):** Entregables mensuales desplegados en ioon.mx.

## Inversión Mensual v1.0

| Servicio | Costo |
|:---|---:|
| Hetzner VPS (CX32) | ~€8 / mes |
| Dominio ioon.mx | ~$300 MXN / año |
| GitHub (Free tier) | $0 |
| Coolify, n8n, Penpot | $0 (self-hosted) |
| APIs de IA (consumo) | ~$500 MXN / mes |
| **TOTAL ESTIMADO** | **~MXN $2,000 / mes** |

## Limitación Crítica (Razón del Upgrade a v2.0)

> [!WARNING]
> **Omisión de la interfaz de voz:** La v1.0 asumía que la interacción con ii-agent era exclusivamente por texto/código. En la práctica, el flujo natural del fundador creativo es **hablar** — enviar notas de voz, dictar ideas, dar instrucciones en movimiento. Sin una interfaz de voz, el agente IA queda desconectado del ritmo real de trabajo del estudio.

---

*Sustituido por: `stack_operativo.md` (v2.0)*
