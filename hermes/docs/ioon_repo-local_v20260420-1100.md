# ioon.mx — Estado del repositorio local (v20260420-1100)

> Adjunta este archivo a un nuevo chat para dar contexto sobre la estructura actual del repo.

---

## Ubicación

```
~/Documentos/0_ioon/-0_ioon/
```

Repo remoto: https://github.com/fjleonpacheco-cmd/-0_ioon
Deploy: Docker + Nginx via Coolify en Hetzner VPS. Push a `main` = redeploy automático.

---

## Estructura del repositorio

```
-0_ioon/
├── astro.config.mjs
├── Dockerfile
├── nginx.conf
├── package.json
├── tsconfig.json
├── README.md
│
├── aux/                             ← Auxiliares
├── clients/                         ← Datos de clientes (legacy?)
├── docs/
│   └── indice_presentacion.txt
├── internal/
├── scripts/
│
├── public/
│   ├── logo.png
│   ├── favicon.svg
│   └── presentaciones/              ← Imágenes locales por deck
│
├── src/
│   ├── content/
│   │   ├── clientes/                ← JSON por cliente
│   │   └── presentaciones/          ← Una carpeta por deck
│   │       ├── ejemplo/config.json
│   │       ├── hotel-terraza/config.json
│   │       ├── serclin-1_estudio-de-mercado/config.json
│   │       ├── serclin-2_ventaja-competitiva/config.json
│   │       ├── serclin-3_audiencia/config.json
│   │       └── serclin-3_matriz-de-identidad-de-marca/config.json
│   │
│   ├── layouts/
│   │   └── Base.astro               ← NO TOCAR
│   │
│   ├── pages/
│   │   ├── [client].astro           ← Páginas de cliente dinámicas
│   │   ├── 404.astro
│   │   ├── index.astro              ← Landing con partículas Canvas
│   │   ├── presentaciones/
│   │   │   └── [slug].astro         ← Viewer (soporta los 3 layouts)
│   │   └── serclin/                 ← Redirects bonitos
│   │       ├── 1_estudio-de-mercado.astro
│   │       ├── 2_ventaja-competitiva.astro
│   │       ├── 3_audiencia.astro
│   │       └── 3_matriz-de-identidad-de-marca.astro
│   │
│   └── styles/
│       └── global.css               ← Variables, @font-face, override
```

---

## Proyectos satélite (fuera del repo, en ~/Documentos/0_ioon/)

```
~/Documentos/0_ioon/
├── -0_ioon/                         ← REPO (este documento)
├── 1_Educativo Antequera/           ← Archivos de trabajo del cliente
│   └── config.json                  ← Borrador / referencia
└── 2_Serclin/                       ← Archivos de trabajo del cliente
```

También hay carpetas relacionadas fuera de 0_ioon:
- `~/Documentos/_ Evidencia/`
- `~/Documentos/Adobe/`

---

## Proyectos activos en el repo

### Sitios publicados
| Proyecto | URL | Carpeta |
|----------|-----|---------|
| Landing ioon | https://ioon.mx | `src/pages/index.astro` |
| Catálogo ioon | — | `catalogo-ioon/` |
| Demo Arquitectura | https://demo-arquitectura-1.ioon.mx | `demo-arquitectura-1/` |
| Demo Fotografía | https://demo-fotografia-1.ioon.mx | `demo-fotografia-1/` |
| Cano Vera v1 | — | `cano-vera_v1/` |

### Presentaciones publicadas
| Presentación | URL directa | URL bonita |
|---|---|---|
| Ejemplo | `/presentaciones/ejemplo/` | — |
| Hotel Terraza | `/presentaciones/hotel-terraza/` | — |
| Serclin — Estudio de Mercado | `/presentaciones/serclin-1_estudio-de-mercado/` | `ioon.mx/serclin/1_estudio-de-mercado` |
| Serclin — Ventaja Competitiva | `/presentaciones/serclin-2_ventaja-competitiva/` | `ioon.mx/serclin/2_ventaja-competitiva` |
| Serclin — Audiencia | `/presentaciones/serclin-3_audiencia/` | `ioon.mx/serclin/3_audiencia` |
| Serclin — Matriz de Identidad | `/presentaciones/serclin-3_matriz-de-identidad-de-marca/` | `ioon.mx/serclin/3_matriz-de-identidad-de-marca` |

### Presentaciones en desarrollo (no en el repo aún)
| Presentación | Estado | Prototipo local |
|---|---|---|
| Educativo Antequera — El Siguiente Capítulo | Iterando copy y estructura (propuesta-c_13) | `propuesta-c_13.html` |

---

## Clientes configurados

### Serclin
- Config: `src/content/clientes/serclin.json`
- Redirects: `src/pages/serclin/`
- Presentaciones: 4 (estudio de mercado, ventaja competitiva, audiencia, matriz de identidad)

### Educativo Antequera
- Config: pendiente de crear en `src/content/clientes/educativoantequera.json`
- Redirects: pendiente `src/pages/educativoantequera/`
- Presentaciones: 1 en desarrollo (El Siguiente Capítulo)
- Slug: `educativoantequera-1_el-siguiente-capitulo`

---

## Para publicar Educativo Antequera falta:

1. Crear `src/content/presentaciones/educativoantequera-1_el-siguiente-capitulo/config.json`
2. Crear `src/content/clientes/educativoantequera.json`
3. Crear `src/pages/educativoantequera/1_el-siguiente-capitulo.astro` (redirect)
4. Subir imágenes a `public/presentaciones/educativoantequera-1_el-siguiente-capitulo/`
5. Push a `main`

---

## Stack técnico

- **Astro 5** — framework estático
- **Tailwind CSS 4** — con valores arbitrarios (corchetes), no clases genéricas
- **Space Grotesk** — variable font de Florian Karsten (no Google Fonts)
- **Override global:** `*, *::before, *::after { font-family: var(--font-sans) !important; }`
- **Docker + Nginx** — deploy via Coolify

---

## Documentos de referencia

Adjuntar a chats según necesidad:

| Documento | Uso |
|-----------|-----|
| `ioon-presentaciones-v20260415.md` | Sistema de presentaciones completo (tipos de slide, layouts, navegación) |
| `ioon_informe-tipografico_v20260415.md` | Tipografía: escala, clases Tailwind exactas, fuente, overrides |
| `ioon-presentaciones-directrices-imagenes-v20260415.md` | Tamaños de imagen recomendados por layout |
| `ioon-directrices-diseno_20260413.md` | Paleta, espaciado, animaciones, reglas generales |
| `educativoantequera-mapa-estructural_v20260416-1330.txt` | Última versión del mapa estructural de Educativo Antequera |

---

## Workflow

```bash
# Ruta permanente del repo
cd ~/Documentos/0_ioon/-0_ioon

# Copiar archivos descargados
cp ~/Descargas/ARCHIVO destino/

# Deploy
git add .
git commit -m "descripción"
git push origin main

# Si Coolify no auto-deploya, hacer Redeploy manual
```

- **No usar scripts Python** para editar archivos .astro — generar el archivo completo
- **Downloads:** carpeta temporal, borrar después de copiar al repo
