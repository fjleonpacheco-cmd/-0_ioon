# ioon.mx — Sistema de Presentaciones (v20260415)

## Quién es ioon

ioon es un estudio de innovación en Oaxaca, México, dirigido por Francisco León (Director de Arte y Fotógrafo).

- Sitio: https://ioon.mx
- Contacto: hola@ioon.mx | +52 951 508 1629
- Repo: https://github.com/fjleonpacheco-cmd/-0_ioon
- Repo local (Mac): `~/Documents/0_ioon/-0_ioon`
- Deploy: Docker + Nginx via Coolify en Hetzner VPS. Push a `main` = redeploy automático (a veces necesita Redeploy manual en Coolify).

## Stack técnico

- **Astro 5** — framework estático
- **Tailwind CSS 4** — con CSS variables custom y valores arbitrarios (corchetes)
- **Space Grotesk** — tipografía variable font de Florian Karsten
- **Docker + Nginx** — deploy via Coolify en Hetzner VPS

## Tipografía — decisiones vigentes

- **Fuente única:** Space Grotesk variable font (Florian Karsten, no Google Fonts)
- **Tailwind con valores exactos:** se usan corchetes `text-[clamp(22px,3vw,34px)]` en vez de clases genéricas `text-2xl`
- **Override global:** `*, *::before, *::after { font-family: var(--font-sans) !important; }` para evitar que Tailwind sobreescriba la fuente
- **Referencia completa:** ver `ioon_informe-tipografico_v20260415.md`

## Estética

- Minimalista extremo, mucho espacio en blanco
- Colores: `#0a0a0a` (ink), `#fafafa` (paper), `#71717a` (muted), `#18181b` (accent), `#e4e4e7` (border), `#d4d4d8` (highlight)
- Tipografía editorial, peso 300 (light) para títulos, 400 para labels/UI, 500 para tabs activos
- Sin elementos genéricos — diseño de autor

---

## Estructura del proyecto

```
~/Documents/0_ioon/-0_ioon/
├── src/
│   ├── content/
│   │   ├── clientes/                    ← JSON por cliente
│   │   │   ├── educativoantequera.json
│   │   │   └── serclin.json
│   │   └── presentaciones/              ← Una carpeta por deck
│   │       ├── ejemplo/config.json
│   │       ├── serclin-3_matriz-de-identidad-de-marca/config.json
│   │       └── educativoantequera-1_el-siguiente-capitulo/config.json
│   ├── layouts/Base.astro               ← NO TOCAR
│   ├── pages/
│   │   ├── index.astro                  ← Landing con partículas Canvas
│   │   ├── 404.astro
│   │   ├── [client].astro               ← Páginas de cliente dinámicas
│   │   ├── presentaciones/
│   │   │   └── [slug].astro             ← Viewer (soporta los 3 layouts)
│   │   └── <clienteslug>/               ← Redirects bonitos por cliente
│   │       └── <num>_<tema>.astro
│   └── styles/global.css                ← Variables, @font-face, override
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

Navegación: ↑↓ secciones, ←→ sub-slides, dots verticales (con rollover de nombre y relleno negro en hover), dots horizontales.

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
  "heading": "Título grande en texto plano",
  "headingHtml": "Título con <b>HTML</b>",
  "subheading": "Subtítulo texto plano",
  "subheadingHtml": "Subtítulo con <b>HTML</b>"
}
```

Centrado. Si existe `headingHtml`, tiene prioridad sobre `heading`.

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
  "imgLayout": "2x",
  "images": ["archivo-a.jpg", "archivo-b.jpg"],
  "l3": [ ... ]
}
```

Alineado a la izquierda. Si existe la versión `Html` de un campo, tiene prioridad sobre la versión plana.

### concept

```json
{
  "type": "concept",
  "heading": "Frase grande en texto plano",
  "headingHtml": "<i>\"El <b>cuidado</b> absoluto es la forma más alta de la <b>hospitalidad</b>.\"</i>",
  "subheading": "Etiqueta o subtítulo",
  "body": "Descripción en texto plano",
  "bodyHtml": "Descripción con <b>HTML</b>"
}
```

Alineado a la izquierda. Heading al tamaño del título principal (`clamp(32px,5vw,56px)`). Subheading al tamaño de heading de text (`clamp(22px,3vw,34px)`), en color muted. Body a tamaño normal (16px).

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

## Escala tipográfica implementada en el viewer

Todos los valores usan Tailwind con corchetes (valores arbitrarios), no clases genéricas:

| Elemento | Clases Tailwind | Resultado |
|---|---|---|
| Heading title/concept | `text-[clamp(32px,5vw,56px)] font-light leading-[1.15] tracking-[-1px]` | 32-56px, w300 |
| Heading slide | `text-[clamp(22px,3vw,34px)] font-light tracking-[-0.5px]` | 22-34px, w300 |
| Heading L3 | `text-[clamp(18px,2.2vw,26px)] font-light tracking-[-0.5px]` | 18-26px, w300 |
| Body | `text-[16px] font-light leading-[1.7] text-[--color-accent]` | 16px, w300, lh 1.7 |
| Bullets | `text-[15px] font-light leading-[1.6] text-[--color-accent]` | 15px, w300 |
| Overline | `text-[13px] font-normal tracking-[3px] uppercase text-[--color-muted]` | 13px, w400 |
| Section label | `text-[11px] font-normal tracking-[2px] uppercase text-[--color-muted]` | 11px, w400 |
| Quote | `text-[clamp(20px,3vw,30px)] font-light leading-[1.5] italic` | 20-30px, w300 |
| Attribution | `text-[14px] font-normal text-[--color-muted]` | 14px, w400 |
| Tabs L3 | `text-[13px] font-normal` / `font-medium` (activo) | 13px, w400/500 |
| Max-width cuerpo | `max-w-[680px]` | 680px |
| Max-width slide | `max-w-[900px]` | 900px |

---

## Layouts de imagen (imgLayout)

Se aplican en slides tipo `text` y dentro de items `l3`.

| imgLayout | Comportamiento | Imágenes |
|-----------|---------------|----------|
| `a` | Una imagen 4:3 ancho completo | 1 |
| `2x` | Dos imágenes 4:3 lado a lado | 2 |
| `1of2` | Una imagen 4:3 al tamaño de media (50%) | 1 |
| `4p` | Cuatro imágenes 3:4 en fila | 4 |
| `wide` | Una imagen 16:9 ancho completo | 1 |

### Fuentes de imágenes

- **Locales**: archivo en `public/presentaciones/<slug>/`, referencia solo nombre: `"foto.jpg"`
- **URLs externas**: `"https://images.unsplash.com/photo-xxx?w=1200&q=80"`

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
      "headingHtml": "Subtema con <b>HTML</b>",
      "body": "Contenido plano.",
      "bodyHtml": "Contenido con <b>HTML</b>.",
      "bullets": ["punto 1", "punto 2"],
      "imgLayout": "2x",
      "images": ["img1.jpg", "img2.jpg"]
    }
  ]
}
```

