# ioon.mx — Guía completa del sistema de presentaciones

## Quién es ioon

ioon es un estudio de innovación en Oaxaca, México, dirigido por Francisco León (Director de Arte y Fotógrafo). Filosofía: Diseño limpio y con estrategia + Tecnología Open Source + Agentes de IA que trabajan por ti.

- Sitio: https://ioon.mx
- Contacto: hola.ioon@gmail.com | +52 951 508 1629
- Repo: https://github.com/fjleonpacheco-cmd/-0_ioon

## Stack técnico

- **Astro 5** — framework estático
- **Tailwind CSS 4** — estilos con CSS variables
- **Space Grotesk** — tipografía principal (CDN de Florian Karsten)
- **Docker + Nginx** — despliegue via Coolify en Hetzner VPS (89.167.93.139)
- **Dominio**: ioon.mx (DNS en GoDaddy)

## Estética

- Minimalista extremo, mucho espacio en blanco
- Tipografía editorial (Space Grotesk, pesos 300-700)
- Colores: `#0a0a0a` (ink), `#fafafa` (paper), `#71717a` (muted), `#e4e4e7` (border)
- Inspiración: portfolios de arquitectura, galerías de arte contemporáneo
- Sin elementos genéricos de template — diseño de autor

## Estructura del proyecto

```
src/
├── content/
│   ├── clientes/              ← JSON por cliente
│   │   ├── educativoantequera.json
│   │   └── serclin.json
│   └── presentaciones/        ← Una carpeta por deck
│       ├── ejemplo/config.json        (layout clásico)
│       └── hotel-terraza/config.json  (layout sections)
├── layouts/
│   └── Base.astro
├── pages/
│   ├── index.astro            ← Landing con partículas Canvas
│   ├── 404.astro
│   ├── [client].astro         ← Páginas de cliente dinámicas
│   └── presentaciones/
│       └── [slug].astro       ← Viewer de presentaciones
├── styles/
│   └── global.css
public/
├── logo.png                   ← Logo PNG con transparencia
├── favicon.svg                ← Círculo negro sobre blanco
└── presentaciones/            ← Imágenes locales de cada deck
```

## CSS Variables (global.css)

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

Animaciones disponibles: `slideIn`, `bounce`, `stagger` (delay progresivo en hijos).

---

## Formatos de presentación

### 1. Layout Clásico (slides lineales)

Navegación: flechas ← → , teclado, touch swipe, barra de progreso arriba.

**Config JSON:**

```json
{
  "title": "Nombre de la presentación",
  "client": "Nombre del cliente",
  "date": "2026-04-05",
  "password": "",
  "slides": [
    { "type": "title", "overline": "ioon × Cliente", "heading": "Título grande", "subheading": "Subtítulo" },
    { "type": "text", "heading": "Título", "body": "Párrafo de texto." },
    { "type": "text", "heading": "Con bullets", "bullets": ["Punto 1", "Punto 2", "Punto 3"] },
    { "type": "image", "src": "https://url-de-imagen.jpg", "alt": "Descripción", "caption": "Pie de foto" },
    { "type": "split", "src": "https://url-de-imagen.jpg", "alt": "Desc", "heading": "Título", "body": "Texto al lado" },
    { "type": "quote", "text": "La cita textual aquí.", "attribution": "Autor" }
  ]
}
```

**Ejemplo real** (Casa Monte): https://ioon.mx/presentaciones/ejemplo/

### 2. Layout Secciones (vertical + horizontal)

Navegación:
- **Vertical (↑↓)**: navega entre secciones/temas principales
- **Horizontal (←→)**: navega sub-slides dentro de cada sección
- **Dots izquierda** (desktop) / **derecha** (móvil): clickeables, muestran progreso vertical
- **Dots horizontales**: aparecen solo cuando hay >1 sub-slide
- **Flechas ↑↓**: siempre visibles en nav inferior
- **Teclado**: ↑↓ secciones, ←→ sub-slides, espacio = →
- **Touch**: swipe vertical = secciones, swipe horizontal = sub-slides

**Config JSON:**

