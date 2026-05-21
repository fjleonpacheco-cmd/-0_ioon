# Catálogo de Demos ioon — Contexto para Nuevo Chat

> **URL en producción:** https://catalogo.ioon.mx
> **Proyecto:** Catálogo principal de demos para diferentes industrias
> **Fecha:** Abril 20, 2026

---

## 1. Qué es el Catálogo

Página central del modelo de negocio web de ioon. Funciona como vitrina donde prospectos de diferentes industrias pueden ver demos funcionales de sitios web, elegir el que les guste, e ioon lo personaliza para entregarles su sitio en días.

**Flujo de venta:**
1. Prospecto visita `catalogo.ioon.mx`
2. Filtra por industria (Arquitectura, Fotografía, etc.)
3. Hace clic en una demo card → se abre el demo funcional en su subdominio
4. Si le gusta, contacta a ioon → se sustituye contenido (textos, imágenes, colores, tipografía)
5. En días tiene su sitio en producción

**Modelo de URLs:**
```
catalogo.ioon.mx                        ← Catálogo principal
demo-arquitectura-1.ioon.mx             ← Demo genérico de arquitectura
demo-fotografia-1.ioon.mx               ← Demo genérico de fotografía
[demo-restaurantes-1.ioon.mx]           ← Futuro
[demo-escuelas-1.ioon.mx]               ← Futuro
cliente.ioon.mx o cliente.com           ← Sitio personalizado del cliente
```

---

## 2. Stack técnico

| Capa | Herramienta |
|:---|:---|
| Framework | Vite + React 18 |
| Estilos | CSS-in-JS (inline styles) + clases CSS |
| Tipografía | Space Grotesk (Google Fonts) — pesos 300, 400, 500, 600 |
| Build | Dockerfile multi-stage (Node 20 + nginx alpine) |
| Deploy | Coolify v4 → Hetzner VPS |
| Dominio | catalogo.ioon.mx (wildcard DNS *.ioon.mx → 89.167.93.139) |
| Repo | GitHub `fjleonpacheco-cmd/-0_ioon`, carpeta `/catalogo-ioon` |

---

## 3. Estructura del proyecto

```
catalogo-ioon/
├── Dockerfile
├── nginx.conf
├── vite.config.js
├── package.json
├── index.html
└── src/
    ├── main.jsx
    └── App.jsx          ← Todo el sitio (393 líneas)
```

---

## 4. Diseño: Variante Negativo de directrices ioon

El catálogo usa la paleta ioon **invertida** (fondo oscuro, texto claro) para diferenciarse de los demos que siguen la paleta estándar (fondo claro).

### Paleta (6 tokens invertidos)

| Token | Hex | Uso |
|:---|:---|:---|
| `ink` | `#fafafa` | Texto principal, elementos activos |
| `paper` | `#0a0a0a` | Fondo de página |
| `muted` | `#71717a` | Texto secundario, labels, overlines |
| `accent` | `#a1a1aa` | Cuerpo de texto (párrafos) |
| `border` | `#27272a` | Líneas divisorias, bordes de cards |
| `highlight` | `#3f3f46` | Elementos terciarios (badge "Próximamente") |

Definidos en el objeto `C` (línea 40 del App.jsx):
```js
const C = {
  ink: "#fafafa",
  paper: "#0a0a0a",
  muted: "#71717a",
  accent: "#a1a1aa",
  border: "#27272a",
  highlight: "#3f3f46",
};
```

### Tipografía
- **Fuente:** Space Grotesk (única)
- **Peso dominante:** 300 (Light)
- **Labels/overlines:** 400, uppercase, letter-spacing 2–3px
- **Tabs activos:** 500
- **Headings:** weight 300, letter-spacing negativo (-0.5 a -1px)
- **Tamaños responsivos:** `clamp()` para headings

### Principios (mismos que directrices ioon)
- Sin sombras, sin gradientes decorativos, sin bordes redondeados
- Animaciones ≤ 0.35s, solo translateY(12px) + opacity
- Sin emojis, sin íconos de color

---

## 5. Arquitectura del componente App.jsx

### 5.1 Datos (líneas 1–47)

**Logo:** Embebido como base64 PNG en `LOGO_B64`. El logo es blanco sobre negro — se usa directo, sin `filter: invert()`.

**Array `INDUSTRIES`** — estructura:
```js
{
  id: "arquitectura",          // slug para filtro
  label: "Arquitectura",       // texto visible
  description: "Portafolios para despachos...",  // subtítulo
  demos: [
    {
      id: "demo-arquitectura-1",
      title: "Taller de Arquitectura",
      subtitle: "Portafolio con galería filtrable...",
      status: "live",                              // "live" → badge verde
      url: "https://demo-arquitectura-1.ioon.mx",  // abre en nueva pestaña
      tags: ["React", "Vite", "Responsive"],
    },
  ],
}
```

**Industrias actuales (2):**

