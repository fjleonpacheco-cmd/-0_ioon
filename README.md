# ioon.mx

Sitio web de ioon — estudio de diseño en Oaxaca.

## Stack

- **Astro 5** — framework estático
- **Tailwind CSS 4** — estilos
- **Space Grotesk** — tipografía
- **Docker + Nginx** — despliegue via Coolify

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Genera dist/
npm run preview    # Previsualiza build
```

## Presentaciones

Cada presentación es una carpeta en `src/content/presentaciones/` con un `config.json`.

### Crear nueva presentación

```bash
npm run new-deck -- nombre-del-cliente
```

Esto crea:
- `src/content/presentaciones/nombre-del-cliente/config.json` — configuración y slides
- `public/presentaciones/nombre-del-cliente/` — carpeta para imágenes

### Estructura del config.json

```json
{
  "title": "Nombre de la presentación",
  "client": "Nombre del cliente",
  "date": "2026-04-05",
  "password": "",        // Dejar vacío = sin contraseña
  "slides": [...]
}
```

### Tipos de slide

| Tipo | Campos |
|------|--------|
| `title` | `overline`, `heading`, `subheading` |
| `text` | `heading`, `body`, `bullets[]` |
| `image` | `src`, `alt`, `caption` |
| `split` | `src`, `alt`, `heading`, `body` |
| `quote` | `text`, `attribution` |

Las imágenes van en `public/presentaciones/<slug>/` y se referencian solo con el nombre del archivo: `"src": "foto.jpg"`.

### Proteger con contraseña

En el `config.json`:
```json
"password": "secreto123"
```

## Despliegue en Coolify

1. Sube el repo a GitHub/Gitea
2. En Coolify → New Resource → Docker
3. Apunta al repo, Coolify detecta el `Dockerfile`
4. Configura dominio: `ioon.mx`
5. Coolify + Traefik se encargan de HTTPS con Let's Encrypt

## Estructura

```
src/
├── content/presentaciones/    ← Una carpeta por deck
│   └── ejemplo/config.json
├── layouts/Base.astro
├── pages/
│   ├── index.astro            ← Landing
│   └── presentaciones/[slug].astro  ← Viewer
└── styles/global.css
public/
└── presentaciones/            ← Imágenes de cada deck
```