```json
{
  "title": "Título de la presentación",
  "client": "Nombre del cliente",
  "date": "2026-04-05",
  "password": "",
  "layout": "sections",
  "sections": [
    {
      "title": "Nombre de la sección",
      "slides": [
        { "type": "title", "overline": "ioon × Cliente", "heading": "Título", "subheading": "Sub" },
        { "type": "text", "heading": "Subtema", "body": "Contenido..." },
        { "type": "image", "src": "https://...", "caption": "Pie" }
      ]
    },
    {
      "title": "Segunda sección",
      "slides": [
        { "type": "text", "heading": "Tema", "bullets": ["A", "B", "C"] },
        { "type": "split", "src": "https://...", "heading": "Visual", "body": "Texto" }
      ]
    }
  ]
}
```

**Ejemplo real** (Hotel Terraza): https://ioon.mx/presentaciones/hotel-terraza/

---

## Tipos de slide disponibles

| Tipo | Campos requeridos | Campos opcionales | Descripción |
|------|------------------|-------------------|-------------|
| `title` | `heading` | `overline`, `subheading` | Slide de portada o cierre, texto centrado |
| `text` | al menos `heading`, `body`, o `bullets` | todos opcionales entre sí | Texto con título, párrafo y/o lista |
| `image` | `src` | `alt`, `caption` | Imagen a pantalla completa |
| `split` | `src` | `heading`, `body`, `alt` | Imagen izquierda + texto derecha (50/50) |
| `quote` | `text` | `attribution` | Cita centrada en itálica |

### Imágenes

- **URLs externas**: `"src": "https://images.unsplash.com/photo-xxx?w=1200&q=80"`
- **Locales**: poner archivos en `public/presentaciones/<slug>/` y referenciar solo el nombre: `"src": "foto.jpg"`
- **Capturas en tiempo real**: `"src": "https://s.wordpress.com/mshots/v1/https://sitio.com?w=800"`

### Contraseña

```json
"password": "clave123"
```
Deja vacío `""` para acceso libre.

---

## Páginas de cliente

Cada cliente tiene una página en `ioon.mx/<slug-cliente>` con su headline, tagline, y lista de presentaciones.

**Config JSON** (`src/content/clientes/<slug>.json`):

```json
{
  "name": "Nombre del Cliente",
  "slug": "slugcliente",
  "headline": "Desarrollo de Marca para Nombre del Cliente",
  "tagline": "Frase distintiva del proyecto.",
  "presentations": [
    { "slug": "slugcliente-propuesta", "title": "Propuesta Inicial", "date": "2026-04-10" }
  ]
}
```

Las presentaciones se auto-detectan si el slug del deck empieza con el slug del cliente (ej: `serclin-analisis` aparece automáticamente en `ioon.mx/serclin`). También se pueden listar manualmente en el array `presentations`.

---

## Ejemplo completo: Hotel Terraza (layout sections)

