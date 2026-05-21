# ioon.mx — Sistema de Presentaciones (v 20260413)

## Quién es ioon

ioon es un estudio de innovación en Oaxaca, México, dirigido por Francisco León (Director de Arte y Fotógrafo).

- Sitio: https://ioon.mx
- Contacto: hola@ioon.mx | +52 951 508 1629
- Repo: https://github.com/fjleonpacheco-cmd/-0_ioon
- Repo local (Mac): `~/Documentos/-0_ioon`

## Stack técnico

- **Astro 5** — framework estático
- **Tailwind CSS 4** — con CSS variables custom
- **Space Grotesk** — tipografía (CDN Google Fonts o Florian Karsten)
- **Docker + Nginx** — deploy via Coolify en Hetzner VPS
- **Auto Deploy** activado — push a `main` = redeploy automático

## Estética

- Minimalista extremo, mucho espacio en blanco
- Colores: `#0a0a0a` (ink), `#fafafa` (paper), `#71717a` (muted), `#e4e4e7` (border)
- Tipografía editorial, peso 300 (light) para títulos, 400 para cuerpo
- Sin elementos genéricos — diseño de autor

---

## Estructura del proyecto

```
~/Documentos/-0_ioon/
├── src/
│   ├── content/
│   │   ├── clientes/                    ← JSON por cliente
│   │   │   ├── educativoantequera.json
│   │   │   └── serclin.json
│   │   └── presentaciones/              ← Una carpeta por deck
│   │       ├── ejemplo/config.json
│   │       ├── serclin-1_estudio-de-mercado/config.json
│   │       └── educativoantequera-1_el-siguiente-capitulo/config.json
│   ├── layouts/Base.astro
│   ├── pages/
│   │   ├── index.astro                  ← Landing con partículas Canvas
│   │   ├── 404.astro
│   │   ├── [client].astro               ← Páginas de cliente dinámicas
│   │   ├── presentaciones/
│   │   │   └── [slug].astro             ← Viewer (soporta los 3 layouts)
│   │   └── <clienteslug>/               ← Redirects bonitos por cliente
│   │       └── <num>_<tema>.astro
│   └── styles/global.css
├── public/
│   ├── logo.png
│   ├── favicon.svg
│   └── presentaciones/                  ← Imágenes locales de cada deck
│       └── <slug>/
```

---

## Tres layouts de presentación

### 1. Layout Clásico (slides lineales)

Navegación: ← → flechas, teclado, touch, barra de progreso.

```json
{
  "title": "Nombre",
  "client": "Cliente",
  "date": "2026-04-06",
  "password": "",
  "slides": [ ... ]
}
```

### 2. Layout Secciones (vertical + horizontal)

Navegación: ↑↓ secciones, ←→ sub-slides, dots verticales (con rollover de nombre), dots horizontales (con rollover de título).

```json
{
  "title": "Nombre",
  "client": "Cliente",
  "date": "2026-04-06",
  "password": "",
  "layout": "sections",
  "sections": [
    {
      "title": "Nombre de sección",
      "slides": [ ... ]
    }
  ]
}
```

### 3. Layout Secciones + L3 Tabs (tres niveles)

Igual que secciones pero con tabs inline dentro de un slide usando el campo `l3`.

---

## Tipos de slide

### title

```json
{
  "type": "title",
  "overline": "ioon × Cliente",
  "heading": "Título grande",
  "subheading": "Subtítulo texto plano",
  "subheadingHtml": "Subtítulo con <b>HTML</b>"
}
```

Centrado. Overline (opcional), heading (requerido), subheading (opcional).

### text

```json
{
  "type": "text",
  "heading": "Título plano",
  "headingHtml": "Título con <b>HTML</b>",
  "body": "Párrafo plano",
  "bodyHtml": "Párrafo con <b>HTML</b>",
  "bullets": ["Punto 1", "Punto 2"],
  "bulletsHtml": ["Punto con <b>negrita</b>"],
  "img": "2x",
  "names": ["archivo-a.jpg", "archivo-b.jpg"],
  "gal": [
    ["archivo-a.jpg", "archivo-a-g1.jpg"],
    null
  ],
  "l3": [ ... ]
}
```

Alineado a la izquierda. Si existe la versión `Html` de un campo, tiene prioridad sobre la versión plana.

### concept