| Industria | Demos | URL del demo |
|:---|:---|:---|
| Arquitectura | Taller de Arquitectura | demo-arquitectura-1.ioon.mx |
| Fotografía | Portafolio Fotográfico | demo-fotografia-1.ioon.mx |

### 5.2 State (línea 49–50)

| Estado | Tipo | Propósito |
|:---|:---|:---|
| `activeFilter` | `string` | ID de industria activa o `"todos"` |

### 5.3 Valores calculados

```js
const filtered    // Industrias filtradas según tab activo
const totalLive   // Conteo de demos con status "live" (para stats en hero)
```

### 5.4 Secciones del sitio

**1. Navegación (nav)**
- Logo ioon (base64 PNG, height 28px) a la izquierda
- Links: Demos (#catalogo), Proceso (#proceso), Contacto (#contacto) a la derecha
- Padding: 24px 80px
- Border-bottom: `1px solid ${C.border}`

**2. Hero**
- Overline: "Catálogo de demos — 2026" (13px, uppercase, letter-spacing 3px, color muted)
- Heading: `clamp(32px, 5vw, 56px)`, weight 300, letter-spacing -1px
- Body: 17px, weight 300, color accent, maxWidth 520px
- Stats en fila: 3 números grandes (`clamp(32px, 5vw, 48px)`) con labels (11px, uppercase)
  - Industrias (count dinámico)
  - Demos activos (count dinámico)
  - Próximamente (count dinámico)
- Padding: 120px 80px 100px
- maxWidth: 900px

**3. Filtros (tabs)**
- Estilo: tabs con underline activo (patrón L3 de directrices ioon)
- Opciones: "Todos" + una tab por cada industria en `INDUSTRIES`
- Activo: color ink, border-bottom 2px ink, weight 500
- Inactivo: color muted, sin border
- Border-bottom general: `1px solid ${C.border}`

**4. Cards de demos**
- Si industria tiene demos: card con borde `${C.border}`, padding 32px
  - Título: `clamp(18px, 2.2vw, 26px)`, weight 300
  - Badge "Live": dot de 6px + texto, color muted
  - Subtítulo: 16px, color accent
  - Tags: 10px, uppercase, letter-spacing 1px, color muted
  - **onClick:** `window.open(demo.url, "_blank")` → abre demo en nueva pestaña
- Si industria NO tiene demos: bloque "Próximamente" (color highlight)

**5. Proceso ("Cómo funciona")**
- Overline "Proceso" + heading "Cómo funciona"
- Grid 3 columnas con pasos:
  1. Explora — "Navega el catálogo y elige el demo..."
  2. Personaliza — "Nos envías tu contenido..."
  3. Lanzamos — "En días tienes tu sitio web profesional..."
- Números: `clamp(32px, 5vw, 48px)`, weight 300, italic style
- Border-top: `1px solid ${C.border}`

**6. Contacto**
- Overline "Contacto" + heading + párrafo
- CTA: `hola.ioon@gmail.com` como link con underline, uppercase, letter-spacing 2px
- Hover: color cambia de ink a muted

**7. Footer**
- Logo ioon (height 18px, opacity 0.3)
- "2026 — Innovación-as-a-Service" (11px, color highlight)
- Border-top: `1px solid ${C.border}`

---

## 6. Escala tipográfica

| Elemento | Font-size | Peso | Tracking |
|:---|:---|:---|:---|
| Hero heading | `clamp(32px, 5vw, 56px)` | 300 | -1px |
| Hero body | 17px | 300 | normal |
| Stats números | `clamp(32px, 5vw, 48px)` | 300 | -1px |
| Stats labels | 11px | 400 | 2px (uppercase) |
| Overlines | 13px | 400 | 3px (uppercase) |
| Section headings | `clamp(22px, 3vw, 34px)` | 300 | -0.5px |
| Industry description | 16px | 300 | normal |
| Demo title | `clamp(18px, 2.2vw, 26px)` | 300 | -0.5px |
| Demo subtitle | 16px | 300 | normal |
| Tags | 10px | 400 | 1px (uppercase) |
| Nav links | 13px | 400 | 2px (uppercase) |
| Filter tabs | 13px | 400 (500 activo) | normal |
| CTA link | 13px | 400 | 2px (uppercase) |
| Footer text | 11px | 400 | 2px (uppercase) |

---

## 7. Responsive (≤768px)

```css
.page-section { padding-left: 24px; padding-right: 24px; }
.hero-h1 { font-size: 32px; }
.stats-row { flex-direction: column; gap: 24px; }
.filters-row { flex-wrap: wrap; }
.filter-tab { padding: 6px 10px; font-size: 11px; }
.steps-grid { grid-template-columns: 1fr; }
```

---

## 8. Cómo agregar una nueva industria

### Paso 1: Crear el demo
Crear carpeta `demo-[industria]-1/` en el repo con la misma estructura (Dockerfile, nginx.conf, etc.) y desplegarlo en Coolify con su subdominio.

### Paso 2: Agregar al catálogo
En `App.jsx`, agregar un objeto al array `INDUSTRIES`:

```js
{
  id: "restaurantes",
  label: "Restaurantes",
  description: "Menús digitales, reservaciones y presencia web.",
  demos: [
    {
      id: "demo-restaurantes-1",
      title: "Nombre del Demo",
      subtitle: "Descripción breve del demo.",
      status: "live",
      url: "https://demo-restaurantes-1.ioon.mx",
      tags: ["React", "Vite", "Responsive"],
    },
  ],
},
```

### Paso 3: Push y redeploy
```bash
cp App.jsx ~/Downloads/2/-0_ioon/catalogo-ioon/src/App.jsx
cd ~/Downloads/2/-0_ioon
git add . && git commit -m "add [industria] al catálogo" && git push origin main
```
Redeploy del catálogo en Coolify.

**Notas:**
- Los stats del hero (Industrias, Demos activos, Próximamente) se calculan dinámicamente
- Los filtros/tabs se generan automáticamente a partir del array
- Si una industria tiene `demos: []`, muestra bloque "Próximamente"

---

## 9. Cómo agregar un demo sin industria activa (Próximamente)

Para mostrar una industria como "Próximamente" sin link:

```js
{
  id: "escuelas",
  label: "Escuelas",
  description: "Sitios institucionales con admisiones, programas y comunidad.",
  demos: [],    // array vacío → muestra "Próximamente"
},
```

---

## 10. Dependencias

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@vitejs/plugin-react": "^4.3.1",
  "vite": "^5.4.2"
}
```

Sin librerías externas. Todo es CSS puro + React hooks.

---

## 11. Relación con otros sitios

| Sitio | Relación |
|:---|:---|
| `catalogo.ioon.mx` | **Este sitio** — hub central |
| `demo-arquitectura-1.ioon.mx` | Demo linkeado desde card "Arquitectura" |
| `demo-fotografia-1.ioon.mx` | Demo linkeado desde card "Fotografía" |
| `canovera.ioon.mx` | Sitio real de cliente (NO es demo, NO aparece en catálogo) |
| `ioon.mx` | Sitio principal de ioon (link en nav y footer) |

---

## 12. Proceso de deploy del catálogo

1. Editar `App.jsx` (agregar industrias, cambiar copy, etc.)
2. Copiar a la carpeta del repo:
   ```bash
   cp App.jsx ~/Downloads/2/-0_ioon/catalogo-ioon/src/App.jsx
   ```
3. Push:
   ```bash
   cd ~/Downloads/2/-0_ioon
   git add . && git commit -m "mensaje" && git push origin main
   ```
4. Redeploy en Coolify (puede ser manual o automático si auto-deploy está activo)

### Configuración en Coolify
- **Resource name:** Catálogo ioon
- **Repository:** `fjleonpacheco-cmd/-0_ioon` (sin https://github.com/, sin .git)
- **Branch:** main
- **Base Directory:** `/catalogo-ioon`
- **Build Pack:** Dockerfile
- **Dominio:** `https://catalogo.ioon.mx`

