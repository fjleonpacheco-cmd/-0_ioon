# ioon.mx — Informe tipográfico (v20260415)

> Estado actual de la tipografía en ioon.mx después de los ajustes del 14 de abril de 2026. Adjuntar a chats futuros como referencia.

---

## 1. Decisión vigente

**Space Grotesk variable font de Florian Karsten** — por su carácter editorial y eficiencia (un solo archivo woff2). La diferencia con Google Fonts es sutil pero real: Florian Karsten rinde más fino/editorial a tamaños pequeños (13-16px), Google Fonts rinde más grueso/definido.

---

## 2. Problemas resueltos

### Tailwind sobreescribía Space Grotesk
Tailwind CSS 4 define `--default-font-family` que ignoraba `--font-sans`. Se resolvió con:
1. `--default-font-family: 'Space Grotesk', system-ui, sans-serif;` en `@theme`
2. Override global `*, *::before, *::after { font-family: var(--font-sans) !important; }`

### Tamaños genéricos no coincidían con directrices
Se reemplazaron TODAS las clases genéricas de Tailwind por valores arbitrarios con corchetes.

---

## 3. Arquitectura de estilos (3 capas)

**Capa 1 — `src/styles/global.css`:** Variables CSS, @font-face, override global
**Capa 2 — Tailwind CSS 4:** Utilidades con valores arbitrarios (corchetes)
**Capa 3 — `src/pages/presentaciones/[slug].astro`:** Clases aplicadas a cada elemento

Prioridad: Tailwind preflight < @theme < global.css < override !important < clases Tailwind < style inline

---

## 4. Escala tipográfica implementada

| Elemento | Clases Tailwind exactas | Resultado |
|---|---|---|
| Heading title/concept | `text-[clamp(32px,5vw,56px)] font-light leading-[1.15] tracking-[-1px]` | 32-56px, w300, -1px |
| Heading slide (h2/h3) | `text-[clamp(22px,3vw,34px)] font-light tracking-[-0.5px]` | 22-34px, w300, -0.5px |
| Heading L3 (h4) | `text-[clamp(18px,2.2vw,26px)] font-light tracking-[-0.5px]` | 18-26px, w300, -0.5px |
| Subheading concept | `text-[clamp(22px,3vw,34px)] font-light tracking-[-0.5px] text-[--color-muted]` | 22-34px, w300, muted |
| Body | `text-[16px] font-light leading-[1.7] text-[--color-accent]` | 16px, w300, lh 1.7 |
| Bullets | `text-[15px] font-light leading-[1.6] text-[--color-accent]` | 15px, w300, lh 1.6 |
| Overline | `text-[13px] font-normal tracking-[3px] uppercase text-[--color-muted]` | 13px, w400, 3px |
| Section label | `text-[11px] font-normal tracking-[2px] uppercase text-[--color-muted]` | 11px, w400, 2px |
| Quote | `text-[clamp(20px,3vw,30px)] font-light leading-[1.5] italic` | 20-30px, w300, italic |
| Attribution | `text-[14px] font-normal text-[--color-muted]` | 14px, w400 |
| Tabs L3 inactivo | `text-[13px] font-normal` | 13px, w400 |
| Tabs L3 activo | `text-[13px] font-medium` | 13px, w500 |
| Max-width cuerpo | `max-w-[680px]` | 680px |
| Max-width slide | `max-w-[900px]` | 900px |

### Clases de Tailwind que coinciden con directrices (se usan tal cual)
`font-light` = 300 ✓ | `font-normal` = 400 ✓ | `font-medium` = 500 ✓ | `uppercase` ✓ | `italic` ✓

---

## 5. V-dots de navegación

- Diámetro: 8×8px (`w-[8px] h-[8px]`)
- Gap: 9px (`gap-[9px]`)
- Border: 1px solid muted (via `style` inline, no Tailwind — porque Tailwind sobreescribía)
- Activo: relleno ink, border ink
- Hover: relleno ink via JavaScript (`mouseenter`/`mouseleave`)
- Rollover label: `group-hover:opacity-100` con clase `group` en el botón
- Posición: `left-[20px]` desktop, `left-[8px]` mobile

---

## 6. global.css — bloques clave

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --default-font-family: 'Space Grotesk', system-ui, sans-serif;
  --color-ink: #0a0a0a;
  --color-paper: #fafafa;
  --color-muted: #71717a;
  --color-accent: #18181b;
  --color-border: #e4e4e7;
  --color-highlight: #d4d4d8;
  --default-mono-font-family: 'Space Grotesk', system-ui, sans-serif;
  --default-font-feature-settings: normal;
}

@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('https://floriankarsten.github.io/space-grotesk/fonts/SpaceGrotesk%5Bwght%5D.woff2') format('woff2');
}

html {
  font-family: var(--font-sans);
  color: var(--color-ink);
  background: var(--color-paper);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*, *::before, *::after {
  font-family: var(--font-sans) !important;
}
```

---

## 7. Cambiar de fuente

### A Google Fonts
Reemplazar `@font-face` por:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### A Florian Karsten (actual)
```css
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('https://floriankarsten.github.io/space-grotesk/fonts/SpaceGrotesk%5Bwght%5D.woff2') format('woff2');
}
```

No se necesita cambiar nada más.

---

## 8. Regla general para futuros ajustes

- Si el valor de Tailwind coincide exactamente con la directriz → usa la clase (`font-light`)
- Si NO coincide → usa corchetes con valor exacto (`text-[clamp(22px,3vw,34px)]`)
- Si Tailwind sobreescribe algo (como border de dots) → usa `style` inline
- Si hover no funciona con `group-hover:` y variables CSS → usa JavaScript
- Nunca usar scripts Python para editar archivos .astro — generar archivo completo
