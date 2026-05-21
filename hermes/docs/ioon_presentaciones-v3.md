# ioon.mx — Sistema de Presentaciones v3

## Resumen

El sistema soporta tres tipos de presentación y cinco layouts de imagen, configurables desde un solo `config.json`.

---

## Tres tipos de presentación

### 1. Layout Clásico (slides lineales)

Navegación: ← → flechas, teclado, touch swipe, barra de progreso.

```json
{
  "title": "Nombre",
  "client": "Cliente",
  "date": "2026-04-06",
  "password": "",
  "slides": [
    { "type": "title", "overline": "ioon × Cliente", "heading": "Título", "subheading": "Sub" },
    { "type": "text", "heading": "Tema", "body": "Contenido." },
    { "type": "text", "heading": "Lista", "bullets": ["A", "B", "C"] },
    { "type": "image", "src": "foto.jpg", "alt": "Desc", "caption": "Pie" },
    { "type": "split", "src": "foto.jpg", "alt": "Desc", "heading": "Título", "body": "Texto" },
    { "type": "quote", "text": "Cita aquí.", "attribution": "Autor" }
  ]
}
```

**URL:** `ioon.mx/presentaciones/<slug>/`

---

### 2. Layout Secciones (vertical + horizontal)

Navegación:
- ↑↓ = secciones (temas principales)
- ←→ = sub-slides dentro de cada sección
- Dots verticales (izquierda) + dots horizontales (centro inferior)
- Touch swipe: vertical = secciones, horizontal = sub-slides

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
      "slides": [
        { "type": "title", "overline": "ioon × Cliente", "heading": "Título", "subheading": "Sub" },
        { "type": "text", "heading": "Subtema", "body": "Contenido." }
      ]
    },
    {
      "title": "Segunda sección",
      "slides": [
        { "type": "text", "heading": "Tema", "bullets": ["A", "B"] }
      ]
    }
  ]
}
```

**URL:** `ioon.mx/presentaciones/<slug>/`

---

### 3. Layout Secciones + L3 Tabs (tres niveles de navegación)

Extiende el layout secciones con un tercer nivel: pestañas inline dentro del contenido del slide (Propuesta C — tabs internos).

Navegación:
- ↑↓ = secciones (nivel 1)
- ←→ = sub-slides dentro de cada sección (nivel 2)
- Tabs de texto = sub-contenido dentro de un slide (nivel 3)
- ←→ también navega entre tabs L3 cuando existen
- Los tabs se renderizan como pestañas de texto con underline dentro del área de contenido del slide

Para activar L3 en un slide, agregar el campo `l3` con un array de sub-items:

```json
{
  "title": "Nombre",
  "client": "Cliente",
  "date": "2026-04-06",
  "password": "",
  "layout": "sections",
  "sections": [
    {
      "title": "Sección",
      "slides": [
        {
          "type": "text",
          "heading": "Título del grupo",
          "body": "Descripción introductoria del grupo.",
          "l3": [
            {
              "label": "Tab 1",
              "heading": "Subtema 1",
              "body": "Contenido del primer tab.",
              "imgLayout": "2x",
              "images": ["img1-a.jpg", "img1-b.jpg"]
            },
            {
              "label": "Tab 2",
              "heading": "Subtema 2",
              "body": "Contenido del segundo tab.",
              "imgLayout": "2x",
              "images": ["img2-a.jpg", "img2-b.jpg"]
            }
          ]
        }
      ]
    }
  ]
}
```

El heading y body del slide padre se muestran siempre arriba. Los tabs cambian solo el contenido debajo de la línea de tabs.

**URL principal:** `ioon.mx/presentaciones/<slug>/`
**URL bonita (con ruta de cliente):** `ioon.mx/<cliente>/<presentacion>/`

Para que la URL bonita funcione, debe existir `src/pages/[client]/[presentation].astro` y el slug de la presentación debe seguir el formato `<clienteslug>-<presentacionslug>`.

---

## Tipos de slide

| Tipo | Campos requeridos | Campos opcionales | Descripción |
|------|------------------|-------------------|-------------|
| `title` | `heading` | `overline`, `subheading` | Portada o cierre, texto centrado |
| `text` | al menos uno de `heading`, `body`, `bullets` | `imgLayout`, `images`, `l3` | Texto con título, párrafo y/o lista |
| `image` | `src` | `alt`, `caption` | Imagen a pantalla completa |
| `split` | `src` | `heading`, `body`, `alt` | Imagen izquierda + texto derecha 50/50 |
| `quote` | `text` | `attribution` | Cita centrada en itálica |

---

## Cinco layouts de imagen

Se aplican mediante los campos `imgLayout` + `images` en cualquier slide de tipo `text` (tanto a nivel slide como dentro de items `l3`).

### Resumen rápido

| imgLayout | Ratio | Cant. imágenes | Tamaño a 900px ancho | Uso típico |
|-----------|-------|----------------|----------------------|------------|
| `a` | 4:3 | 1 | 900 × 675 px | Imagen principal, fotografía, mockup |
| `2x` | 4:3 × 2 | 2 | 445 × 334 px c/u | Comparativas, antes/después, variantes |
| `4p` | 3:4 × 4 | 4 | ~220 × 293 px c/u | Retratos, apps, tarjetas, uniformes |
| `wide` | 16:9 | 1 | 900 × 506 px | Panorámicas, escenarios, headers |

### Tamaño de imagen A

El tamaño de referencia ("imagen A") es **900 × 675 px** (ratio 4:3 al ancho máximo del contenedor). Todos los demás layouts escalan proporcionalmente respecto a este tamaño:

- `2x`: mitad de ancho, mismo ratio → **445 × 334 px** cada imagen
- `4p`: cuarto de ancho, ratio invertido → **~220 × 293 px** cada imagen (mismo alto que A)
- `wide`: mismo ancho, ratio 16:9 → **900 × 506 px**

En pantallas menores a 900px todo escala proporcionalmente. En móvil, `4p` se reorganiza en grid de 2×2.

### Config JSON por layout

**Layout A** — Una imagen 4:3
```json
{
  "type": "text",
  "heading": "Título",
  "body": "Contenido.",
  "imgLayout": "a",
  "images": ["nombre-archivo.jpg"]
}
```

**Layout 2x** — Dos imágenes 4:3 lado a lado
```json
{
  "type": "text",
  "heading": "Título",
  "body": "Contenido.",
  "imgLayout": "2x",
  "images": ["archivo-1.jpg", "archivo-2.jpg"]
}
```

**Layout 4p** — Cuatro imágenes 3:4 en fila
```json
{
  "type": "text",
  "heading": "Título",
  "body": "Contenido.",
  "imgLayout": "4p",
  "images": ["archivo-1.jpg", "archivo-2.jpg", "archivo-3.jpg", "archivo-4.jpg"]
}
```

**Layout wide** — Una imagen 16:9
```json
{
  "type": "text",
  "heading": "Título",
  "body": "Contenido.",
  "imgLayout": "wide",
  "images": ["archivo-panoramica.jpg"]
}
```

### Resolución de imágenes

- **Locales:** poner archivos en `public/presentaciones/<slug>/` y referenciar solo el nombre: `"images": ["foto.jpg"]`
- **URLs externas:** usar URL completa: `"images": ["https://images.unsplash.com/photo-xxx?w=1200&q=80"]`
- **Fallback:** si la imagen no carga, se muestra un placeholder gris con ícono y la etiqueta del ratio

### Tamaños recomendados para exportar imágenes

| imgLayout | Tamaño recomendado | Formato |
|-----------|--------------------|---------|
| `a` | 1800 × 1350 px (2x retina) | JPG q80 / WebP |
| `2x` | 890 × 668 px c/u (2x retina) | JPG q80 / WebP |
| `4p` | 440 × 586 px c/u (2x retina) | JPG q80 / WebP |
| `wide` | 1800 × 1012 px (2x retina) | JPG q80 / WebP |

---

## Items L3 dentro de un slide

Cada item en el array `l3` puede tener:

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `label` | Sí | Texto que aparece en la pestaña |
| `heading` | Sí | Título del contenido del tab |
| `body` | No | Párrafo de texto |
| `bullets` | No | Array de strings para lista |
| `imgLayout` | No | Layout de imagen: `a`, `2x`, `4p`, `wide` |
| `images` | No | Array de nombres de archivo o URLs |

---

## Estructura de archivos para una nueva presentación

```
src/content/
├── clientes/
│   └── <clienteslug>.json
└── presentaciones/
    └── <clienteslug>-<presentacionslug>/
        └── config.json

