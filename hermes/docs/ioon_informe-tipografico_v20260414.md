# ioon.mx — Informe tipográfico (v20260414)

> Este archivo documenta el estado actual de la tipografía en ioon.mx, los problemas resueltos el 14 de abril de 2026, y las instrucciones para modificar la configuración tipográfica en el futuro.

---

## 1. Resumen del problema

El 14 de abril de 2026, al desplegar la presentación "Matriz de Identidad de Marca" de Serclin en ioon.mx, se detectaron dos problemas tipográficos:

### Problema A: Tailwind sobreescribía Space Grotesk
Tailwind CSS 4 define internamente una variable `--default-font-family` que se aplica a todos los elementos via su capa de preflight (reset CSS). Esta variable apuntaba a la pila genérica de Tailwind (`ui-sans-serif, system-ui, sans-serif...`), ignorando la configuración de `--font-sans` en el bloque `@theme` de `global.css`.

**Solución aplicada:**
1. Se agregó `--default-font-family: 'Space Grotesk', system-ui, sans-serif;` al bloque `@theme` en `global.css`
2. Se agregó un override global `*, *::before, *::after { font-family: var(--font-sans) !important; }` para garantizar que ningún componente de Tailwind pueda sobreescribir la fuente

### Problema B: Los tamaños tipográficos no coincidían con las directrices
El viewer de presentaciones (`[slug].astro`) usaba clases genéricas de Tailwind (`text-2xl`, `text-3xl`, `leading-relaxed`) cuyos valores predeterminados no coincidían con la escala tipográfica definida en las directrices de diseño de ioon.

**Solución aplicada:**
Se reemplazaron todas las clases genéricas por valores arbitrarios de Tailwind (con corchetes), usando los valores exactos de las directrices:

| Antes (genérico) | Después (exacto) | Valor real |
|---|---|---|
| `text-2xl md:text-3xl` | `text-[clamp(22px,3vw,34px)]` | 22-34px responsive |
| `text-xl md:text-2xl` | `text-[clamp(18px,2.2vw,26px)]` | 18-26px responsive |
| `text-base md:text-lg` | `text-[16px]` | 16px fijo |
| `text-xs tracking-[0.3em]` | `text-[13px] tracking-[3px]` | 13px, 3px spacing |
| `leading-relaxed` | `leading-[1.7]` | line-height 1.7 |
| `tracking-tight` | `tracking-[-1px]` | -1px letter-spacing |
| `max-w-2xl` | `max-w-[680px]` | 680px máximo |
| `max-w-4xl` | `max-w-[900px]` | 900px máximo |

---

## 2. Arquitectura actual de estilos

### Capa 1: `src/styles/global.css`
Define las bases del diseño. Tres secciones relevantes:

**`@theme` block** — Variables CSS que Tailwind lee para generar utilidades:
```css
@theme {
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --default-font-family: 'Space Grotesk', system-ui, sans-serif;
  --color-ink: #0a0a0a;
  --color-paper: #fafafa;
  /* ... */
}
```

**`@font-face`** — Carga la fuente (actualmente variable font de Florian Karsten):
```css
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('https://floriankarsten.github.io/space-grotesk/fonts/SpaceGrotesk%5Bwght%5D.woff2') format('woff2');
}
```

**Override global** — Garantiza que la fuente se aplique a todo:
```css
*,
*::before,
*::after {
  font-family: var(--font-sans) !important;
}
```

### Capa 2: Tailwind CSS 4
Genera utilidades como `font-light` (weight 300), `uppercase`, `mb-4` (margin-bottom 16px). Se importa en la primera línea de `global.css`:
```css
@import "tailwindcss";
```

Tailwind lee las variables de `@theme` para generar sus clases. Cuando usamos `text-[clamp(22px,3vw,34px)]` (con corchetes), Tailwind genera una clase CSS con ese valor exacto sin interpretarlo.

### Capa 3: `src/pages/presentaciones/[slug].astro`
El template que renderiza las presentaciones. Aquí se aplican las clases de Tailwind a cada elemento. Es donde se controla la jerarquía tipográfica específica de cada tipo de slide.

### Capa 4: `src/layouts/Base.astro`
El HTML base. Importa `global.css` y no tiene estilos propios. No tocar.

### Orden de prioridad (de menor a mayor)
1. Tailwind preflight (reset)
2. `@theme` variables
3. `global.css` reglas (`html {}`, `@font-face`)
4. `*, *::before, *::after { font-family !important }` (override)
5. Clases de Tailwind en los templates
6. Estilos inline (`style=""`)

---

## 3. Estado actual de la tipografía

### Fuente activa: Space Grotesk (Variable Font, Florian Karsten)
- **Archivo:** `SpaceGrotesk[wght].woff2` (un solo archivo, ~50KB)
- **CDN:** `https://floriankarsten.github.io/space-grotesk/fonts/`
- **Pesos disponibles:** 300 a 700 (continuo, variable)
- **Ventaja:** Un solo request HTTP, pesos intermedios posibles
- **Renderizado:** Hinting propio de Florian Karsten, ligeramente diferente a Google Fonts

### Escala tipográfica implementada en `[slug].astro`