```json
{
  "type": "concept",
  "headingHtml": "<i>Frase grande en itálicas.</i>",
  "subheading": "Etiqueta o subtítulo",
  "body": "Descripción",
  "bodyHtml": "Descripción con <b>HTML</b>"
}
```

Alineado a la izquierda. Heading al tamaño del título principal de la presentación. Subheading al tamaño de heading de text, en color muted. Body a tamaño normal. Orden: heading → subheading → body.

### image

```json
{
  "type": "image",
  "src": "https://url-o-nombre-archivo.jpg",
  "alt": "Descripción",
  "caption": "Pie de foto"
}
```

### split

```json
{
  "type": "split",
  "src": "https://url-imagen.jpg",
  "alt": "Descripción",
  "heading": "Título",
  "body": "Texto plano",
  "bodyHtml": "Texto con <b>HTML</b>"
}
```

Imagen izquierda (50%) + texto derecha (50%).

### quote

```json
{
  "type": "quote",
  "text": "Cita en texto plano.",
  "textHtml": "Cita con <b>HTML</b>.",
  "attribution": "Autor"
}
```

Centrado, itálica, peso 300.

---

## Layouts de imagen (img)

Se aplican en slides tipo `text` y dentro de items `l3`.

| img | Comportamiento | Imágenes |
|-----|---------------|----------|
| `a` | Una imagen 4:3 ancho completo | 1 |
| `2x` | Dos imágenes 4:3 lado a lado | 2 |
| `1of2` | Una imagen 4:3 al tamaño de media (50% del ancho) | 1 |
| `4p` | Cuatro imágenes 3:4 en fila | 4 |
| `wide` | Una imagen 16:9 ancho completo | 1 |

Cada imagen se identifica en el array `names` y opcionalmente tiene galería en `gal`.

### Fuentes de imágenes

- **Locales**: archivo en `public/presentaciones/<slug>/`, referencia solo nombre: `"foto.jpg"`
- **URLs externas**: `"https://images.unsplash.com/photo-xxx?w=1200&q=80"`
- **Capturas en tiempo real**: `"https://s.wordpress.com/mshots/v1/https://sitio.com?w=800"`

---

## Sistema de galería

