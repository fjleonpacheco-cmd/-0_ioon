# Plantilla: demo-arquitectura-1

> **Proyecto:** Catálogo de demos para ioon.mx
> **Categoría:** Arquitectura
> **Ruta objetivo:** `ioon.mx/catálogo/arquitectura/demo-arquitectura-1`
> **Fecha:** Abril 2026

---

## Qué es este archivo

Este documento describe la plantilla técnica de un sitio web para despachos de arquitectura, construido como demo funcional y desplegado en el stack de ioon. Sirve como base replicable para vender websites a clientes del nicho de arquitectura.

---

## Stack técnico

| Capa | Herramienta |
|:---|:---|
| Framework | Vite + React 18 |
| Estilos | CSS-in-JS (inline styles) + clases CSS con media queries |
| Tipografía | Google Fonts (configurable por cliente) |
| Build | Dockerfile multi-stage (Node 20 + nginx alpine) |
| Deploy | Coolify v4 → Hetzner VPS |
| Dominio | Subdominio en ioon.mx (wildcard DNS configurado) |

---

## Estructura del proyecto

```
demo-arquitectura-1/
├── Dockerfile
├── nginx.conf
├── vite.config.js
├── package.json
├── index.html
└── src/
    ├── main.jsx
    └── App.jsx          ← Todo el sitio vive aquí
```

---

## Arquitectura del componente App.jsx

El sitio es un **single-file React component** con las siguientes secciones:

### 1. Datos (líneas 3–88)
Array `PROJECTS` con la estructura:
```js
{
  id: 1,
  title: "Nombre del Proyecto",
  category: "Categoría",
  location: "Ciudad, País",
  year: "2024",
  description: "Descripción breve del proyecto.",
  images: [
    "https://url-imagen-1.jpg",
    "https://url-imagen-2.jpg",
    // mínimo 3, máximo 6 recomendado
  ],
}
```

Array `CATEGORIES`:
```js
const CATEGORIES = ["Todos", "Primera", "Segunda", "Tercera", "Cuarta"];
```

### 2. Navegación (nav)
- Logo del estudio (texto, configurable)
- Links: Proyectos, Estudio, Premios, Contacto
- Menú hamburguesa animado en móvil (≤768px)
- Overlay fullscreen con smooth scroll a secciones

### 3. Hero Slideshow
- Toma los primeros 4 proyectos del array
- Crossfade automático cada 5 segundos
- Barra de progreso interactiva
- Gradient overlay con título y ubicación

### 4. Sección Estudio (id="estudio")
- Frase/manifiesto del despacho
- Párrafo descriptivo
- Stats en fila (Años, Proyectos, Premios, etc.)

### 5. Galería filtrable (id="proyectos")
- Filtros por categoría con estilo minimal
- Grid responsivo: multi-columna en desktop, 1 columna en móvil
- Primer proyecto ocupa 2 rows (destacado)
- Hover overlay con descripción y conteo de fotos
- Lazy loading en imágenes

### 6. Lightbox
- Apertura al click en cualquier proyecto
- Navegación: flechas (desktop), swipe (móvil), thumbnails (ambos)
- Teclado: ← → Esc
- Thumbnails clickeables para navegación directa
- Body scroll bloqueado mientras está abierto

### 7. Sección Equipo/Premios (id="premios")
- Fondo oscuro
- Nombres de socios
- Lista de premios/reconocimientos

### 8. Contacto (id="contacto")
- CTA con mailto

---

## Variables de personalización por cliente

Para adaptar a un nuevo despacho, modificar:

| Variable | Ubicación | Ejemplo genérico |
|:---|:---|:---|
| Nombre del estudio | Nav + Hero | `TALLER DE ARQUITECTURA` |
| Array PROJECTS | Líneas 3–88 | 6 proyectos con imágenes propias |
| Array CATEGORIES | Línea 90 | `["Todos", "Residencial", "Comercial", "Cultural"]` |
| Frase/manifiesto | Sección estudio | `"La arquitectura como respuesta al contexto."` |
| Stats | Sección estudio | Años, proyectos, premios propios |
| Socios | Sección premios | Nombres reales |
| Email | Sección contacto | Email del cliente |
| Tipografía | Link de Google Fonts + font-family | Roboto, DM Sans, etc. |
| Dominio | Coolify + DNS | `cliente.com` o `cliente.ioon.mx` |