```json
{
  "title": "Identidad & Estrategia Digital",
  "client": "Hotel Terraza",
  "date": "2026-04-05",
  "password": "",
  "layout": "sections",
  "sections": [
    {
      "title": "Portada",
      "slides": [
        {
          "type": "title",
          "overline": "ioon × Hotel Terraza",
          "heading": "Identidad & Estrategia Digital",
          "subheading": "Propuesta integral — Abril 2026"
        }
      ]
    },
    {
      "title": "Investigación",
      "slides": [
        {
          "type": "text",
          "heading": "El contexto",
          "body": "Hotel Terraza es un hotel boutique en el centro histórico de Oaxaca. Su ubicación privilegiada y arquitectura colonial son activos que no se reflejan en su presencia digital actual."
        },
        {
          "type": "image",
          "src": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
          "alt": "Hotel boutique colonial",
          "caption": "Referencia visual — arquitectura colonial contemporánea"
        },
        {
          "type": "text",
          "heading": "Hallazgos clave",
          "bullets": [
            "El 73% de los huéspedes llegan por recomendación, no por digital",
            "Competidores directos tienen presencia visual 3x más fuerte",
            "La experiencia física supera las expectativas — la digital no",
            "Oportunidad: posicionar la terraza como ícono visual de la marca"
          ]
        }
      ]
    },
    {
      "title": "Estrategia",
      "slides": [
        {
          "type": "text",
          "heading": "Visión estratégica",
          "body": "Convertir la experiencia sensorial del hotel en un lenguaje visual coherente que funcione desde Instagram hasta la señalética del lobby."
        },
        {
          "type": "split",
          "src": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
          "alt": "Vista terraza hotel",
          "heading": "Pilares de marca",
          "body": "Tres ejes: Raíz oaxaqueña, Hospitalidad contemporánea, Vista privilegiada."
        },
        {
          "type": "text",
          "heading": "Audiencia",
          "bullets": [
            "Viajeros culturales 30-55 años",
            "Nómadas digitales que buscan autenticidad",
            "Parejas en escapadas de fin de semana",
            "Turismo gastronómico nacional e internacional"
          ]
        }
      ]
    },
    {
      "title": "Dirección Visual",
      "slides": [
        {
          "type": "image",
          "src": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
          "alt": "Habitación hotel boutique",
          "caption": "Dirección fotográfica — luz natural, texturas, detalle"
        },
        {
          "type": "split",
          "src": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
          "heading": "Paleta cromática",
          "body": "Terracota, arena, verde olivo, blanco hueso."
        },
        {
          "type": "split",
          "src": "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800&q=80",
          "heading": "Sistema tipográfico",
          "body": "Serif editorial para títulos, sans-serif limpia para cuerpo."
        }
      ]
    },
    {
      "title": "Aplicaciones",
      "slides": [
        {
          "type": "image",
          "src": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
          "caption": "Señalética interior — integrada a la arquitectura"
        },
        {
          "type": "text",
          "heading": "Entregables",
          "bullets": [
            "Logotipo y sistema de identidad visual",
            "Sitio web con motor de reservas",
            "Guía de estilo fotográfico",
            "Templates para redes sociales",
            "Señalética interior y amenities",
            "Menú del restaurante de terraza"
          ]
        },
        {
          "type": "image",
          "src": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",
          "caption": "El lobby como primera impresión de marca"
        }
      ]
    },
    {
      "title": "Próximos pasos",
      "slides": [
        {
          "type": "text",
          "heading": "Cronograma",
          "bullets": [
            "Semana 1-2: Feedback y aprobación de dirección",
            "Semana 3-4: Desarrollo de identidad visual",
            "Semana 5-6: Sesión fotográfica in-situ",
            "Semana 7-8: Diseño web y aplicaciones",
            "Semana 9-10: Implementación y lanzamiento"
          ]
        },
        {
          "type": "quote",
          "text": "Un hotel no vende habitaciones. Vende la promesa de despertar en un lugar que te cambia.",
          "attribution": "Dirección creativa ioon"
        },
        {
          "type": "title",
          "heading": "Gracias",
          "subheading": "hola.ioon@gmail.com"
        }
      ]
    }
  ]
}
```

---

## Cómo crear una nueva presentación

### Opción 1: Desde terminal

```bash
cd ~/Downloads/2/-0_ioon
npm run new-deck -- nombre-del-deck
```

Editar `src/content/presentaciones/nombre-del-deck/config.json`.

### Opción 2: Manualmente

1. Crear carpeta `src/content/presentaciones/<slug>/`
2. Crear `config.json` dentro con la estructura de arriba
3. Si hay imágenes locales, ponerlas en `public/presentaciones/<slug>/`

### Desplegar

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

Coolify tiene Auto Deploy activado — redespliega solo al detectar push.

---

## Convenciones de naming

- **Slugs de presentación**: `cliente-tema` (ej: `serclin-analisis-mercado`)
- **Slugs de cliente**: sin guiones, todo junto (ej: `educativoantequera`, `serclin`)
- **Presentaciones de un cliente**: deben empezar con el slug del cliente + guión para auto-detección

---

## Viewer completo: [slug].astro

El viewer soporta ambos layouts en un solo archivo. Detecta el layout del config:
- Si `layout === 'sections'` y existe `sections` → usa navegación vertical + horizontal
- Si no → usa navegación clásica lineal

Funcionalidades:
- Contraseña opcional (client-side)
- Animación slideIn en cada transición
- Responsive (móvil/desktop)
- Touch swipe
- Keyboard shortcuts
- Dots clickeables

---

## Notas de despliegue

- Repo público: https://github.com/fjleonpacheco-cmd/-0_ioon
- Coolify v4 en VPS Hetzner
- Build Pack: Dockerfile
- Puerto: 80 (Nginx)
- SSL: Let's Encrypt via Traefik
- Auto Deploy: activado
- El repo local más reciente está en: `~/Downloads/2/-0_ioon`