public/presentaciones/
└── <clienteslug>-<presentacionslug>/
    ├── imagen-1.jpg
    ├── imagen-2.jpg
    └── ...

src/pages/
├── presentaciones/
│   └── [slug].astro              ← Viewer principal (soporta los 3 layouts)
├── [client].astro                ← Página de cliente
└── [client]/
    └── [presentation].astro      ← Ruta bonita: /cliente/presentacion/
```

### Convenciones de naming

- **Slug de cliente:** sin guiones, todo junto → `educativoantequera`, `serclin`
- **Slug de presentación:** `<clienteslug>-<tema>` → `educativoantequera-el-siguiente-capitulo`
- **Imágenes:** kebab-case descriptivo → `valor-nucleo.jpg`, `pilar-editorial-1.jpg`
- **Auto-detección:** si el slug del deck empieza con el slug del cliente + guión, aparece automáticamente en la página del cliente

---

## Cómo sustituir imágenes

1. Exportar las imágenes al tamaño recomendado (ver tabla arriba)
2. Nombrar los archivos exactamente como aparecen en `config.json`
3. Copiar los archivos a `public/presentaciones/<slug>/`
4. Hacer commit y push — Coolify redespliega automáticamente

```bash
# Ejemplo
cp ~/mis-imagenes/*.jpg public/presentaciones/educativoantequera-el-siguiente-capitulo/
git add .
git commit -m "agregar imágenes educativo antequera"
git push origin main
```

---

## Ejemplo completo: config.json con los tres niveles y todos los layouts de imagen

Ver el archivo `src/content/presentaciones/educativoantequera-el-siguiente-capitulo/config.json` generado en este mismo paquete como referencia canónica del formato L3 + imgLayout.

---

## Contraseña

```json
"password": "clave123"
```

Dejar `""` para acceso libre. Se valida client-side.

---

## Despliegue

```bash
cd ~/Downloads/2/-0_ioon
git add .
git commit -m "nueva presentación: educativo antequera"
git push origin main
```

Coolify tiene Auto Deploy activado — redespliega al detectar push en `main`.

---

## Referencia rápida: Crear presentación desde cero

1. Decidir layout: `clásico`, `sections`, o `sections + l3`
2. Crear carpeta `src/content/presentaciones/<slug>/config.json`
3. Crear JSON del cliente en `src/content/clientes/<clienteslug>.json` (si no existe)
4. Poner imágenes en `public/presentaciones/<slug>/`
5. `git add . && git commit -m "desc" && git push origin main`
6. Verificar en `ioon.mx/presentaciones/<slug>/` o `ioon.mx/<cliente>/<presentacion>/`
