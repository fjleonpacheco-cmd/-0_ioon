# Contexto de Sesión: CANO|VERA Arquitectura — Prototipo v1

> **Archivo:** ioon_cano-vera_v20260420-1130.md
> **Para:** Nuevo chat de Claude
> **Fecha de sesión:** 10–20 de abril 2026
> **Propósito:** Dar contexto completo del prototipo de sitio web construido para CANO|VERA Arquitectura como demo de ventas del servicio de websites de ioon.

---

## Resumen ejecutivo

Se construyó un prototipo funcional de portafolio web para el despacho CANO|VERA Arquitectura (CDMX). El sitio está desplegado y corriendo en **canovera.ioon.mx**. Se usó como caso real para validar el producto de venta de websites para arquitectos. El prototipo forma parte del catálogo de demos de ioon bajo la categoría "Arquitectura".

---

## El prospecto: CANO|VERA Arquitectura

- **Fundadores:** Juan Carlos Cano, Paloma Vera (2007), Fermín Andrade (socio desde 2019)
- **Base:** Ciudad de México
- **Sitio actual:** canovera.com — caído o extremadamente lento (punto de venta clave)
- **Instagram:** @canito27 (no se pudo scrapear por robots.txt)
- **Orientación:** Inicialmente vivienda social, ahora proyectos institucionales, culturales e infraestructura a gran escala
- **Filosofía:** "Lo específico puede transformar el todo."

### Proyectos destacados (reales, de fuentes públicas)
1. **Plaza Andaro** — Avándaro, 2013 — Centro comercial con durmientes de ferrocarril reutilizados
2. **Utopía Estrella** — Iztapalapa, 2023 — Transformación de vertedero en centro cultural. **Holcim Gold Award 2023 Latinoamérica**
3. **Campus UMA** — Valle de Bravo, 2020 — Universidad del Medio Ambiente, con Oscar Hagerman
4. **Los Pinos** — CDMX, 2019 — Reprogramación de la antigua residencia presidencial
5. **Edificio Leones** — CDMX, 2016
6. **Casa Vecina** — CDMX, 2015

### Reconocimientos
- Emerging Voices 2024 — The Architectural League of New York
- Holcim Gold Award 2023 — Latinoamérica
- Bienal de Venecia 2016, 2018
- 2023 Residential Architect Design Awards

### Portafolio completo (del sitio canovera.com/proyectos)
- **Urbano:** Ciudad Xaman-Ha, Viviendas en Pachuca, Conjunto Xul-Ha, Living Anáhuac, Costera Miguel Alemán Acapulco
- **Equipamientos:** Edificio Leones, Casa Vecina, Ginga Sport, Instituto Campestre Metepec, Corporativo Scanda, Plaza Andaro, Campus UMA, Escuela en Mauritania
- **Transformaciones:** Petit Crêpe, Bague, Círculo de Yoga, La Tempestad, INAP
- **Concursos:** Biblioteca Vasconcelos, Pabellón Shanghai, Memorial Víctimas de la Violencia, Museo Juan Soriano

---

## Lo que se construyó

### Sitio web — Single-file React component

**URL live:** https://canovera.ioon.mx (subdominio, no path)
**Repo:** https://github.com/fjleonpacheco-cmd/-0_ioon → carpeta `cano-vera_v1/`

#### Secciones del sitio
1. **Nav fijo** — Logo "CANO | VERA" + links con smooth scroll + hamburguesa en móvil
2. **Hero slideshow** — Crossfade automático cada 5s, 4 proyectos, barra de progreso
3. **Estudio** — Manifiesto, descripción, stats (17+ Años, 40+ Proyectos, 2× Bienal, Gold Holcim)
4. **Galería filtrable** — 5 categorías, grid responsivo, hover overlay con descripción
5. **Lightbox** — Flechas (desktop), swipe (móvil), thumbnails clickeables, teclado (← → Esc)
6. **Equipo/Premios** — Fondo oscuro, nombres de socios, lista de premios
7. **Contacto** — CTA con mailto

#### Features técnicos
- Responsive completo (desktop, tablet, móvil)
- Menú hamburguesa animado con overlay fullscreen
- Swipe en lightbox para móvil (touch events, umbral 50px)
- Thumbnails clickeables para navegación directa
- Lazy loading en imágenes del grid
- Body scroll bloqueado en lightbox y menú móvil
- Tipografía: Roboto en múltiples pesos (100, 300, 400, 500)
- Imágenes: Unsplash placeholders (no se pudieron obtener las reales de Instagram)

---

## Stack del proyecto

