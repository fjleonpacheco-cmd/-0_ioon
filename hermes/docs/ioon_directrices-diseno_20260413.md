# ioon.mx — Directrices de diseño (v 20260413)

> Adjunta este archivo a cualquier chat para que se respeten las reglas visuales de ioon.mx y su sistema de presentaciones.

---

## 1. Identidad

**ioon** es un estudio de innovación en Oaxaca, México. Dirigido por Francisco León (Director de Arte y Fotógrafo).

Filosofía: Diseño limpio y con estrategia + Tecnología Open Source + Agentes de IA que trabajan por ti.

- Sitio: https://ioon.mx
- Repo: https://github.com/fjleonpacheco-cmd/-0_ioon
- Repo local (Mac): `~/Documentos/-0_ioon`
- Contacto: hola@ioon.mx | +52 951 508 1629

---

## 2. Principios de diseño

- **Minimalismo extremo.** Mucho espacio en blanco. Cada elemento que existe tiene una razón para estar ahí.
- **Tipografía como protagonista.** El texto es el elemento visual principal. No se decora, se compone.
- **Sin elementos genéricos.** Nada de templates, stock icons, gradientes decorativos, sombras innecesarias ni bordes redondeados excesivos. Diseño de autor.
- **Editorial, no corporativo.** La inspiración son portfolios de arquitectura y galerías de arte contemporáneo, no dashboards de SaaS.
- **Funcional ante todo.** Cada interacción (navegación, transición, hover) debe sentirse natural y silenciosa, no llamativa.

---

## 3. Paleta de color

Solo seis valores + un color de galería. Sin excepciones, sin variantes, sin opacidades inventadas (excepto las documentadas en overlays).

| Token | Hex | Uso |
|-------|-----|-----|
| `ink` | `#0a0a0a` | Texto principal, elementos activos, barra de progreso, dots activos |
| `paper` | `#fafafa` | Fondo de página, fondo de slides |
| `muted` | `#71717a` | Texto secundario, overlines, labels, dots inactivos, subtítulos, citas (cite) |
| `accent` | `#18181b` | Cuerpo de texto (body, bullets) — ligeramente más suave que ink |
| `border` | `#e4e4e7` | Líneas divisorias, bordes de tabs, fondos de placeholders de imagen |
| `highlight` | `#d4d4d8` | Elementos terciarios, badges decorativos |
| `gallery-bg` | `#f0f0f0` | Fondo del overlay de galería |

### CSS Variables

```css
@theme {
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --color-ink: #0a0a0a;
  --color-paper: #fafafa;
  --color-muted: #71717a;
  --color-accent: #18181b;
  --color-border: #e4e4e7;
  --color-highlight: #d4d4d8;
  --color-gallery-bg: #f0f0f0;
}
```

### Reglas de color

- **Nunca** usar colores fuera de esta paleta en componentes de ioon.
- **Nunca** usar gradientes decorativos. El único gradiente permitido es el overlay oscuro sobre imágenes de fondo (`rgba(10,10,10,.7)` → `rgba(10,10,10,.1)` → `transparent`).
- **Nunca** usar sombras (box-shadow, text-shadow). La jerarquía se logra con tipografía, peso y espaciado.
- Los estados hover cambian de `muted` a `ink`. No hay colores de hover especiales.

---

## 4. Tipografía

### Fuente única: Space Grotesk

- CDN: Google Fonts o Florian Karsten
- Pesos disponibles: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Fallback: `system-ui, sans-serif`

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Escala tipográfica en presentaciones

| Elemento | Tamaño | Peso | Tracking | Line-height |
|----------|--------|------|----------|-------------|
| Heading principal (h1 en title y concept) | `clamp(32px, 5vw, 56px)` | 300 | `-1px` | 1.15 |
| Heading de slide (h2) | `clamp(22px, 3vw, 34px)` | 300 | `-0.5px` | — |
| Heading L3 (sub-tab) | `clamp(18px, 2.2vw, 26px)` | 300 | `-0.5px` | — |
| Subheading en concept | `clamp(22px, 3vw, 34px)` | 300 | `-0.5px` | — |
| Body / párrafos | `16px` – `17px` | 300 | normal | 1.7 |
| Bullets (li) | `15px` | 300 | normal | 1.6 |
| Overline | `13px` | 400 | `3px` | — |
| Section label | `11px` | 400 | `2px` | — |
| Quote (blockquote) | `clamp(20px, 3vw, 30px)` | 300 | normal | 1.5 |
| Cite / atribución | `14px` | 400 | normal | — |
| Tabs L3 | `13px` | 400 (500 activo) | normal | — |
| Nav arrows | `14px` | inherit | normal | — |
| Badge / labels | `9px` – `10px` | 400 | `1px` | — |
| Nombre de imagen (debug) | `8px` | 400 | `0.3px` | — |

