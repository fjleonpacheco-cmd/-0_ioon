# ioon.mx — Contexto para experimentación tipográfica

> Adjunta este archivo al inicio de un nuevo chat para continuar el trabajo de ajuste tipográfico del viewer de presentaciones de ioon.mx.

---

## 1. Quién es ioon

ioon es un estudio de innovación en Oaxaca, México, dirigido por Francisco León.

- Sitio: https://ioon.mx
- Repo: https://github.com/fjleonpacheco-cmd/-0_ioon
- Repo local (Mac): `~/Documents/0_ioon/-0_ioon`
- Deploy: Docker + Nginx via Coolify en Hetzner VPS. Push a `main` = redeploy automático.

---

## 2. Stack técnico

- **Astro 5** — framework estático (genera HTML en build time)
- **Tailwind CSS 4** — framework de utilidades CSS con variables custom
- **Space Grotesk** — tipografía única (cargada desde Florian Karsten CDN)
- La tipografía se define en `src/styles/global.css` con `@font-face` y variables CSS
- El viewer de presentaciones está en `src/pages/presentaciones/[slug].astro`

---

## 3. El problema a resolver

Existen dos formas de ver las presentaciones:

### Preview HTML local (`serclin_matriz-de-identidad_01.html`)
- Archivo HTML standalone que se abre directo en el navegador
- CSS propio con valores exactos según las directrices de diseño de ioon
- Se ve exactamente como quiero
- No es parte del deploy — es solo para revisión local

### Viewer Astro (`[slug].astro` en ioon.mx)
- Template Astro que renderiza TODAS las presentaciones desde `config.json`
- Usa clases de Tailwind para estilos
- La tipografía NO coincide con el preview HTML porque Tailwind usa valores genéricos predefinidos que no son los mismos que mis directrices

### Objetivo
Hacer que el viewer Astro respete exactamente las mismas reglas tipográficas que el preview HTML, usando Tailwind con valores arbitrarios (corchetes).

---

## 4. Directrices tipográficas de ioon (la referencia absoluta)

### Fuente única: Space Grotesk
- Pesos: 300 (Light), 400 (Regular), 500 (Medium)
- Fallback: `system-ui, sans-serif`
- El peso dominante es 300. Casi todo el texto visible es light.
- 400 se usa para labels y UI. 500 solo para tabs activos.

### Escala tipográfica en presentaciones

| Elemento | Tamaño | Peso | Tracking | Line-height |
|----------|--------|------|----------|-------------|
| Heading principal (title, concept) | `clamp(32px, 5vw, 56px)` | 300 | `-1px` | 1.15 |
| Heading de slide (h2) | `clamp(22px, 3vw, 34px)` | 300 | `-0.5px` | — |
| Heading L3 (sub-tab) | `clamp(18px, 2.2vw, 26px)` | 300 | `-0.5px` | — |
| Subheading en concept | `clamp(22px, 3vw, 34px)` | 300 | `-0.5px` | — |
| Body / párrafos | `16px` – `17px` | 300 | normal | 1.7 |
| Bullets (li) | `15px` | 300 | normal | 1.6 |
| Overline | `13px` | 400 | `3px` | — |
| Section label | `11px` | 400 | `2px` | — |
| Quote (blockquote) | `clamp(20px, 3vw, 30px)` | 300 | normal | 1.5 |
| Cite / atribución | `14px` | 400 | normal | — |
| Tabs L3 | `13px` | 400 (500 activo) | normal | — |
| Nav arrows | `14px` | inherit | normal | — |

### Reglas tipográficas
- **Letter-spacing negativo** en headings (−0.5px a −1px) = carácter editorial
- **Letter-spacing positivo** en overlines y labels (2px–3px) siempre en uppercase
- **Máximo ancho de párrafo:** 680px
- **Máximo ancho de contenedor de slide:** 900px
- Listas: punto circular de 4px en color `muted`, no viñetas estándar del navegador

### Paleta de color