```
cano-vera_v1/
├── Dockerfile          ← Multi-stage: node:20-alpine build + nginx:alpine serve
├── nginx.conf          ← SPA routing desde raíz /
├── vite.config.js      ← base: '/'
├── package.json        ← Vite 5 + React 18 (sin dependencias externas de UI)
├── index.html
└── src/
    ├── main.jsx
    └── App.jsx          ← ~410 líneas, todo el sitio
```

### Dependencias
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "@vitejs/plugin-react": "^4.3.1",
  "vite": "^5.4.2"
}
```

---

## Infraestructura y deploy

### DNS
- Registro A: `canovera` → `89.167.93.139`
- Registro A: `*` (wildcard) → `89.167.93.139` — agregado en esta sesión para futuros subdominios

### Coolify
- **Proyecto:** ioon-stack → production
- **Source:** Public Repository → `https://github.com/fjleonpacheco-cmd/-0_ioon`
- **Branch:** main
- **Build Pack:** Dockerfile
- **Base Directory:** `/cano-vera_v1`
- **Dockerfile Location:** `/Dockerfile`
- **Dominio:** `https://canovera.ioon.mx`
- **Puerto:** 80

### Decisiones de deploy
- Se intentó primero servir en path `ioon.mx/cano-vera_v1` → Bad Gateway por conflicto con Traefik y el dominio raíz `ioon.mx` que ya tiene otro servicio asignado
- Se migró a subdominio `canovera.ioon.mx` → funcionó correctamente
- El `vite.config.js` y `nginx.conf` están configurados para servir desde `/` (raíz del subdominio)

### SSL
- Pendiente: verificar que Coolify genere certificado Let's Encrypt. El dominio debe estar configurado como `https://canovera.ioon.mx` en Coolify para que lo haga automáticamente.

---

## Flujo de trabajo validado

```
1. Editar App.jsx localmente (o recibir archivo de Claude)
2. cp ~/Downloads/App_N.jsx ~/Downloads/2/-0_ioon/cano-vera_v1/src/App.jsx
3. cd ~/Downloads/2/-0_ioon
4. git add . && git commit -m "mensaje" && git push origin main
5. En Coolify → Redeploy
6. Verificar en canovera.ioon.mx
```

Nota: cuando el Git Commit SHA no cambia, Coolify salta el build y solo hace rolling update. Si el archivo no cambió realmente, dice "nothing to commit".

---

## Archivos generados en esta sesión

| Archivo | Descripción |
|:---|:---|
| `canovera-prototype.jsx` | Primer prototipo (preview en Claude) |
| `App.jsx` (v1) | Nav con scroll + IDs en secciones |
| `App.jsx` (v2 / App_2.jsx) | Responsive + hamburguesa |
| `App.jsx` (v3 / App_3.jsx) | Swipe + thumbnails clickeables |
| `cano-vera_v1.tar.gz` | Proyecto completo empaquetado |
| `demo-arquitectura-1_plantilla.md` | Documentación de la plantilla genérica + prompt para catálogo |

---

## Pendientes

- [ ] SSL: verificar certificado en canovera.ioon.mx
- [ ] Imágenes reales: reemplazar Unsplash por fotos de los proyectos de CANO|VERA (de Instagram @canito27 o de ArchDaily)
- [ ] Path vs subdominio: si se quiere servir en `ioon.mx/cano-vera_v1`, investigar configuración de Traefik path prefix en Coolify o montar un reverse proxy manual
- [ ] Catálogo de demos: montar landing en `ioon.mx/catálogo/` que indexe todos los demos por nicho
- [ ] Contenido genérico: el `demo-arquitectura-1_plantilla.md` tiene el contenido genérico listo para sustituir en el App.jsx y publicar como demo público
- [ ] Mejoras UX: transiciones de slide en hero, animación por scroll, página individual por proyecto, formulario de contacto con n8n webhook
- [ ] Migración a Astro: para producción final (SEO/SSG), convertir el componente React en isla de Astro

---

## Contexto comercial

Este prototipo forma parte del producto **"Websites para Arquitectos"** de ioon. El modelo de negocio es:

1. Mostrar demo funcional al prospecto (canovera.ioon.mx)
2. Si le gusta, personalizar contenido (textos, imágenes, colores, tipografía)
3. Desplegar en dominio del cliente o subdominio de ioon
4. Entregar en días, no semanas

El sitio de CANO|VERA es especialmente potente como demo porque:
- Su sitio actual está caído/lento
- Tienen Holcim Gold y Emerging Voices — alto perfil
- La información pública disponible es abundante (ArchDaily, Architectural League, Inhabitat)

---

*Generado: 20 de abril 2026, 11:30 hrs*
