# ioon.mx — Sistema de Presentaciones (v 20260412 - 1040)

## Quién es ioon

ioon es un estudio de innovación en Oaxaca, México, dirigido por Francisco León (Director de Arte y Fotógrafo).

- Sitio: https://ioon.mx
- Contacto: hola@ioon.mx | +52 951 508 1629
- Repo: https://github.com/fjleonpacheco-cmd/-0_ioon
- Repo local (Mac): `~/Downloads/2/-0_ioon`

## Stack técnico

- **Astro 5** — framework estático
- **Tailwind CSS 4** — con CSS variables custom
- **Space Grotesk** — tipografía (CDN Florian Karsten)
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
src/
├── content/
│   ├── clientes/                    ← JSON por cliente
│   │   ├── educativoantequera.json
│   │   └── serclin.json
│   └── presentaciones/              ← Una carpeta por deck
│       ├── ejemplo/config.json              (layout clásico)
│       ├── hotel-terraza/config.json        (layout sections)
│       ├── serclin-1_estudio-de-mercado/    (sections + L3 + HTML)
│       ├── serclin-2_ventaja-competitiva/   (sections + L3)
│       └── serclin-3_audiencia/             (sections + L3 + split)
├── layouts/Base.astro
├── pages/
│   ├── index.astro                  ← Landing con partículas Canvas
│   ├── 404.astro
│   ├── [client].astro               ← Páginas de cliente dinámicas
│   ├── presentaciones/
│   │   └── [slug].astro             ← Viewer (soporta los 3 layouts)
│   └── serclin/                     ← Redirects bonitos por cliente
│       ├── 1_estudio-de-mercado.astro
│       ├── 2_ventaja-competitiva.astro
│       └── 3_audiencia.astro
├── styles/global.css
public/
├── logo.png
├── favicon.svg
└── presentaciones/                  ← Imágenes locales de cada deck
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

Navegación: ↑↓ secciones, ←→ sub-slides, dots verticales, dots horizontales.

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

Navegación:
- ↑↓ = secciones (nivel 1)
- ←→ = sub-slides (nivel 2), y también navega entre tabs L3 cuando existen
- Click en tab = cambio directo de contenido L3

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

Campos: `overline` (opcional), `heading` (requerido), `subheading` O `subheadingHtml` (opcional).

### text

```json
{
  "type": "text",
  "heading": "Título plano",
  "headingHtml": "Título con <b>HTML</b>",
  "body": "Párrafo plano",
  "bodyHtml": "Párrafo con <b>HTML</b> y <a href='url' target='_blank'>enlaces</a>",
  "bullets": ["Punto 1", "Punto 2"],
  "bulletsHtml": ["Punto con <b>negrita</b>", "Otro punto"],
  "imgLayout": "2x",
  "images": ["url1.jpg", "url2.jpg"],
  "l3": [ ... ]
}
```

**Reglas de campos HTML vs plano:**
- Si existe `headingHtml`, se usa en vez de `heading`
- Si existe `bodyHtml`, se usa en vez de `body`
- Si existe `bulletsHtml`, se usa en vez de `bullets`
- HTML soportado: `<b>`, `<i>`, `<a href='...' target='_blank'>`, `<br/>`, `<span style='...'>`

### image

```json
{
  "type": "image",
  "src": "https://url-o-nombre-archivo.jpg",
  "alt": "Descripción",
  "caption": "Pie de foto"
}
```

Renderiza con `object-contain` — la imagen nunca se recorta, se ajusta al ancho disponible.

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

Imagen izquierda (50%) + texto derecha (50%). Soporta `bodyHtml`.

### quote

```json
{
  "type": "quote",
  "text": "Cita en texto plano.",
  "textHtml": "Cita con <b>HTML</b>.",
  "attribution": "Autor"
}
```

Si existe `textHtml`, se usa en vez de `text`.

---

## Layouts de imagen (imgLayout)

Se aplican en slides tipo `text` y dentro de items `l3`.

| imgLayout | Comportamiento | Imágenes |
|-----------|---------------|----------|
| `a` | Una imagen 4:3 ancho completo | 1 |
| `2x` | Dos imágenes 4:3 lado a lado | 2 |
| `1of2` | Una imagen 4:3 al tamaño de media (como una de 2x) | 1 |
| `4p` | Cuatro imágenes 3:4 en fila | 4 |
| `wide` | Una imagen 16:9 ancho completo | 1 |

```json
{
  "type": "text",
  "heading": "Título",
  "body": "Texto",
  "imgLayout": "2x",
  "images": ["https://url1.jpg", "https://url2.jpg"]
}
```