| Token | Hex | Uso |
|-------|-----|-----|
| `ink` | `#0a0a0a` | Texto principal |
| `paper` | `#fafafa` | Fondo |
| `muted` | `#71717a` | Texto secundario, overlines, labels |
| `accent` | `#18181b` | Cuerpo de texto (body, bullets) |
| `border` | `#e4e4e7` | Líneas divisorias |
| `highlight` | `#d4d4d8` | Elementos terciarios |

---

## 5. Tailwind: valores genéricos vs valores exactos

### El conflicto

Tailwind tiene clases predefinidas con valores fijos. Cuando no coinciden con mis directrices, la tipografía se ve diferente.

### Tabla de conversión: mi directriz → Tailwind genérico → Tailwind exacto

| Mi directriz | Tailwind genérico | Valor real de Tailwind | Tailwind exacto (corchetes) |
|---|---|---|---|
| `clamp(32px,5vw,56px)`, w300, sp -1px | `text-5xl font-light tracking-tight` | 48px, 300, -0.025em | `text-[clamp(32px,5vw,56px)] font-light tracking-[-1px] leading-[1.15]` |
| `clamp(22px,3vw,34px)`, w300, sp -0.5px | `text-2xl md:text-3xl font-light` | 24px/30px, 300, normal | `text-[clamp(22px,3vw,34px)] font-light tracking-[-0.5px]` |
| `clamp(18px,2.2vw,26px)`, w300, sp -0.5px | `text-xl md:text-2xl font-light` | 20px/24px, 300, normal | `text-[clamp(18px,2.2vw,26px)] font-light tracking-[-0.5px]` |
| `16px`, w300, lh 1.7 | `text-base font-light leading-relaxed` | 16px, 300, 1.625 | `text-[16px] font-light leading-[1.7]` |
| `15px`, w300, lh 1.6 | `text-sm font-light` | 14px, 300, normal | `text-[15px] font-light leading-[1.6]` |
| `13px`, w400, sp 3px, uppercase | `text-xs uppercase tracking-[0.3em]` | 12px, normal, 0.3em | `text-[13px] font-normal tracking-[3px] uppercase` |
| `11px`, w400, sp 2px, uppercase | `text-[11px] uppercase tracking-[2px]` | (no hay clase predefinida) | `text-[11px] font-normal tracking-[2px] uppercase` |
| `clamp(20px,3vw,30px)`, w300, lh 1.5, italic | `text-2xl md:text-3xl font-light italic` | 24px/30px, 300, normal | `text-[clamp(20px,3vw,30px)] font-light leading-[1.5] italic` |
| `14px`, w400 | `text-sm font-normal` | 14px, 400 | `text-[14px] font-normal` |
| `13px`, w400 (w500 activo) | `text-xs` | 12px | `text-[13px] font-normal` / `text-[13px] font-medium` |

### Regla general
- Si el valor de Tailwind coincide exactamente con tu directriz → usa la clase de Tailwind (ej: `font-light` = 300 ✓)
- Si NO coincide → usa corchetes con tu valor exacto (ej: `text-[clamp(22px,3vw,34px)]` en vez de `text-2xl`)

---

## 6. Referencias de Tailwind CSS

Documentación oficial (v4):

- **Font size:** https://tailwindcss.com/docs/font-size
- **Font weight:** https://tailwindcss.com/docs/font-weight
- **Letter spacing:** https://tailwindcss.com/docs/letter-spacing
- **Line height:** https://tailwindcss.com/docs/line-height
- **Max width:** https://tailwindcss.com/docs/max-width
- **Padding/Margin:** https://tailwindcss.com/docs/padding
- **Valores arbitrarios:** https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values
- **Responsive (breakpoints):** https://tailwindcss.com/docs/responsive-design

Tailwind 4 usa `@theme` en CSS para definir variables. Tu `global.css` ya tiene las variables de color configuradas.

---

## 7. Ejercicio: crear 3 archivos comparativos

Para el chat de experimentación, genera 3 archivos HTML standalone (sin Astro, sin build) que muestren la misma presentación de Serclin con los mismos datos pero diferentes estilos:

### Archivo 1: `comparar-directriz.html`
- CSS propio con los valores exactos de las directrices de ioon
- Es el que se ve como quiero (ya existe como `serclin_matriz-de-identidad_01.html`)

### Archivo 2: `comparar-tailwind-generico.html`
- Usa Tailwind vía CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Usa SOLO clases predefinidas de Tailwind (`text-2xl`, `font-light`, `tracking-tight`)
- Muestra cómo se ve con los valores por defecto de Tailwind

### Archivo 3: `comparar-tailwind-exacto.html`
- Usa Tailwind vía CDN
- Usa clases de Tailwind con valores arbitrarios en corchetes (`text-[clamp(22px,3vw,34px)]`, `tracking-[-0.5px]`)
- Debería verse idéntico al Archivo 1

El objetivo es abrir los 3 archivos en el navegador, compararlos lado a lado, y confirmar que el Archivo 3 coincide con el Archivo 1. Una vez confirmado, esos mismos valores se llevan al `[slug].astro`.

---

## 8. Slides a incluir en la comparación

Usa al menos estos 4 tipos de slide para cubrir todos los estilos:

1. **title** — Portada con overline, heading grande, subheading
2. **text con L3** — Heading, body, tabs con contenido
3. **concept** — Heading grande en itálicas, subheading muted, body
4. **text simple** — Heading y body (como Contexto)

Datos de ejemplo del `config.json` de Serclin:

```json
{
  "type": "title",
  "overline": "ioon × Serclin",
  "headingHtml": "<b>MATRIZ DE IDENTIDAD DE MARCA</b>",
  "subheading": "Desarrollo de marca — Abril 2026"
}
```

```json
{
  "type": "text",
  "heading": "Contexto",
  "bodyHtml": "México se ha consolidado como el epicentro de las tiendas departamentales en Latinoamérica, un mercado donde el espacio físico ha dejado de ser un simple punto de transacción para convertirse en el <b>escenario crítico de la experiencia de marca</b>."
}
```

```json
{
  "type": "concept",
  "headingHtml": "<i>\"El <b>cuidado</b> absoluto es la forma más alta de la <b>hospitalidad</b>.\"</i>",
  "subheading": "Verdad Inmutable",
  "bodyHtml": "Es nuestra \"estrella polar\", aquello que no cambia aunque la empresa se digitalice, use robots o se expanda a otros países."
}
```

---

## 9. Archivos relevantes del repo

| Archivo | Qué hace | Qué modificar |
|---------|----------|---------------|
| `src/styles/global.css` | Variables CSS, @font-face, estilos base | Generalmente no tocar |
| `src/layouts/Base.astro` | HTML base (head, body), importa global.css | No tocar |
| `src/pages/presentaciones/[slug].astro` | El viewer — renderiza todas las presentaciones | **Aquí van los cambios tipográficos** |
| `src/content/presentaciones/*/config.json` | Datos de cada presentación | No tocar (contenido, no estilos) |

---

## 10. Estado actual

- El viewer actual (`[slug].astro`) ya soporta slides `concept` y `headingHtml`
- La presentación de Serclin está live en `ioon.mx/presentaciones/serclin-3_matriz-de-identidad-de-marca/`
- El build pasa correctamente en Coolify
- **Pendiente:** ajustar las clases de Tailwind genéricas por valores exactos de las directrices

---

## 11. Instrucciones para el chat

1. Primero genera los 3 archivos comparativos (directriz, tailwind genérico, tailwind exacto)
2. Yo los abro en local, los comparo, y confirmo que el archivo 3 se ve como quiero
3. Una vez aprobado, aplica esos mismos valores al `[slug].astro`
4. Me das el archivo completo para que yo haga:
```bash
cd ~/Documents/0_ioon/-0_ioon
cp ~/Downloads/NOMBRE_ARCHIVO 'src/pages/presentaciones/[slug].astro'
git add .
git commit -m "descripción del cambio"
git push origin main
```

No uses scripts de Python para modificar archivos. Siempre genera el archivo completo.