---

## Navegación del viewer (layout sections)

### UI elements
- **Navbar fija arriba:** logo ioon, título de presentación, cliente, contador (ej: "5/14")
- **Section label:** fijo debajo de la navbar (`top: 80px, left: 24px/80px`), muestra nombre de sección actual en uppercase
- **V-dots izquierda:** 8×8px, gap 9px, border 1px muted, relleno negro en activo y hover, rollover muestra nombre de sección
- **Flechas ↑↓ abajo centro:** SVG chevrons para navegar secciones
- **H-dots abajo:** barras horizontales para sub-slides (si hay más de 1)

### Desktop
- Dots verticales a la izquierda (left: 20px) con label en hover
- Flechas ↑↓ y ←→ abajo al centro
- Teclado: ↑↓ secciones, ←→ sub-slides/tabs, Espacio = siguiente

### Móvil
- Dots verticales a la izquierda (left: 8px) sin labels
- Touch swipe: vertical = secciones, horizontal = sub-slides/tabs

---

## Páginas de cliente

**Config** (`src/content/clientes/<slug>.json`):

```json
{
  "name": "Serclin",
  "slug": "serclin",
  "headline": "Desarrollo de Marca para Serclin",
  "tagline": "Matriz de Identidad de Marca.",
  "presentations": [
    { "slug": "serclin-3_matriz-de-identidad-de-marca", "title": "Matriz de Identidad de Marca", "date": "2026-04-14" }
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

## Flujo para crear una nueva presentación

1. Crear carpeta `src/content/presentaciones/<clienteslug>-<num>_<tema>/`
2. Crear `config.json` con la estructura del layout elegido
3. Si hay imágenes locales: `public/presentaciones/<slug>/`
4. Crear redirect en `src/pages/<clienteslug>/<num>_<tema>.astro`
5. Crear o actualizar `src/content/clientes/<clienteslug>.json`
6. Push:

```bash
cd ~/Documents/0_ioon/-0_ioon
git add .
git commit -m "nueva presentación: descripción"
git push origin main
```

7. Si Coolify no auto-deploya, hacer Redeploy manual.

---

## Convenciones de naming

| Elemento | Formato | Ejemplo |
|----------|---------|---------|
| Slug cliente | minúsculas sin separador | `educativoantequera`, `serclin` |
| Slug presentación | `<cliente>-<num>_<tema>` | `serclin-3_matriz-de-identidad-de-marca` |
| Redirect | `src/pages/<cliente>/<num>_<tema>.astro` | `src/pages/serclin/3_matriz-de-identidad-de-marca.astro` |
| URL bonita | `ioon.mx/<cliente>/<num>_<tema>` | `ioon.mx/serclin/3_matriz-de-identidad-de-marca` |
| URL directa | `ioon.mx/presentaciones/<slug>/` | `ioon.mx/presentaciones/serclin-3_matriz-de-identidad-de-marca/` |

---

## Contraseña

```json
"password": "clave123"
```

Dejar `""` para acceso libre. Validación client-side.

---

## Workflow de archivos

- **Repo:** `~/Documents/0_ioon/-0_ioon` — ruta permanente
- **Downloads:** carpeta temporal. Borrar después de copiar al repo.
- **No usar scripts Python** para modificar archivos .astro — siempre generar el archivo completo
- **Para copiar archivos descargados:**
```bash
cd ~/Documents/0_ioon/-0_ioon
cp ~/Downloads/NOMBRE_ARCHIVO 'src/pages/presentaciones/[slug].astro'
git add .
git commit -m "descripción"
git push origin main
```