### Reglas tipográficas

- **El peso dominante es 300** (Light). Casi todo el texto visible es light. 400 se usa para labels y UI. 500 solo para tabs activos. 600-700 casi nunca.
- **Letter-spacing negativo** en headings (−0.5px a −1px). Esto es lo que da el carácter editorial.
- **Letter-spacing positivo** en overlines y labels (2px–3px) siempre en uppercase.
- **Máximo ancho de párrafo:** 680px. Nunca dejar texto corrido a ancho completo.
- **Máximo ancho de quote:** 700px.
- **Máximo ancho de contenedor de slide:** 900px.
- **Italic** en blockquotes, placeholders de imagen y headings de tipo concept cuando se indica con `headingHtml`.
- **Bold** casi nunca. Si se necesita énfasis, usar contraste de tamaño o un slide separado.
- Las listas no usan bullets estándar del navegador. Se usa un punto circular de 4px de diámetro en color `muted`, posicionado absoluto a la izquierda.

---

## 5. Espaciado

### Padding del stage (área de contenido)

- **Desktop:** `40px 80px 60px` (arriba, lados, abajo)
- **Móvil (≤768px):** `30px 24px 60px`

### Márgenes internos de contenido

| Entre qué | Espacio |
|-----------|---------|
| Heading → imagen/contenido | `16px` (margin-bottom del h2) |
| Imagen → párrafo | `16px` (margin-bottom del img-block) |
| Párrafo → bullets | `14px` (margin-top del ul) |
| Bullet → bullet | `5px` (margin-bottom del li) |
| Body introductorio → tabs L3 | `20px` |
| Tabs L3 → contenido del tab | `20px` (margin-bottom de .l3-tabs) |
| Heading L3 → imagen/contenido | `12px` |
| Overline → heading (en title) | `16px` |
| Heading → subheading (en title) | `12px` |
| Heading → subheading (en concept) | `12px` |
| Subheading → body (en concept) | `16px` |
| Quote → cite | `20px` |

### Gaps entre imágenes

| Layout | Gap |
|--------|-----|
| `2x` (dos imágenes) | `10px` |
| `4p` (cuatro imágenes) | `8px` |

### Elementos de navegación (posición fija)

| Elemento | Posición |
|----------|----------|
| Barra de progreso | `top: 0`, `height: 2px` |
| Section label | `top: 16px`, `left: 80px` |
| V-dots | `left: 20px`, centrado vertical |
| H-dots | `bottom: 40px`, centrado horizontal |
| Nav arrows | `bottom: 12px`, centrado horizontal, `gap: 24px` |

---

## 6. Componentes de navegación

### Barra de progreso
- Línea de 2px en la parte superior, color `ink`, ancho proporcional al avance total.
- Transición: `width 0.3s ease`.

### Dots verticales (secciones)
- Círculos de 8×8px, borde 1.5px `muted`, fondo transparente.
- Activo: fondo `ink`, borde `ink`.
- Gap entre dots: 6px.
- Posición: fija a la izquierda (20px desktop, 8px móvil), centrada verticalmente.
- **Rollover:** muestra nombre de sección (10px, uppercase, letter-spacing 1px, color `muted`), posicionado a la derecha del dot.

### Dots horizontales (sub-slides)
- Círculos de 7×7px, misma lógica que v-dots.
- Gap: 6px.
- Solo aparecen si la sección tiene más de 1 slide.
- Posición: centrada horizontal, `bottom: 40px`.
- **Rollover:** muestra título del sub-slide (9px, color `muted`), posicionado encima del dot con fondo `paper`, padding `2px 6px`, borde 1px `border`, border-radius 3px.

### Tabs L3 (tercer nivel)
- Pestañas de texto con borde inferior.
- Inactivo: texto `muted`, sin borde inferior.
- Activo: texto `ink`, borde inferior 2px `ink`, peso 500.
- Hover (no activo): texto `accent`.
- Línea base: 1px `border`.
- Padding: `8px 16px` (desktop), `6px 10px` (móvil).
- Font-size: 13px (desktop), 11px (móvil).