### Fuentes de imágenes

- **URLs externas**: `"https://images.unsplash.com/photo-xxx?w=1200&q=80"`
- **Locales**: archivo en `public/presentaciones/<slug>/`, referencia solo nombre: `"foto.jpg"`
- **Capturas en tiempo real**: `"https://s.wordpress.com/mshots/v1/https://sitio.com?w=800"`
- **CDN externo**: cualquier URL directa de imagen

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
      "bullets": ["A", "B"],
      "imgLayout": "2x",
      "images": ["img1.jpg", "img2.jpg"]
    },
    {
      "label": "Tab 2",
      "heading": "Subtema 2",
      "bodyHtml": "Más contenido con <a href='url' target='_blank' class='font-bold hover:underline'>enlaces</a>."
    }
  ]
}
```

Los tabs se renderizan como pestañas con underline activo. ←→ navega entre tabs.

### Campos de cada item L3

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `label` | Sí | Texto de la pestaña |
| `heading` | Sí | Título del contenido |
| `body` | No | Párrafo plano |
| `bodyHtml` | No | Párrafo con HTML (prioridad sobre body) |
| `bullets` | No | Array de strings |
| `imgLayout` | No | Layout de imagen: `a`, `2x`, `1of2`, `4p`, `wide` |
| `images` | No | Array de URLs o nombres de archivo |

---

## Páginas de cliente

Cada cliente tiene una página en `ioon.mx/<slug-cliente>` con headline, tagline y lista de presentaciones.

**Config** (`src/content/clientes/<slug>.json`):

```json
{
  "name": "SERCLIN",
  "slug": "serclin",
  "headline": "Desarrollo de Marca para SERCLIN",
  "tagline": "Dejando atrás el servicio, abrazando el prestigio.",
  "presentations": [
    { "slug": "serclin-1_estudio-de-mercado", "title": "Estudio de Mercado", "date": "2026-04-06" },
    { "slug": "serclin-2_ventaja-competitiva", "title": "Ventaja Competitiva", "date": "2026-04-06" },
    { "slug": "serclin-3_audiencia", "title": "Audiencia", "date": "2026-04-06" }
  ]
}
```

**Auto-detección**: presentaciones cuyo slug empiece con `<clienteslug>-` aparecen automáticamente.

---

## URLs bonitas (redirects)

Para que una presentación sea accesible desde `ioon.mx/serclin/1_estudio-de-mercado`, se crea un archivo redirect:

**`src/pages/serclin/1_estudio-de-mercado.astro`:**

```astro
---
import Base from '../../layouts/Base.astro';
---
<Base title="Estudio de Mercado — SERCLIN — ioon">
  <meta http-equiv="refresh" content="0;url=/presentaciones/serclin-1_estudio-de-mercado/" />
  <div class="h-screen flex items-center justify-center">
    <p class="text-sm text-[--color-muted]">Redirigiendo...</p>
  </div>