| Elemento | Clase Tailwind | Resultado |
|---|---|---|
| Heading title/concept | `text-[clamp(32px,5vw,56px)] font-light leading-[1.15] tracking-[-1px]` | 32-56px, weight 300, -1px spacing |
| Heading slide | `text-[clamp(22px,3vw,34px)] font-light tracking-[-0.5px]` | 22-34px, weight 300, -0.5px spacing |
| Heading L3 | `text-[clamp(18px,2.2vw,26px)] font-light tracking-[-0.5px]` | 18-26px, weight 300, -0.5px spacing |
| Body | `text-[16px] font-light leading-[1.7] text-[--color-accent]` | 16px, weight 300, lh 1.7, color #18181b |
| Bullets | `text-[15px] font-light leading-[1.6] text-[--color-accent]` | 15px, weight 300, lh 1.6 |
| Overline | `text-[13px] font-normal tracking-[3px] uppercase text-[--color-muted]` | 13px, weight 400, 3px spacing |
| Section label | `text-[11px] font-normal tracking-[2px] uppercase text-[--color-muted]` | 11px, weight 400, 2px spacing |
| Quote | `text-[clamp(20px,3vw,30px)] font-light leading-[1.5] italic` | 20-30px, weight 300, lh 1.5 |
| Attribution | `text-[14px] font-normal text-[--color-muted]` | 14px, weight 400 |
| Tabs L3 | `text-[13px] font-normal` / `font-medium` (activo) | 13px, weight 400/500 |
| Subheading concept | `text-[clamp(22px,3vw,34px)] font-light tracking-[-0.5px] text-[--color-muted]` | 22-34px, weight 300, color muted |
| Max-width cuerpo | `max-w-[680px]` | 680px |
| Max-width slide | `max-w-[900px]` | 900px |

### Clases de Tailwind que SÍ coinciden con las directrices (se usan tal cual)
- `font-light` = `font-weight: 300` ✓
- `font-normal` = `font-weight: 400` ✓
- `font-medium` = `font-weight: 500` ✓
- `uppercase` = `text-transform: uppercase` ✓
- `italic` = `font-style: italic` ✓

---

## 4. Space Grotesk: Google Fonts vs Florian Karsten

### Google Fonts (estática)
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
- **Archivos:** Varios archivos `.woff2`, uno por peso (300, 400, 500, 600, 700)
- **Hinting:** Optimizado por Google para pantalla, incluye auto-hinting adicional
- **Subsets:** Solo latin por defecto (más ligero)
- **Renderizado:** Ligeramente más grueso/definido en tamaños pequeños
- **Caché:** Altamente cacheado en navegadores (CDN de Google)

### Florian Karsten (variable font)
```css
@font-face {
  font-family: 'Space Grotesk';
  font-weight: 300 700;
  src: url('https://floriankarsten.github.io/space-grotesk/fonts/SpaceGrotesk%5Bwght%5D.woff2') format('woff2');
}
```
- **Archivo:** Un solo `.woff2` variable (~50KB)
- **Hinting:** Hinting original del diseñador
- **Subsets:** Charset completo
- **Renderizado:** Ligeramente más fino/editorial en tamaños pequeños
- **Ventaja:** Pesos intermedios (ej: 350), un solo request HTTP

### Diferencias visibles
A un tamaño de 56px la diferencia es casi imperceptible. A 13-16px hay una diferencia sutil pero detectable por un ojo entrenado:
- Google Fonts se ve marginalmente más ancha y definida
- Florian Karsten se ve marginalmente más fina y editorial

### Cuál usar
- **Florian Karsten** (actual): Más coherente con la estética editorial de ioon. Un solo archivo. Recomendada.
- **Google Fonts**: Si se necesita máxima compatibilidad o consistencia con otros sitios que usen Space Grotesk desde Google.

---

## 5. Instrucciones para cambiar de fuente

### Cambiar a Google Fonts
En `src/styles/global.css`, reemplazar el bloque `@font-face` (líneas 16-22) por:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### Volver a Florian Karsten
En `src/styles/global.css`, reemplazar el `@import` de Google por:
```css
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('https://floriankarsten.github.io/space-grotesk/fonts/SpaceGrotesk%5Bwght%5D.woff2') format('woff2');
}
```

En ambos casos, no se necesita cambiar nada más. El `@theme`, el override `!important` y las clases en `[slug].astro` funcionan igual con cualquiera de las dos fuentes.

### Después de cambiar
```bash
cd ~/Documents/0_ioon/-0_ioon
git add .
git commit -m "font: cambiar a [Google Fonts / Florian Karsten]"
git push origin main
```
Y hacer Redeploy en Coolify si el auto-deploy no se activa.

---

## 6. Commits relevantes (14 de abril 2026)

| Commit | Descripción |
|---|---|
| `122c78c` | Tipografía exacta según directrices ioon (valores arbitrarios de Tailwind) |
| `ea1bf44` | Agregar `--default-font-family` al `@theme` |
| `3d089a7` | Override global `!important` para Space Grotesk |

---

## 7. Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/styles/global.css` | `--default-font-family`, `--default-mono-font-family`, override `!important` |
| `src/pages/presentaciones/[slug].astro` | Todas las clases tipográficas cambiadas de genéricas a exactas |

---

## 8. Decisión actual

**Se usa Space Grotesk variable font de Florian Karsten** por su carácter más editorial y su eficiencia (un solo archivo). La diferencia con Google Fonts es sutil pero real, y la variable font es más apropiada para la estética de ioon.

La tipografía está controlada en tres puntos:
1. **`global.css`** — qué fuente se carga y cómo se aplica globalmente
2. **`[slug].astro`** — qué tamaño, peso y espaciado tiene cada elemento
3. **Directrices de diseño** (`ioon-directrices-diseno_20260413.md`) — la referencia absoluta

Cualquier cambio tipográfico futuro debe verificarse contra las directrices y aplicarse en `[slug].astro` usando valores arbitrarios de Tailwind (corchetes), no clases genéricas.