### Flechas de navegación
- Caracteres Unicode: ↑ ↓ ← →
- Color `muted`, hover `ink`.
- Font-size: 14px.
- Sin fondo, sin borde.

---

## 7. Animaciones

### slideIn / fadeIn (transición de slide)
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- Duración: 0.35s ease.
- Se aplica a cada slide al renderizar.
- Los sub-contenidos dentro de tabs L3 usan 0.25s.
- Las imágenes en la galería usan 0.25s.

### Transiciones de UI
- Dots: `all 0.25s`
- Tabs: `all 0.2s`
- Nav buttons: `color 0.2s`
- Barra de progreso: `width 0.3s ease`
- Outline de imagen con galería: `outline 0.2s`

### Reglas de animación
- **Nunca** usar bouncing, scaling, rotating ni efectos llamativos.
- **Nunca** usar transiciones de más de 0.4s.
- Todo movimiento es vertical (translateY) y sutil (12px máximo).
- La opacidad siempre va de 0 a 1, sin valores intermedios.

---

## 8. Layouts de imagen

Seis configuraciones posibles para imágenes dentro de slides. Todas se colocan entre el heading y el body/bullets.

| Código | Ratio | Imágenes | CSS |
|--------|-------|----------|-----|
| `a` | 4:3 | 1 | `aspect-ratio: 4/3; width: 100%` |
| `2x` | 4:3 × 2 | 2 lado a lado | `flex: 1; aspect-ratio: 4/3; gap: 10px` |
| `1of2` | 4:3 | 1 al 50% del ancho | `aspect-ratio: 4/3; width: 50%` |
| `4p` | 3:4 × 4 | 4 en fila | `flex: 1; aspect-ratio: 3/4; gap: 8px` |
| `wide` | 16:9 | 1 | `aspect-ratio: 16/9; width: 100%` |
| `full` | 16:9 | 1 (fondo) | Fondo absoluto con overlay gradient |

