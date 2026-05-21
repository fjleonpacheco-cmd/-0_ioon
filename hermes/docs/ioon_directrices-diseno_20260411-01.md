# ioon.mx — Directrices de diseño

> Adjunta este archivo a cualquier chat para que se respeten las reglas visuales de ioon.mx y su sistema de presentaciones.

---

## 1. Identidad

**ioon** es un estudio de innovación en Oaxaca, México. Dirigido por Francisco León (Director de Arte y Fotógrafo).

Filosofía: Diseño limpio y con estrategia + Tecnología Open Source + Agentes de IA que trabajan por ti.

- Sitio: https://ioon.mx
- Repo: https://github.com/fjleonpacheco-cmd/-0_ioon
- Contacto: hola.ioon@gmail.com | +52 951 508 1629

---

## 2. Principios de diseño

- **Minimalismo extremo.** Mucho espacio en blanco. Cada elemento que existe tiene una razón para estar ahí.
- **Tipografía como protagonista.** El texto es el elemento visual principal. No se decora, se compone.
- **Sin elementos genéricos.** Nada de templates, stock icons, gradientes decorativos, sombras innecesarias ni bordes redondeados excesivos. Diseño de autor.
- **Editorial, no corporativo.** La inspiración son portfolios de arquitectura y galerías de arte contemporáneo, no dashboards de SaaS.
- **Funcional ante todo.** Cada interacción (navegación, transición, hover) debe sentirse natural y silenciosa, no llamativa.

---

## 3. Paleta de color

Solo seis valores. Sin excepciones, sin variantes, sin opacidades inventadas (excepto las documentadas en overlays).

| Token | Hex | Uso |
|-------|-----|-----|
| `ink` | `#0a0a0a` | Texto principal, elementos activos, barra de progreso, dots activos |
| `paper` | `#fafafa` | Fondo de página, fondo de slides |
| `muted` | `#71717a` | Texto secundario, overlines, labels, dots inactivos, subtítulos, citas (cite) |
| `accent` | `#18181b` | Cuerpo de texto (body, bullets) — ligeramente más suave que ink |
| `border` | `#e4e4e7` | Líneas divisorias, bordes de tabs, fondos de placeholders de imagen |
| `highlight` | `#d4d4d8` | Elementos terciarios, badges decorativos, dots L3 inactivos |

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
| Heading principal (h1 en title) | `clamp(32px, 5vw, 56px)` | 300 | `-1px` | 1.15 |
| Heading de slide (h2) | `clamp(22px, 3vw, 34px)` | 300 | `-0.5px` | — |
| Heading L3 (sub-tab) | `clamp(18px, 2.2vw, 26px)` | 300 | `-0.5px` | — |
| Body / párrafos | `16px` – `17px` | 300 | normal | 1.7 |
| Bullets (li) | `15px` | 300 | normal | 1.6 |
| Overline | `13px` | 400 | `3px` | — |
| Section label | `11px` | 400 | `2px` | — |
| Quote (blockquote) | `clamp(20px, 3vw, 30px)` | 300 | normal | 1.5 |
| Cite / atribución | `14px` | 400 | normal | — |
| Tabs L3 | `13px` | 400 (500 activo) | normal | — |
| Nav arrows | `14px` | inherit | normal | — |
| Badge / labels | `9px` – `10px` | 400 | `1px` | — |

### Reglas tipográficas

- **El peso dominante es 300** (Light). Casi todo el texto visible es light. 400 se usa para labels y UI. 500 solo para tabs activos. 600-700 casi nunca.
- **Letter-spacing negativo** en headings (−0.5px a −1px). Esto es lo que da el carácter editorial.
- **Letter-spacing positivo** en overlines y labels (2px–3px) siempre en uppercase.
- **Máximo ancho de párrafo:** 680px. Nunca dejar texto corrido a ancho completo.
- **Máximo ancho de quote:** 700px.
- **Máximo ancho de contenedor de slide:** 900px.
- **Italic** solo en blockquotes y placeholders de imagen. Nunca como énfasis dentro de párrafos.
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

### Dots horizontales (sub-slides)
- Círculos de 7×7px, misma lógica que v-dots.
- Gap: 6px.
- Solo aparecen si la sección tiene más de 1 slide.
- Posición: centrada horizontal, `bottom: 40px`.

### Tabs L3 (tercer nivel)
- Pestañas de texto con borde inferior.
- Inactivo: texto `muted`, sin borde inferior.
- Activo: texto `ink`, borde inferior 2px `ink`, peso 500.
- Hover (no activo): texto `accent`.
- Línea base: 1px `border`.
- Padding: `8px 16px` (desktop), `6px 10px` (móvil).
- Font-size: 13px (desktop), 11px (móvil).
- Los tabs se posicionan dentro del contenido del slide, no como UI flotante.

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

### Transiciones de UI
- Dots: `all 0.25s`
- Tabs: `all 0.2s`
- Nav buttons: `color 0.2s`
- Barra de progreso: `width 0.3s ease`

### Reglas de animación
- **Nunca** usar bouncing, scaling, rotating ni efectos llamativos.
- **Nunca** usar transiciones de más de 0.4s.
- Todo movimiento es vertical (translateY) y sutil (12px máximo).
- La opacidad siempre va de 0 a 1, sin valores intermedios.

---

## 8. Layouts de imagen

Seis configuraciones posibles para imágenes dentro de slides. Todas se colocan entre el heading y el body/bullets.

### Tamaño de referencia: Imagen A = 900 × 675 px (4:3 al ancho del contenedor)