---

## Contenido genérico de la plantilla

Para el demo público, el contenido es:

- **Nombre:** TALLER DE ARQUITECTURA
- **Categorías:** Todos, Residencial, Comercial, Cultural, Institucional
- **Proyectos:**
  1. Casa del Lago — Residencial — Valle de Bravo, México — 2024
  2. Mercado Central — Comercial — Oaxaca, México — 2023
  3. Centro Cultural del Río — Cultural — Guadalajara, México — 2022
  4. Parque Biblioteca Norte — Institucional — CDMX, México — 2021
  5. Edificio Jacarandas — Residencial — Mérida, México — 2020
  6. Pabellón del Agua — Cultural — Puebla, México — 2019
- **Frase:** "Cada proyecto es una respuesta específica a su contexto."
- **Stats:** 10+ Años, 30+ Proyectos, 5 Premios, 3 Publicaciones
- **Equipo:** Arq. Nombre Apellido · Arq. Nombre Apellido
- **Email:** hola@tallerdearquitectura.mx
- **Imágenes:** Unsplash placeholders (arquitectura)

---

## Proceso de deploy para cada demo

1. Duplicar carpeta `demo-arquitectura-1/`
2. Modificar contenido en `App.jsx`
3. Ajustar `vite.config.js` → `base: '/'`
4. Push a GitHub (repo propio o subcarpeta de `0_ioon`)
5. En Coolify: New Resource → Public Repo → Dockerfile → dominio del demo
6. Deploy

---

## Responsive

- **Desktop (>768px):** Nav horizontal, grid multi-columna, flechas en lightbox
- **Tablet/Móvil (≤768px):** Hamburguesa, grid 1 columna, swipe en lightbox
- **Small (≤480px):** Hero reducido, filtros compactos, stats wrap

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

## Próximas mejoras posibles

- Transiciones de slide (en vez de crossfade) para el hero
- Animación de entrada por scroll (intersection observer)
- Página individual por proyecto (React Router o Astro)
- Formulario de contacto funcional (n8n webhook)
- Integración con Instagram API para fotos reales
- Versión Astro para SEO/SSG en producción final

---

# Prompt para nuevo chat

Copia y pega lo siguiente al iniciar un nuevo chat con Claude, adjuntando este archivo y el `contexto_tecnico_ioon.md`:

---

```
Contexto: Soy Francisco León de ioon, estudio de innovación. Estoy construyendo un catálogo de demos de websites en mi dominio ioon.mx para mostrar a prospectos de diferentes industrias. La estructura del catálogo es:

ioon.mx/catálogo/arquitectura/demo-arquitectura-1
ioon.mx/catálogo/restaurantes/demo-restaurant-1
ioon.mx/catálogo/escuelas/demo-escuela-1
...y así para cada nicho.

Cada demo es un sitio funcional, desplegado en mi Hetzner con Coolify, que puedo personalizar rápidamente para cada cliente. La idea es que el prospecto vea el demo, le guste, y yo solo sustituya contenido (textos, imágenes, colores, tipografía) para entregarle su sitio en días.

Ya tengo el primer demo terminado: "demo-arquitectura-1". Es un portafolio para despachos de arquitectura con hero slideshow, galería filtrable, lightbox con swipe, y diseño responsivo. Está construido en Vite + React como single-file component. Adjunto el archivo .md con toda la documentación técnica de la plantilla.

Lo que necesito en este chat:
1. [ESPECIFICAR: ¿nuevo demo de otro nicho? ¿mejorar el existente? ¿montar el catálogo principal? ¿otra cosa?]

Mi stack: Hetzner VPS + Coolify + GitHub. Todo el contexto técnico está en el archivo adjunto contexto_tecnico_ioon.md.
```

---

*Generado al cierre de sesión — Abril 2026*
