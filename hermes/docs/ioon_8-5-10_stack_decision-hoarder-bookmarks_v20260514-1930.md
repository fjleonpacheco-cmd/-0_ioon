---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-1930
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar la elección de Hoarder como bookmark manager self-hosted del estudio. Define rol, alternativas descartadas, integración con captura desde móvil y patrón de uso
depende_de:
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía self-hosted)
  - ioon_8-4-3_planeacion-tecnica_modelo-c-hibrido-notas-captura_v20260514-2000 (Hoarder complementa AppFlowy para captura web)
alimenta_a:
  - ioon 8-5-2 inventario maestro (fila bookmarks/read-later)
  - ioon 8-4-7 pendientes técnicos (P2-X activación Hoarder)
---

# Decisión canónica — Hoarder como bookmark manager self-hosted

Decisión cristalizada el 14 de mayo de 2026. Resuelve la captura de referencias web (artículos, tweets, posts, sitios inspiración) que actualmente vive dispersa entre Pocket, browser bookmarks, screenshots y memoria.

---

## 1. Idea central (1 frase)

**Hoarder** (recientemente renombrado a **Karakeep**) es el bookmark manager self-hosted del estudio en `bookmarks.ioon.mx` · guarda URLs con thumbnail · texto completo extraído · tags auto-generados con IA · accesible desde browser extension y app móvil.

---

## 2. Contexto

Estado pre-decisión: las referencias web del estudio (inspiración visual, artículos técnicos sobre stack, tweets sobre tipografía, sitios admirados de estudios competidores) viven dispersas entre:

- Pocket (gratuito pero SaaS · futuro incierto desde la adquisición Mozilla → tema interno).
- Bookmarks de Chrome (no organizables, sin sync entre devices con cuentas distintas).
- Captures de pantalla en Photos.
- Telegram a sí mismo.
- Memoria, lo cual no escala.

Para un estudio de dirección de arte, las referencias visuales son **materia prima**. Perderlas o no poderlas encontrar cuando se necesitan es costo creativo real.

---

## 3. Decisión

**Hoarder** queda adoptado.

- **Origen:** [hoarder.app](https://hoarder.app) · open source AGPL-3 · Next.js + Postgres.
- **Nota sobre el nombre:** el proyecto se renombró a **Karakeep** en mayo 2026 · funcionalmente idéntico, mismo maintainer.
- **Hosting:** Coolify en `servidor-ioon-2`.
- **Base de datos:** Postgres compartido del servidor (schema dedicado).
- **Acceso:** `bookmarks.ioon.mx` (wildcard DNS).
- **Clientes:** browser extension (Chrome, Firefox) · app móvil iOS/Android.
- **IA opcional:** tags automáticos vía OpenRouter (mismo provider que Tau usa).

---

## 4. Razones de la elección

### 4.1 Self-hosted con filosofía limpia

AGPL-3 self-hostable · sin tier gating · sin lock-in. Datos en VPS propio.

### 4.2 Funcionalidad real

Hoarder hace mucho más que guardar URL:
- Extrae texto completo del artículo (para búsqueda full-text).
- Captura thumbnail/preview.
- Genera tags automáticos con IA (si se conecta provider LLM).
- Lista de lectura con tracking de read/unread.
- Highlights (marcar fragmentos del texto guardado).

### 4.3 App móvil decente

Compartir desde Safari/Chrome móvil → directo a Hoarder. Sin fricción.

### 4.4 Stack alineado

Next.js + Postgres + TypeScript · idéntico al resto del estudio. Si hay que customizar, el código es legible.

### 4.5 Costo cero monetario

Self-hosted + reusa Postgres existente + LLM via OpenRouter con cap mensual ya configurado.

---

## 5. Alternativas evaluadas y descartadas

### Pocket
SaaS · futuro incierto (Mozilla en transición). Free tier disponible · paid tier $4.99 USD/mes. Lock-in al ecosistema Mozilla. Descarte por filosofía + futuro incierto.

### Raindrop.io
SaaS · interfaz pulida · $28/año tier Pro. Buena UX · pero SaaS. Descarte por filosofía.

### Linkding
Open source self-hosted · Python/Django · más simple que Hoarder pero sin IA tags ni full-text search ni app móvil oficial. Descarte por feature set menor.

### Shaarli, Wallabag
Open source self-hosted · UI más vieja · sin IA tags. Wallabag fuerte en read-later, débil en bookmarks visuales. Descarte por UX y feature set.

### Browser bookmarks puros
Sin sync entre browsers · sin búsqueda full-text · sin extracción de contenido. Descarte por insuficiencia.

### Notion / AppFlowy con database de URLs
Hack funcional pero sin browser extension dedicada · sin extracción automática de texto · sin app móvil de share rápido. Descarte por fricción y mismatch de herramienta.

---

## 6. Setup operativo

### Fase 1 — instalación

1. Coolify · proyecto "Hoarder" desde catálogo (o template comunidad).
2. Postgres schema dedicado `hoarder`.
3. Subdominio `bookmarks.ioon.mx`.
4. Configurar conexión a OpenRouter para IA tags (mismo API key que Tau usa).
5. Browser extension Chrome (`Hoarder Web Clipper`).
6. App móvil iOS/Android instalada.

### Fase 2 — migración de bookmarks existentes

7. Export bookmarks de Chrome → import a Hoarder.
8. Export de Pocket → import a Hoarder.
9. Crear lists iniciales: "Inspiración visual" · "Stack técnico" · "Tipografía" · "Sitios admirados" · "Read later".

### Fase 3 — uso cotidiano

10. Cualquier link interesante: share → Hoarder desde móvil/browser.
11. Revisión semanal de "Read later" → procesar o archivar.
12. Tags automáticos curados (corregir cuando la IA se equivoque).

---

## 7. Costos

| Concepto | Costo |
|---|---|
| Licencia Hoarder/Karakeep | $0 (AGPL-3 self-hosted) |
| Hosting incremental | $0 (cubierto por VPS) |
| Postgres | $0 (compartido) |
| LLM API para tags | <$1 USD/mes (uso liviano · ya cubierto por cap mensual OpenRouter) |
| **Total mensual** | **<$1 USD** |

---

## 8. Riesgos y mitigaciones

### Proyecto en transición de nombre (Hoarder → Karakeep)
El rename ocurrió mayo 2026. Posibles issues de continuidad de releases. Mitigación: monitorear primer mes post-rename · si el ritmo de releases se sostiene, sin riesgo · si se ralentiza, evaluar Linkding como fallback.

### IA tags requiere provider LLM
Si OpenRouter sube precio o quita modelos baratos, los tags automáticos pueden volverse caros. Mitigación: feature opcional · sin tags AI Hoarder sigue funcionando · y se puede sustituir por LLM local (Ollama) si hace falta.

---

## 9. Criterios de reapertura

1. **Karakeep abandonado** (sin releases 6+ meses). Disparador: migración a Linkding.
2. **Cambio drástico de UX** que rompe el flujo. Disparador: revisión.
3. **Necesidad de features adicionales** (PDFs anotados · video bookmarks con timestamps) que Hoarder no cubre. Disparador: evaluar tools complementarias.

---

## 10. Vigencia y revisión

**Revisión natural:** 6 meses post-migración (~noviembre 2026).

**Revisión por evento:** cualquiera del §9.

---

*Decisión cristalizada el 14-may-2026 19:30 UTC-6.*