| Código | Ratio | Imágenes | Tamaño a 900px | Retina (2×) | CSS |
|--------|-------|----------|----------------|-------------|-----|
| `a` | 4:3 | 1 | 900 × 675 | 1800 × 1350 | `aspect-ratio: 4/3; width: 100%` |
| `b` | 16:9 | 1 | 900 × 506 | 1800 × 1012  | `aspect-ratio: 16/9; width: 100%` |
| `2x` | 4:3 × 2 | 2 lado a lado | 445 × 334 c/u | 890 × 668 | `flex: 1; aspect-ratio: 4/3; gap: 10px` |
| `4p` | 3:4 × 4 | 4 en fila | ~220 × 293 c/u | 440 × 586 | `flex: 1; aspect-ratio: 3/4; gap: 8px` |
| `wide` | 16:9 | 1 | 900 × 506 | 1800 × 1012 | `aspect-ratio: 16/9; width: 100%` |
| `full` | 16:9 | 1 (fondo) | 100vw × 100vh | 1920 × 1080+ | Fondo absoluto con overlay gradient |

### Placeholders
- Fondo: `border` (#e4e4e7)
- Border-radius: 4px
- Ícono central: SVG de imagen (landscape icon), opacity 0.15
- Label de ratio en esquina inferior derecha: 9px, `muted`, opacity 0.5

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
| `text` | Alineado izquierda | al menos uno de: `heading`, `body`, `bullets` | `imgLayout`, `images`, `l3` |
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
- Puede incluir `imgLayout` + `images` para colocar imágenes entre heading y body.
- Puede incluir `l3` para activar tabs de tercer nivel.

### Slide quote
- Blockquote en itálica, peso 300, centrado.
- Attribution precedida por dash largo: `— Autor`.

---

## 10. Tercer nivel de navegación (L3)

Se activa agregando `l3` a un slide de tipo `text`. Los tabs se renderizan como pestañas de texto con underline activo, dentro del área de contenido (no como UI flotante externa).

### Estructura de un item L3

```json
{
  "label": "Texto de la pestaña",
  "heading": "Título del contenido",
  "body": "Párrafo de texto.",
  "bullets": ["Opcionales"],
  "imgLayout": "2x",
  "images": ["archivo-1.jpg", "archivo-2.jpg"]
}
```

### Comportamiento de navegación
- ← → navega entre tabs L3 antes de pasar al siguiente slide.
- Al entrar a un slide con L3, siempre muestra el primer tab.
- Al retroceder desde el slide siguiente, muestra el último tab.
- Los tabs son clickeables.

### Jerarquía visual en slide con L3
1. Heading del slide padre (tamaño completo)
2. Body del slide padre (si existe)
3. Línea de tabs
4. Heading del tab activo (tamaño reducido: `clamp(18px, 2.2vw, 26px)`)
5. Imagen del tab (si existe)
6. Body del tab

---

## 11. Tres layouts de presentación

### Layout 1: Clásico (slides lineales)
- Sin `"layout"` en el config (o ausente).
- Navegación: solo ← →.
- Sin dots verticales, sin sección label.
- Barra de progreso simple.

### Layout 2: Secciones (2 niveles)
- `"layout": "sections"` en el config.
- Navegación: ↑↓ secciones + ←→ sub-slides.
- Dots verticales (secciones) + dots horizontales (sub-slides).
- Section label en esquina superior izquierda.

### Layout 3: Secciones + L3 Tabs (3 niveles)
- Igual que Layout 2, pero algunos slides incluyen `l3`.
- Navegación: ↑↓ secciones + ←→ sub-slides y tabs L3.
- Tabs inline dentro del contenido.

---

## 12. Estructura del proyecto

```
src/
├── content/
│   ├── clientes/<slug>.json
│   └── presentaciones/<slug>/config.json
├── layouts/Base.astro
├── pages/
│   ├── index.astro
│   ├── [client].astro
│   ├── [client]/[presentation].astro
│   └── presentaciones/[slug].astro
├── styles/global.css
public/
├── logo.png
├── favicon.svg
└── presentaciones/<slug>/  ← imágenes locales
```

### Stack técnico
- Astro 5 (framework estático)
- Tailwind CSS 4 (con CSS variables)
- Docker + Nginx (deploy via Coolify en Hetzner VPS)
- Auto Deploy en push a `main`

---

## 13. Convenciones de naming

- **Slugs de cliente:** con guiones → `educativo-antequera`, `serclin`
- **Slugs de presentación:** `<clienteslug>-<tema>` → `educativo-antequera-el-siguiente-capitulo`
- **Imágenes:** kebab-case descriptivo → `valor-nucleo.jpg`, `pilar-editorial-1.jpg`
- **Overline:** siempre `"ioon × Nombre del Cliente"`
- **Subheading en portada:** `"Descripción — Mes Año"`

---

## 14. Lo que nunca debe hacerse

- Usar colores fuera de la paleta de 6 valores.
- Usar sombras, gradientes decorativos o bordes redondeados mayores a 4px.
- Usar tipografías que no sean Space Grotesk.
- Usar pesos mayores a 500 en contenido visible.
- Usar animaciones que duren más de 0.4s o que involucren escala/rotación.
- Agregar decoraciones, separadores elaborados, íconos de stock o ilustraciones genéricas.
- Centrar párrafos de texto (solo quotes y titles se centran).
- Agregar bordes visibles a elementos de contenido (solo tabs y dots tienen bordes funcionales).
- Usar emojis, íconos de color, badges con fondo de color o chips estilizados.

---

## 15. Resumen en una frase

**ioon es blanco, negro, light weight, editorial, silencioso y preciso. Si un elemento no es necesario, no existe.**