### Placeholders
- Fondo: `border` (#e4e4e7), border-radius: 4px
- Ícono central: SVG de imagen (landscape icon), opacity 0.15
- Label de ratio en esquina inferior derecha: 9px, `muted`, opacity 0.5
- **Nombre de archivo** en esquina inferior izquierda: 8px, monospace, `muted`, opacity 0.65

### Imágenes con galería
- Las imágenes que tienen galería muestran: cursor pointer, outline 2px `muted` en hover, ícono ⤢ (12px, `muted`, opacity 0.5) en esquina superior derecha.
- Al hacer clic se abre el overlay de galería.

### Responsive (≤768px)
- `4p` se reorganiza en grid 2×2 con `flex-wrap: wrap` y `min-width: calc(50% - 4px)`.

### Orden de elementos en un slide tipo text con imagen
1. `<h2>` Heading
2. Bloque de imagen(es) según layout
3. `<p>` Body y/o `<ul>` Bullets

---

## 9. Tipos de slide

| Tipo | Layout | Campos requeridos | Campos opcionales |
|------|--------|------------------|-------------------|
| `title` | Texto centrado | `heading` | `overline`, `subheading` |
| `text` | Alineado izquierda | al menos uno de: `heading`, `body`, `bullets` | `imgLayout`, `images`, `names`, `gal`, `l3` |
| `concept` | Alineado izquierda, heading grande | `heading` o `headingHtml` | `subheading`, `body`, `bodyHtml` |
| `image` | Imagen pantalla completa | `src` | `alt`, `caption` |
| `split` | 50/50 imagen + texto | `src` | `heading`, `body`, `alt` |
| `quote` | Cita centrada, itálica | `text` | `attribution` |

### Slide title
- Overline: 13px, uppercase, letter-spacing 3px, color `muted`. Formato: `"ioon × Nombre del Cliente"`.
- Heading: el texto más grande de toda la presentación.
- Subheading: 16px, color `muted`, debajo del heading.

### Slide text
- Heading + body es la combinación más común.
- Bullets usan dots de 4px, no viñetas estándar.
- Puede incluir `imgLayout` + `names` para colocar imágenes entre heading y body.
- Puede incluir `gal` para hacer imágenes clicables con galería.
- Puede incluir `l3` para activar tabs de tercer nivel.

### Slide concept
- **Heading grande** al tamaño del título principal (`clamp(32px, 5vw, 56px)`, peso 300).
- Soporta `headingHtml` para itálicas, negritas, etc.
- **Subheading** al tamaño de heading de text (`clamp(22px, 3vw, 34px)`), color `muted`.
- **Body** al tamaño normal de párrafo (16px).
- Orden visual: heading → subheading → body.
- Alineado a la izquierda (no centrado como title).

```json
{
  "type": "concept",
  "headingHtml": "<i>Frase grande en itálicas.</i>",
  "subheading": "Etiqueta o subtítulo",
  "bodyHtml": "Descripción con <b>HTML</b>"
}
```

### Slide quote
- Blockquote en itálica, peso 300, centrado.
- Attribution precedida por dash largo: `— Autor`.

---

## 10. Sistema de galería

Las imágenes dentro de slides pueden ser clicables para abrir una galería a pantalla completa.

### Activación
Se agrega el campo `gal` al slide o al item L3. `gal` es un array paralelo a `names`, donde cada posición contiene un array de filenames:

```json
{
  "type": "text",
  "heading": "Ejemplo",
  "img": "4p",
  "names": ["portada-a.jpg", "portada-b.jpg", "portada-c.jpg", "portada-d.jpg"],
  "gal": [
    ["portada-a.jpg", "a-g1.jpg", "a-g2.jpg"],
    ["portada-b.jpg", "b-g1.jpg"],
    null,
    ["portada-d.jpg", "d-g1.jpg", "d-g2.jpg", "d-g3.jpg"]
  ]
}
```

- Posición 0: clicable, 3 imágenes verticales (portada + 2 extras)
- Posición 1: clicable, 2 imágenes verticales
- Posición 2: `null` = no clicable
- Posición 3: clicable, 4 imágenes verticales

### Overlay de galería
- Fondo: `gallery-bg` (#f0f0f0)
- Imagen principal: 80% del ancho (max 900px), aspect-ratio 4:3, border-radius 6px
- Nombre de archivo visible en esquina inferior izquierda (11px, monospace)
- Indicador de posición vertical arriba a la izquierda (↑↓ 1/3)
- Contador horizontal arriba a la izquierda (← 2/4 →)
- Título del slide arriba al centro (11px, uppercase, letter-spacing 2px)
- Botón cerrar (✕) arriba a la derecha

### Navegación en galería
- **←→** navega entre portadas contiguas (horizontal)
- **↑↓** navega en profundidad vertical (más imágenes del mismo subtema)
- **Esc** cierra la galería
- **Dots horizontales** abajo al centro (7px, misma estética que h-dots)
- **Dots verticales** a la derecha (6px, solo si hay más de 1 imagen vertical)

### Sintaxis en mapas estructurales
```
→ archivo.jpg ★galería         portada clicable
    ↳ archivo-g1.jpg           vertical 1 (solo en galería)
    ↳ archivo-g2.jpg           vertical 2
→ archivo.jpg                  imagen normal (no clicable)
```

### Convención de nombres
- Portada: `SS-SL-TT-descripcion.jpg`
- Verticales: `SS-SL-TT-descripcion-g1.jpg`, `-g2.jpg`, `-g3.jpg`...

---

## 11. Tercer nivel de navegación (L3)

Se activa agregando `l3` a un slide de tipo `text`. Los tabs se renderizan como pestañas de texto con underline activo, dentro del área de contenido.

### Estructura de un item L3

```json
{
  "label": "Texto de la pestaña",
  "heading": "Título del contenido",
  "body": "Párrafo de texto.",
  "bullets": ["Opcionales"],
  "img": "2x",
  "names": ["archivo-a.jpg", "archivo-b.jpg"],
  "gal": [
    ["archivo-a.jpg", "archivo-a-g1.jpg"],
    null
  ]
}
```

### Campos de cada item L3

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `label` | Sí | Texto de la pestaña |
| `heading` | Sí | Título del contenido |
| `body` | No | Párrafo plano |
| `bodyHtml` | No | Párrafo con HTML (prioridad sobre body) |
| `bullets` | No | Array de strings |
| `img` | No | Layout de imagen: `a`, `2x`, `1of2`, `4p`, `wide` |
| `names` | No | Array de nombres de archivo |
| `gal` | No | Array de arrays para galería (paralelo a names) |

### Comportamiento de navegación
- ← → navega entre tabs L3 antes de pasar al siguiente slide.
- Al entrar a un slide con L3, siempre muestra el primer tab.
- Al retroceder desde el slide siguiente, muestra el último tab.

---

## 12. Tres layouts de presentación

### Layout 1: Clásico (slides lineales)
- Sin `"layout"` en el config.
- Navegación: solo ← →.

### Layout 2: Secciones (2 niveles)
- `"layout": "sections"` en el config.
- Navegación: ↑↓ secciones + ←→ sub-slides.
- Dots verticales con rollover de nombre de sección.
- Dots horizontales con rollover de título de sub-slide.

### Layout 3: Secciones + L3 Tabs (3 niveles)
- Igual que Layout 2, pero algunos slides incluyen `l3`.
- ←→ navega sub-slides y tabs L3.

---

## 13. Estructura del proyecto

```
~/Documentos/-0_ioon/
├── src/
│   ├── content/
│   │   ├── clientes/<slug>.json
│   │   └── presentaciones/<slug>/config.json
│   ├── layouts/Base.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── [client].astro
│   │   ├── presentaciones/[slug].astro
│   │   └── <clienteslug>/<num>_<tema>.astro  ← redirects
│   └── styles/global.css
├── public/
│   ├── logo.png
│   ├── favicon.svg
│   └── presentaciones/<slug>/  ← imágenes locales
```

### Stack técnico
- Astro 5 (framework estático)
- Tailwind CSS 4 (con CSS variables)
- Docker + Nginx (deploy via Coolify en Hetzner VPS)
- Auto Deploy en push a `main`

---

## 14. Convenciones de naming

- **Slugs de cliente:** minúsculas sin guiones → `educativoantequera`, `serclin`
- **Slugs de presentación:** `<clienteslug>-<num>_<tema>` → `educativoantequera-1_el-siguiente-capitulo`
- **Imágenes de slides:** `SS-SL-TT-descripcion-letra.jpg` (SS=sección, SL=sub-slide, TT=tab)
- **Imágenes de galería:** `SS-SL-TT-descripcion-g1.jpg`, `-g2.jpg`, etc.
- **Overline:** siempre `"ioon × Nombre del Cliente"`
- **Subheading en portada:** `"Descripción — Mes Año"`

---

## 15. Flujo de trabajo con mapas estructurales

Para diseñar una presentación se usa un archivo `.txt` como mapa estructural que define toda la estructura antes de generar el HTML o config.json.

### Formato del mapa

```
X  NOMBRE DE SECCIÓN
   X.Y  [tipo] — imgLayout: layout
        heading: Texto
        body: Texto
        imágenes:
          → nombre.jpg
          → nombre.jpg ★galería
              ↳ nombre-g1.jpg
   X.Y  [tipo + L3] — heading fijo arriba
        heading: Texto
        body: Texto
        X.Y.Z [tab: Label] — imgLayout: layout
              heading: Texto
              body: Texto
              imágenes:
                → nombre-a.jpg
                → nombre-b.jpg
```

### Flujo
1. Generar mapa estructural `.txt` con la estructura completa
2. Iterar sobre el mapa (cambiar layouts, copys, imágenes)
3. Generar HTML de preview local (`propuesta-cN.html`)
4. Cuando esté aprobado, generar `config.json` para deploy

---

## 16. Lo que nunca debe hacerse

- Usar colores fuera de la paleta de 7 valores (6 + gallery-bg).
- Usar sombras, gradientes decorativos o bordes redondeados mayores a 4px.
- Usar tipografías que no sean Space Grotesk.
- Usar pesos mayores a 500 en contenido visible.
- Usar animaciones que duren más de 0.4s o que involucren escala/rotación.
- Agregar decoraciones, separadores elaborados, íconos de stock o ilustraciones genéricas.
- Centrar párrafos de texto (solo quotes y titles se centran; concept se alinea a la izquierda).
- Agregar bordes visibles a elementos de contenido (solo tabs y dots tienen bordes funcionales).
- Usar emojis, íconos de color, badges con fondo de color o chips estilizados.

---

## 17. Resumen en una frase

**ioon es blanco, negro, light weight, editorial, silencioso y preciso. Si un elemento no es necesario, no existe.**
