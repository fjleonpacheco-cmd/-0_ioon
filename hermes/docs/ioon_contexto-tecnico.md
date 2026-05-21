# Contexto Técnico: Stack ioon — Estado Actual

> **Para:** Nuevo chat de Claude
> **Fecha:** Abril 2026
> **Propósito:** Dar contexto del stack técnico operativo de ioon para continuar el desarrollo de capacidades web (galerías, slideshows, sitios para arquitectos).

---

## Quién es ioon

Estudio de consultoría en innovación fundado por Francisco León. Modelo **"Innovación-as-a-Service"** para clientes como fundadores creativos y empresas familiares en transición. El stack fue construido con criterio de soberanía tecnológica: self-hosted donde es posible, mínimo gasto mensual (~$1,500–1,800 MXN/mes).

---

## Stack Tecnológico Activo

| Capa | Herramienta | Estado |
|:---|:---|:---|
| Infraestructura | Hetzner Cloud VPS (CX32) | ✅ Activo — IP: 89.167.93.139 |
| PaaS / Despliegue | Coolify v4 | ✅ Activo — coolify.ioon.mx |
| Automatización | n8n | ✅ Activo — n8n.ioon.mx |
| Interfaz de voz | Telegram Bot (@ioon_agent_bot) | ✅ Activo y funcionando |
| Transcripción de voz | Gemini API (gemini-2.5-flash) | ✅ Activo — transcribe notas de voz en español |
| Respuesta inteligente | Claude API (claude-haiku-4-5) | ✅ Activo — responde mensajes del bot |
| Control de versiones | GitHub (repo: 0_ioon) | ✅ Activo |
| Diseño UI | Figma (Free Starter) | ✅ Activo |
| Dominio | ioon.mx | ✅ Activo con SSL |

---

## Pipeline de Voz — Funcionando al 100%

El flujo central del agente ya está operativo:

```
Nota de voz (Telegram)
  → Webhook (n8n)
  → Descarga audio (Telegram API)
  → Nodo Code JS: convierte audio a base64
  → Gemini API 2.5 Flash: transcribe audio → texto
  → Claude API: genera respuesta inteligente
  → Telegram: envía respuesta al usuario
```

**Prueba exitosa:** "Buenos días, probando, 1 2 3" → transcrito y respondido correctamente.

---

## Capacidad Web Actual

Francisco puede construir **landing pages y websites** usando:

- **Astro** como framework base (SSG/SSR)
- **Tailwind CSS** para estilos
- **React** (puede agregarse como integration oficial de Astro con `npx astro add react`)
- **HTML/CSS/JS** puro para previews y prototipos

### Lo que ya se ha construido en esta conversación

Se construyó un **preview completo de rediseño** de `educativoantequera.edu.mx` en HTML + CSS:

- Nav fijo con blur
- Hero de dos columnas
- Sección de pilares (3 columnas con números grandes)
- Sección nosotros (dos columnas)
- Equipo directivo (fondo oscuro)
- Stats (banda de color sólido)
- Programas (grid 2x2)
- Alianzas internacionales
- Testimonios (3 columnas con cards)
- FAQ (acordeón visual)
- CTA banner
- Formulario de contacto (dos columnas)
- Footer completo

**Tipografías usadas:** Fraunces (display serif) + DM Sans (body)
**Paleta:** `#704FE6` (púrpura), `#FFB804` (amarillo), `#0B0118` (tinta), `#FBF8FF` (crema)

---

## Próximo Objetivo en Este Chat

Integrar componentes interactivos para **sitios de arquitectos**, específicamente:

1. **Galerías de proyectos** — grid masonry o lightbox
2. **Slideshows / carousels** — para presentación de proyectos individuales
3. **Posiblemente:** filtrado de proyectos por categoría, navegación fluida entre proyectos

### Stack sugerido para esto

- **Astro** para el sitio base (performance + SEO)
- **React** para los componentes interactivos (galería, lightbox, slider)
- **Tailwind CSS** para estilos
- Librerías candidatas a evaluar:
  - `swiper` — slider/carousel de alto nivel
  - `yet-another-react-lightbox` — lightbox moderno
  - `masonry-layout` o CSS Grid para galerías masonry

---

## Notas Técnicas Relevantes

- El VPS tiene **149 GB de almacenamiento** y **8 GB RAM** — holgado para self-hosting.
- Coolify gestiona los contenedores Docker — cualquier servicio con imagen Docker puede desplegarse.
- n8n está en `n8n.ioon.mx` con volumen persistente en `/home/node/.n8n`.
- La API key de Gemini está en AI Studio (Google Cloud proyecto ioon). Free tier activo con `gemini-2.5-flash`.
- La API key de Anthropic está en `platform.claude.ai` (org: ioon). Monthly spend limit activo con $5 USD de crédito.
- El bot de Telegram tiene token guardado y el Chat ID de Francisco es `889702196`.

---

## Archivos Generados en Esta Sesión

- `stack_operativo_v1.md` — versión archivada del stack
- `stack_operativo_v2.md` — stack activo documentado
- `3_lentes_version_comercial.md` — framework de ventas de ioon
- `antequera-preview.html` — preview del rediseño de educativoantequera.edu.mx

---

*Generado al cierre de la sesión de implementación — Abril 2026*