Las imágenes pueden ser clicables para abrir un visor a pantalla completa (fondo gris claro #f0f0f0).

### Datos

El campo `gal` es un array paralelo a `names`. Cada posición es un array de filenames (el primero es la portada visible en el slide, los demás son verticales solo visibles en galería):

```json
"names": ["portada-a.jpg", "portada-b.jpg"],
"gal": [
  ["portada-a.jpg", "a-g1.jpg", "a-g2.jpg"],
  null
]
```

- Posición 0: clicable, 3 imágenes verticales
- Posición 1: `null` = no clicable

### Navegación en galería

| Acción | Resultado |
|--------|-----------|
| ← → | Navega entre portadas contiguas del slide |
| ↑ ↓ | Navega en profundidad vertical (imágenes extras del subtema) |
| Esc | Cierra la galería |
| Dots horizontales | Click directo a portada específica |
| Dots verticales | Click directo a imagen vertical específica |

### Convención de nombres

- Portada: `SS-SL-TT-descripcion.jpg`
- Verticales: `SS-SL-TT-descripcion-g1.jpg`, `-g2.jpg`, `-g3.jpg`...

---

## L3 Tabs (tercer nivel de navegación)

Se activa agregando `l3` a un slide tipo `text`:

```json
{
  "type": "text",
  "heading": "Título del grupo",
  "body": "Intro que se muestra siempre arriba.",
  "l3": [
    {
      "label": "Tab 1",
      "heading": "Subtema 1",
      "body": "Contenido plano.",
      "bodyHtml": "Contenido con <b>HTML</b>.",
      "img": "2x",
      "names": ["img1.jpg", "img2.jpg"],
      "gal": [["img1.jpg", "img1-g1.jpg"], null]
    }
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

---

## Páginas de cliente

**Config** (`src/content/clientes/<slug>.json`):

```json
{
  "name": "Educativo Antequera",
  "slug": "educativoantequera",
  "headline": "Desarrollo de Marca para Educativo Antequera",
  "tagline": "El Siguiente Capítulo.",
  "presentations": [
    { "slug": "educativoantequera-1_el-siguiente-capitulo", "title": "El Siguiente Capítulo", "date": "2026-04-12" }
  ]
}
```

---

## URLs bonitas (redirects)

```astro
---
import Base from '../../layouts/Base.astro';
---
<Base title="Título — Cliente — ioon">
  <meta http-equiv="refresh" content="0;url=/presentaciones/<slug>/" />
  <div class="h-screen flex items-center justify-center">
    <p class="text-sm text-[--color-muted]">Redirigiendo...</p>
  </div>
</Base>
```

---

## Navegación del viewer (layout sections)

### Desktop
- **Dots verticales a la izquierda** — clickeables, rollover muestra nombre de sección
- **Dots horizontales abajo** — clickeables, rollover muestra título del sub-slide
- **Flechas ↑↓←→** en la parte inferior central
- **Tabs L3** — pestañas inline con underline

### Móvil
- **Dots verticales a la izquierda** — sin labels
- **Dots horizontales abajo** — sin labels
- **Touch swipe**: vertical = secciones, horizontal = sub-slides/tabs

### Teclado
- ↑ = sección anterior
- ↓ = sección siguiente
- ← = sub-slide/tab anterior
- → o Espacio = sub-slide/tab siguiente
- Esc = cerrar galería (si está abierta)

### Galería abierta
- Teclado y flechas redirigen a navegación de galería (←→ horizontal, ↑↓ vertical)
- Esc cierra la galería y regresa al slide

---

## Flujo de trabajo con mapas estructurales

### Formato del mapa `.txt`

```
X  NOMBRE DE SECCIÓN
   X.Y  [tipo] — imgLayout: layout
        heading: Texto
        body: Texto
        imágenes:
          → nombre.jpg
          → nombre.jpg ★galería
              ↳ nombre-g1.jpg
              ↳ nombre-g2.jpg
   X.Y  [tipo + L3] — heading fijo arriba
        heading: Texto
        X.Y.Z [tab: Label] — imgLayout: layout
              heading: Texto
              imágenes:
                → nombre.jpg
```

### Sintaxis de galería en el mapa
```
→ archivo.jpg                  imagen normal (no clicable)
→ archivo.jpg ★galería         portada clicable
    ↳ archivo-g1.jpg           vertical 1 (solo en galería)
    ↳ archivo-g2.jpg           vertical 2
```

### Flujo
1. Generar mapa estructural `.txt`
2. Iterar (cambiar layouts, copys, imágenes, galerías)
3. Generar HTML de preview local (`propuesta-cN.html`)
4. Cuando esté aprobado, generar `config.json` para deploy

---

## Flujo para crear una nueva presentación

1. Crear carpeta `src/content/presentaciones/<clienteslug>-<num>_<tema>/`
2. Crear `config.json` con la estructura del layout elegido
3. Si hay imágenes locales: `public/presentaciones/<slug>/`
4. Crear redirect en `src/pages/<clienteslug>/<num>_<tema>.astro`
5. Actualizar `src/content/clientes/<clienteslug>.json`
6. Push:

```bash
cd ~/Documentos/-0_ioon
git add .
git commit -m "nueva presentación: descripción"
git push origin main
```

---

## Convenciones de naming

| Elemento | Formato | Ejemplo |
|----------|---------|---------|
| Slug cliente | minúsculas sin separador | `educativoantequera`, `serclin` |
| Slug presentación | `<cliente>-<num>_<tema>` | `educativoantequera-1_el-siguiente-capitulo` |
| Redirect | `src/pages/<cliente>/<num>_<tema>.astro` | `src/pages/educativoantequera/1_el-siguiente-capitulo.astro` |
| Imágenes de slide | `SS-SL-TT-descripcion-letra.jpg` | `04-01-01-eficiente.jpg` |
| Imágenes de galería | `SS-SL-TT-descripcion-gN.jpg` | `04-01-01-eficiente-g1.jpg` |
| URL bonita | `ioon.mx/<cliente>/<num>_<tema>` | `ioon.mx/educativoantequera/1_el-siguiente-capitulo` |
| URL directa | `ioon.mx/presentaciones/<slug>/` | `ioon.mx/presentaciones/educativoantequera-1_el-siguiente-capitulo/` |

---

## Contraseña

```json
"password": "clave123"
```

Dejar `""` para acceso libre. Validación client-side.