---

## 13. Próximas mejoras posibles

- Agregar más industrias (Restaurantes, Escuelas, Salud, Inmobiliarias, etc.)
- Preview de imagen en cada demo card (screenshot o imagen representativa)
- Animación de entrada por scroll (intersection observer)
- Versión Astro para SEO/SSG
- Métricas de visitas por demo (analytics básico)
- Formulario de contacto funcional (webhook a n8n en vez de mailto)
- Toggle entre variante clara/oscura

---

## 14. Prompt para nuevo chat

```
Contexto: Soy Francisco León de ioon, estudio de innovación en Oaxaca. Tengo un catálogo de demos de websites en https://catalogo.ioon.mx para mostrar a prospectos de diferentes industrias.

El catálogo es una página en Vite + React (variante "negativo" de mis directrices de diseño: fondo oscuro, tipografía clara) que lista demos funcionales organizados por industria. Cada demo card abre el sitio funcional en su subdominio. Actualmente tengo 2 demos activos:
- Arquitectura → demo-arquitectura-1.ioon.mx
- Fotografía → demo-fotografia-1.ioon.mx

Adjunto:
- ioon_catalogo_v20260420-1115.md (documentación del catálogo)
- ioon-directrices-diseno_20260411-01.md (directrices de diseño)
- contexto_tecnico_ioon_20260411-1437.md (stack técnico)

Lo que necesito en este chat:
1. [ESPECIFICAR: ¿agregar industria? ¿rediseñar catálogo? ¿nuevo demo? ¿otra cosa?]

Stack: Hetzner VPS + Coolify + GitHub. Deploy: Vite + React → Dockerfile → nginx.
```

---

*Generado al cierre de sesión — Abril 20, 2026*