</Base>
```

**Convención de naming:**
- Slug de presentación: `serclin-1_estudio-de-mercado`
- Carpeta redirect: `src/pages/serclin/1_estudio-de-mercado.astro`
- URL bonita: `ioon.mx/serclin/1_estudio-de-mercado`
- URL directa: `ioon.mx/presentaciones/serclin-1_estudio-de-mercado/`

---

## Navegación del viewer (layout sections)

### Desktop
- **Dots verticales a la izquierda** — clickeables, hover muestra nombre de sección
- **Flechas ↑↓ + dots horizontales** en la parte inferior central
- **Tabs L3** — pestañas inline con underline

### Móvil
- **Dots verticales a la derecha** — más pequeños, sin labels
- **Flechas ↑↓ + dots horizontales** en la parte inferior central
- **Touch swipe**: vertical = secciones, horizontal = sub-slides/tabs

### Teclado
- ↑ = sección anterior
- ↓ = sección siguiente
- ← = sub-slide/tab anterior
- → o Espacio = sub-slide/tab siguiente

---

## Ejemplo completo: SERCLIN Estudio de Mercado

```json
{
  "title": "Estudio de Mercado",
  "client": "SERCLIN",
  "date": "2026-04-06",
  "password": "",
  "layout": "sections",
  "sections": [
    {
      "title": "Portada",
      "slides": [
        {
          "type": "title",
          "overline": "ioon × SERCLIN",
          "heading": "Estudio de Mercado",
          "subheadingHtml": "El Mercado del <b><i>Facility Management</i></b> en México"
        }
      ]
    },
    {
      "title": "Introducción",
      "slides": [
        {
          "type": "quote",
          "text": "De Cuadrillas de Higiene a la Estética de la Profesionalización.",
          "attribution": "Dirección estratégica ioon"
        },
        {
          "type": "text",
          "heading": "Resultado",
          "bodyHtml": "La estrategia es no competir por limpiar mejor, <b>Serclin</b> debe entrar al mercado de <b>proteger el prestigio</b>."
        }
      ]
    },
    {
      "title": "El mercado tradicional",
      "slides": [
        {
          "type": "text",
          "heading": "¿Cómo funciona el mercado tradicional?",
          "l3": [
            {
              "label": "Gasto",
              "heading": "Gasto fijo",
              "bodyHtml": "La limpieza se vende como un gasto a reducir, no como una <b>herramienta de retención de clientes</b>."
            },
            {
              "label": "La trampa",
              "heading": "En realidad el riesgo es muy grande",
              "bodyHtml": "Cuando algo falla, <b>el daño al prestigio es catastrófico</b>."
            }
          ]
        }
      ]
    },
    {
      "title": "Competidores",
      "slides": [
        {
          "type": "text",
          "heading": "¿Quién domina los espacios premium?",
          "body": "Tres categorías. Ninguno combina rigor técnico con calidez humana.",
          "l3": [
            {
              "label": "Gigantes",
              "heading": "Gigantes abstractos",
              "bodyHtml": "<a href='https://mx.sodexo.com' target='_blank' class='font-bold hover:underline'>Sodexo</a>, <a href='https://www.issworld.com/es-mx' target='_blank' class='font-bold hover:underline'>ISS Group</a> — Corporativos, lejanos y rígidos.",
              "imgLayout": "2x",
              "images": [
                "https://s.wordpress.com/mshots/v1/https://mx.sodexo.com?w=800",
                "https://s.wordpress.com/mshots/v1/https://www.issworld.com/es-mx?w=800"
              ]
            },
            {
              "label": "Institucionales",
              "heading": "Institucionales",
              "bodyHtml": "<a href='https://www.eulen.com/mx/' target='_blank' class='font-bold hover:underline'>Grupo EULEN</a> — Protocolarios pero fríos.",
              "imgLayout": "1of2",
              "images": [
                "https://s.wordpress.com/mshots/v1/https://www.eulen.com/mx/?w=800"
              ]
            }
          ]
        }
      ]
    },
    {
      "title": "El gran error",
      "slides": [
        {
          "type": "quote",
          "textHtml": "El mercado premium no compra limpieza. Compra <b>Continuidad Operativa</b>.",
          "attribution": "Observación estratégica"
        },
        {
          "type": "text",
          "headingHtml": "Vender limpieza es el <b>error</b>",
          "bulletsHtml": [
            "Competir vendiendo higiene es guerra de precios",
            "Las marcas necesitan <b>mantener la magia sin romper el encanto</b>"
          ]
        }
      ]
    }
  ]
}
```

---

## Contraseña

```json
"password": "clave123"
```

Dejar `""` para acceso libre. Validación client-side.

---

## Flujo para crear una nueva presentación

1. Crear carpeta `src/content/presentaciones/<clienteslug>-<numero>_<tema>/`
2. Crear `config.json` con la estructura del layout elegido
3. Si hay imágenes locales: `public/presentaciones/<slug>/`
4. Crear redirect en `src/pages/<clienteslug>/<numero>_<tema>.astro`
5. Actualizar `src/content/clientes/<clienteslug>.json` con la nueva presentación
6. Push:

```bash
cd ~/Downloads/2/-0_ioon
git add .
git commit -m "nueva presentación: descripción"
git push origin main
```

---

## Convenciones de naming

| Elemento | Formato | Ejemplo |
|----------|---------|---------|
| Slug cliente | con guiones, minúsculas | `serclin`, `educativo-antequera` |
| Slug presentación | `<cliente>-<num>_<tema>` | `serclin-1_estudio-de-mercado` |
| Redirect | `src/pages/<cliente>/<num>_<tema>.astro` | `src/pages/serclin/1_estudio-de-mercado.astro` |
| Imágenes | kebab-case en `public/presentaciones/<slug>/` | `paleta-cromática.jpg` |
| URL bonita | `ioon.mx/<cliente>/<num>_<tema>` | `ioon.mx/serclin/1_estudio-de-mercado` |
| URL directa | `ioon.mx/presentaciones/<slug>/` | `ioon.mx/presentaciones/serclin-1_estudio-de-mercado/` |
