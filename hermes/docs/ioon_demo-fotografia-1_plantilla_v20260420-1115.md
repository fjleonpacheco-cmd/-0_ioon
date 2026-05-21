# Plantilla: demo-fotografia-1

> **Proyecto:** Catálogo de demos para ioon.mx
> **Categoría:** Fotografía
> **URL en producción:** `https://demo-fotografia-1.ioon.mx`
> **Ruta en catálogo:** `https://catalogo.ioon.mx` → Fotografía → Portafolio Fotográfico
> **Fecha:** Abril 2026

---

## Qué es este archivo

Documentación técnica de un sitio web para fotógrafos, construido como demo funcional y desplegado en el stack de ioon. Diseño ultra-minimal inspirado en [folkert.cargo.site](https://folkert.cargo.site/). Sirve como base replicable para vender websites a clientes del nicho de fotografía.

---

## Stack técnico

| Capa | Herramienta |
|:---|:---|
| Framework | Vite + React 18 |
| Estilos | CSS-in-JS (inline styles) + clases CSS con media queries |
| Tipografía | Space Grotesk (Google Fonts) — pesos 300, 400, 500 |
| Build | Dockerfile multi-stage (Node 20 + nginx alpine) |
| Deploy | Coolify v4 → Hetzner VPS |
| Dominio | Subdominio en ioon.mx (wildcard DNS) |

---

## Estructura del proyecto

```
demo-fotografia-1/
├── Dockerfile
├── nginx.conf
├── vite.config.js
├── package.json
├── index.html
└── src/
    ├── main.jsx
    └── App.jsx          ← Todo el sitio vive aquí (834 líneas)
```

---

## Arquitectura del componente App.jsx

El sitio es un **single-file React component** con 3 vistas y múltiples capas visuales.

### 1. Datos (líneas 3–175)

**Objeto `PHOTOGRAPHER`** (línea 4):
```js
{
  name: "Nombre Apellido",
  tagline: "Fotógrafo",
  location: "Ciudad, País",
  email: "hola@nombre.com",
  instagram: "@nombre",
}
```

**Array `CATEGORIES`** (línea 12) — estructura jerárquica de 2 niveles:
```js
{
  id: "retrato",
  label: "Retrato",
  archive: false,        // opcional — true solo para "Archivo"
  projects: [
    {
      id: 1,
      title: "Pedro",
      year: "2024",       // presente en datos pero NO se muestra en UI
      images: [
        "https://url-imagen-1.jpg",
        "https://url-imagen-2.jpg",
        // mínimo 3, máximo 6 recomendado
      ],
    },
  ],
}
```

**Categorías actuales:**

| Categoría | Tipo | Proyectos | Estado inicial |
|:---|:---|:---|:---|
| Retrato | normal | Pedro, Juan, María | Desplegado |
| Arquitectura | normal | Casa Habitación, Edificio de oficinas, Hospital | Colapsado |
| Gastronomía | normal | Pomodoro, Garlic, Fetuccini | Colapsado |
| Archivo | `archive: true` | Vereda tropical, Entonces, Ojitos de golondrina | Colapsado |

**`ALL_PROJECTS`** (línea 165) — lista plana generada automáticamente:
```js
const ALL_PROJECTS = CATEGORIES.flatMap((c) => c.projects);
```
Se usa para la navegación secuencial entre proyectos (↑↓).

**Array `HERO_IMAGES`** (línea 168) — imágenes que se muestran al azar al cargar:
```js
const HERO_IMAGES = [
  "https://url-1.jpg",
  "https://url-2.jpg",
  // 6 imágenes actualmente, se elige 1 al azar por sesión
];
```

### 2. State del componente (líneas 180–188)

| Estado | Tipo | Propósito |
|:---|:---|:---|
| `view` | `"index"` / `"project"` / `"info"` | Vista activa |
| `hoveredId` | `number \| null` | ID del proyecto bajo el cursor |
| `activeProject` | `object \| null` | Proyecto abierto en vista fullscreen |
| `imageIndex` | `number` | Índice de imagen actual en vista proyecto |
| `mousePos` | `{x, y}` | Posición del mouse (no usado activamente) |
| `touchStart` | `number \| null` | Coordenada X de inicio de swipe |
| `heroImage` | `string` | URL de imagen hero (aleatorio, fijo por sesión) |
| `expandedCats` | `string[]` | IDs de categorías desplegadas (default: `["retrato"]`) |

### 3. Vista Índice (`view === "index"`)

Capas apiladas por z-index:

| z-index | Capa | Descripción |
|:---|:---|:---|
| 0 | Hero image | Imagen aleatoria, 55% derecho del viewport, full height |
| 2 | Lista de proyectos | Índice de texto con categorías desplegables |
| 3 | Hover image | Reemplaza hero al hacer hover en un proyecto |
| 4 | Tipografía vertical | Nombres de categorías como decoración centrada |
| 50 | Navegación | Header fijo transparente |

**Hero image:**
- Posición: fixed, right: 0, top: 0, bottom: 0, width: 55vw
- Se oculta (opacity: 0) cuando hay un hover activo
- Transición: `opacity 0.3s ease`

**Tipografía vertical:**
- `writingMode: vertical-rl` + `transform: rotate(180deg)` → lectura de abajo hacia arriba
- Centrada horizontalmente en el viewport
- Alineada arriba (`alignItems: flex-start`, `paddingTop: 80px`)
- Palabras actuales: "Retrato", "  Arquitectura", "    Gastronomía" (espacios = indentación)
- `whiteSpace: "pre"` para respetar espacios
- Color: `#e4e4e7` (muy sutil)
- Font-size: `clamp(60px, 10vw, 140px)`, peso 400
- Se oculta en móvil

**Categorías desplegables:**
- Cada categoría tiene un botón con flecha `→` que rota a `↓` al abrir
- Toggle: clic agrega/quita ID del array `expandedCats`
- Solo Retrato abierto por defecto

**Hover image:**
- Mismas dimensiones que hero (55vw, full height)
- Se muestra al hacer hover sobre un proyecto
- z-index 3 → sobre hero (0) pero bajo tipografía vertical (4)

### 4. Escala tipográfica del índice

| Elemento | Font-size | Peso | Pts |
|:---|:---|:---|:---|
| Categorías principales | `clamp(14px, 2vw, 17px)` | 400 | 10.5–12.75 |
| Categoría Archivo | `12px` | 400 | 9 |
| Proyectos principales | `clamp(10px, 1.5vw, 14px)` | 300 | 7.5–10.5 |
| Proyectos Archivo | `10.67px` | 300 | 8 |
| Flecha de categoría | `10px` | — | — |

### 5. Líneas divisorias

| Entre qué | Grosor | Color |
|:---|:---|:---|
| Sobre primera categoría (Retrato) | 1px | `#0a0a0a` (negro) |
| Entre categorías normales | 1px | `#0a0a0a` (negro) |
| Antes de Archivo | 1.25px | `#0a0a0a` (negro) |
| Entre proyectos dentro de categoría | 0.5px | `#d4d4d8` (gris) |

### 6. Navegación (header)

- Posición fija, z-index 50
- Fondo: **transparente** (sin backdrop-filter)
- Izquierda: nombre del fotógrafo (13px, uppercase, letter-spacing 3px)
- Derecha: "Índice" y "Info" (13px, uppercase, letter-spacing 2px)
- En vista proyecto: textos con `mixBlendMode: "difference"` para contraste

### 7. Vista Proyecto (`view === "project"`)

- Fullscreen con fondo `#0a0a0a`
- Imagen centrada con `object-fit: contain`, padding 72px vertical
- **Navegación de imágenes:**
  - Desktop: clic en mitad izquierda/derecha de pantalla (cursor: w-resize / e-resize)
  - Móvil: swipe horizontal (threshold: 50px)
  - Teclado: ← → (imágenes), ↑ ↓ (proyecto anterior/siguiente), Esc (cerrar)
- **UI superpuesta:**
  - Título + categoría + año: bottom-left
  - Contador (ej. "2 / 4"): bottom-center
  - "Cerrar": top-right
  - "↑ Anterior" / "Siguiente ↓": bottom-right
- Todos los textos en color `rgba(250,250,250,0.4)`, hover → `#fafafa`

### 8. Vista Info (`view === "info"`)

- Grid de 2 columnas (1 en móvil)
- Columna izquierda: bio del fotógrafo (frase grande + párrafo)
- Columna derecha:
  - Contacto (email + instagram)
  - Ubicación
  - Clientes seleccionados
- Footer con "Sitio por ioon"

---

## Variables de personalización por cliente

Para adaptar a un nuevo fotógrafo, modificar:

| Variable | Ubicación | Ejemplo genérico |
|:---|:---|:---|
| Nombre | `PHOTOGRAPHER.name` | `"Nombre Apellido"` |
| Tagline | `PHOTOGRAPHER.tagline` | `"Fotógrafo"` |
| Ubicación | `PHOTOGRAPHER.location` | `"Ciudad, País"` |
| Email | `PHOTOGRAPHER.email` | `"hola@nombre.com"` |
| Instagram | `PHOTOGRAPHER.instagram` | `"@nombre"` |
| Categorías | Array `CATEGORIES` | Retrato, Arquitectura, Gastronomía, Archivo |
| Proyectos | Dentro de cada categoría | 3 proyectos por categoría, 3–6 imágenes c/u |
| Hero images | Array `HERO_IMAGES` | 6 URLs de imágenes representativas |
| Tipografía vertical | Array de strings en render | `["Retrato", "  Arquitectura", "    Gastronomía"]` |
| Bio (vista Info) | Texto en JSX (vista info) | Párrafo descriptivo del fotógrafo |
| Clientes | Texto en JSX (vista info) | Lista de publicaciones/marcas |
| Categoría abierta | `useState(["retrato"])` | ID de la categoría desplegada por defecto |
| Tipografía | `FONT_LINK` + `font-family` | Space Grotesk (puede cambiarse) |
| Dominio | Coolify + DNS | `cliente.com` o `cliente.ioon.mx` |

---

## Contenido genérico de la plantilla

- **Nombre:** Nombre Apellido
- **Categorías y proyectos:**
  - Retrato: Pedro, Juan, María
  - Arquitectura: Casa Habitación, Edificio de oficinas, Hospital
  - Gastronomía: Pomodoro, Garlic, Fetuccini
  - Archivo: Vereda tropical, Entonces, Ojitos de golondrina
- **Bio:** "Fotógrafo interesado en la relación entre el espacio construido, el paisaje natural y las personas que los habitan."
- **Clientes:** ArchDaily, Domus, Apartamento Magazine, Monocle, The New York Times, Nike, Aesop, Muji
- **Imágenes:** Unsplash placeholders

---

## Responsive

- **Desktop (>768px):** Índice con hover image + tipografía vertical, flechas en vista proyecto
- **Móvil (≤768px):** Sin hover image ni tipografía vertical, swipe en vista proyecto, categorías con scroll horizontal, grid Info de 1 columna

### Media query (≤768px):
```css
.desktop-nav { display: none; }
.hamburger { display: block; }
.hover-image { display: none; }
.vertical-type { display: none; }
.cursor-arrow { display: none; }
.index-container { padding: 80px 24px 60px; }
.project-title-text { font-size: 20px; }
.info-container { padding: 80px 24px; grid-template-columns: 1fr; }
```

---

## Dependencias

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@vitejs/plugin-react": "^4.3.1",
  "vite": "^5.4.2"
}
```

Sin librerías externas de UI. Todo es CSS puro + React hooks.

---

## Inspiración de diseño

- **folkert.cargo.site** — Índice de texto como lista, imágenes como resultado de interacción (hover/clic), casi cero UI visible, tipografía grande como decoración.
- **Directrices ioon** — Space Grotesk, paleta de 6 valores, peso 300 dominante, sin sombras, sin gradientes decorativos, animaciones ≤ 0.4s.

---

## Proceso de deploy

1. Duplicar carpeta `demo-fotografia-1/`
2. Modificar contenido en `App.jsx` (datos, textos, imágenes)
3. Push a GitHub (branch: `main`, subcarpeta de `-0_ioon`)
4. En Coolify: New Resource → Public GitHub
   - Repository: `fjleonpacheco-cmd/-0_ioon` (sin URL completa)
   - Branch: `main`
   - Base Directory: `/nombre-carpeta`
   - Build Pack: Dockerfile
   - Dominio: subdominio deseado
5. Deploy

---

## Próximas mejoras posibles

- Transiciones entre imágenes en vista proyecto (crossfade en vez de corte directo)
- Lazy loading de imágenes en el índice (preload solo de la primera imagen)
- Animación de entrada en categorías al desplegar (height transition)
- Soporte para video (embed de Vimeo/YouTube en array de imágenes)
- Versión Astro para SEO/SSG
- Formulario de contacto funcional (webhook a n8n)
- Integración con carpeta de imágenes local en vez de Unsplash URLs
- Modo galería grid como vista alternativa al índice de texto

---

## Prompt para nuevo chat

```
Contexto: Soy Francisco León de ioon, estudio de innovación en Oaxaca. Tengo un catálogo de demos de websites en ioon.mx. Cada demo es un sitio funcional desplegado en mi Hetzner con Coolify.

Ya tengo un demo de fotografía: "demo-fotografia-1" en https://demo-fotografia-1.ioon.mx. Es un portafolio ultra-minimal para fotógrafos inspirado en folkert.cargo.site, con índice de texto, categorías desplegables, hero aleatorio, hover images, tipografía vertical decorativa y vista proyecto fullscreen con swipe. Construido en Vite + React como single-file component.

Adjunto:
- demo-fotografia-1_plantilla.md (documentación técnica completa)
- ioon-directrices-diseno_20260411-01.md (directrices de diseño)
- contexto_tecnico_ioon_20260411-1437.md (stack técnico)

Lo que necesito en este chat:
1. [ESPECIFICAR: ¿ajustes al demo? ¿nuevo demo? ¿personalizar para cliente? ¿otra cosa?]

Mi stack: Hetzner VPS + Coolify + GitHub. Deploy pattern: Vite + React → Dockerfile → nginx.
```

---

*Generado al cierre de sesión — Abril 20, 2026*
