---
proyecto: 8. ioon
subtema: 8.7 catalogo
version: v20260504-1233
autor: Francisco Javier León Pacheco
nivel: subtema · brief de integración
estado: invalidado-por-marco-v4 — recreado como histórico. El componente sustentante (LiquidTextWebGL.jsx con OGL) está pendiente de reescritura con R3F+drei. Ver ioon_8-4-13_v20260511-1139 §6.1.
proposito: brief de integración del paso 1 (LiquidTextWebGL en el heading del hero del catálogo). Materializa la decisión técnica tomada en chat fjlp 1.4.1, asume Ruta B (WebGL) para texto líquido, y deja registrados los pendientes de actualización en 8.4 / 8.5.
depende_de:
  - ioon_catalogo_v20260420-1115 (documentación del catálogo)
  - ioon_8-4-2_planeacion-tecnica_biblioteca-efectos-visuales-requerimientos_v20260504-1233 (requerimientos — superado por Marco v4)
  - ioon_8-5-2_stack_biblioteca-efectos-visuales-implementacion_v20260504-1233 (shortlist — superada por Marco v4)
  - fjlp_1-4-1-6_fichas-de-referencias_ficha-website-davide-perozzi-2k19_v20260503-2102 (referencia que origina la propuesta)
artefactos:
  - LiquidTextWebGL.jsx (componente; se copia a `catalogo-ioon/src/lib/LiquidTextWebGL.jsx`) — versión OGL invalidada; pendiente reescritura R3F+drei
---

# Paso 1 — `LiquidTextWebGL` en el heading del hero del catálogo

> **Nota histórica (mayo 11 2026):** este brief refleja la decisión Ruta B (WebGL via OGL) tomada el 04-may. El Marco v4 (`ioon_8-4-2_v20260511-1115`) canoniza R3F+drei como motor WebGL del estudio, lo que **invalida la implementación basada en OGL** descrita aquí. Se conserva como historia. La acción correctiva (reescribir el componente manteniendo API pública pero migrando internals OGL → R3F+drei) está registrada en `ioon_8-4-13_v20260511-1139` §6.1.

Brief operativo para integrar el primer componente de la biblioteca interna `ioon-effects` en `catalogo.ioon.mx`. Trabajo decidido en chat **fjlp 1.4.1 fichas-de-referencias** a partir del análisis de Davide Perozzi 2k19. Este documento traslada la decisión a 8.7.

## 1. Decisiones que entran ya cerradas

- **Efecto:** texto líquido (deformación tipográfica sutil mediante ruido simplex procedural).
- **Ruta técnica:** **B — WebGL con OGL**. Se descarta SVG `<feTurbulence>` para esta primera implementación. La ruta SVG queda como `<LiquidText>` clásico — alterno disponible en futuro, no se construye ahora.
- **Tipo de mapa de ruido:** procedural (escrito en GLSL dentro del shader). **No se usa PNG todavía** (ver pendiente §6).
- **Sitio donde se prueba:** `catalogo.ioon.mx`, heading del hero.
- **Copy:** rotativo, 4 frases (ver §3).
- **Dónde vive el componente al inicio:** **inline en el repo del catálogo** (`catalogo-ioon/src/lib/`). Refactor a `packages/ioon-effects/` cuando paso 2 (transición de imagen en demo-arquitectura-1) lo requiera.

## 2. Stack y dependencias

- Repo: `fjleonpacheco-cmd/-0_ioon`, carpeta `/catalogo-ioon`.
- Stack actual: Vite + React 18, sin librerías externas.
- Nueva dependencia: **`ogl`** (~50 KB gzipped, MIT, mantenedor activo).

## 3. Las 4 frases (rotación cada 4.5 s)

Tono editorial alineado con identidad ioon ("editorial, silencioso y preciso"). Conservan la voz del catálogo, evitan jerga marketing, varían en longitud sin desbalancear el ritmo:

1. `Sitios web listos para personalizar y lanzar` — ancla, idéntica al copy actual.
2. `Hechos para tu marca, no para tu industria`
3. `Diseño de autor, ejecución automatizada`
4. `Sin plantillas. Puntos de partida.`

Estas frases son **propuestas cerradas para validar en 8.9 tono-de-voz-y-copy**. Si 8.9 las ajusta, se cambian sólo en el array; el componente no se toca.

## 4. Pasos de integración (cada uno listo para ejecutar)

### 4.1 Instalar la dependencia

```bash
cd ~/Documentos/0_ioon/-0_ioon/catalogo-ioon
npm install ogl
```

### 4.2 Copiar el componente al repo

Desde `/outputs` de esta sesión, copiar el archivo `LiquidTextWebGL.jsx` a:

```
catalogo-ioon/src/lib/LiquidTextWebGL.jsx
```

Crear la carpeta `src/lib/` si no existe. Esta es la ubicación inicial; cuando paso 2 lo demande, se mueve a `packages/ioon-effects/src/`.

### 4.3 Importarlo y reemplazar el heading actual del hero en `App.jsx`

En el `<h1>` del hero (sección §5.4 punto 2 de `ioon_catalogo_v20260420-1115`), el código actual se ve aproximadamente así:

```jsx
<h1
  className="hero-h1"
  style={{
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 300,
    letterSpacing: "-1px",
    color: C.ink,
    margin: 0,
    lineHeight: 1.1,
  }}
>
  Sitios web listos para personalizar y lanzar
</h1>
```

Se reemplaza por:

```jsx
<LiquidTextWebGL
  texts={[
    "Sitios web listos para personalizar y lanzar",
    "Hechos para tu marca, no para tu industria",
    "Diseño de autor, ejecución automatizada",
    "Sin plantillas. Puntos de partida.",
  ]}
  color={C.ink}
  containerHeight="clamp(96px, 12vw, 160px)"
/>
```

Y agregar al inicio del archivo:

```jsx
import LiquidTextWebGL from "./lib/LiquidTextWebGL";
```

### 4.4 Probar local

```bash
npm run dev
```

Validar:

- Heading se ve estable, con ondulación apenas perceptible.
- Cada ~4.5 s rota a la siguiente frase.
- En DevTools: el `<canvas>` está dentro de un wrapper relativo y un `<h1>` invisible para accesibilidad.
- Probar `prefers-reduced-motion: reduce` (DevTools → Rendering → Emulate CSS media feature) — el componente debe degradarse a `<h1>` plano sin animación.
- Probar deshabilitando WebGL (DevTools → Rendering → "Disable WebGL") — mismo fallback.

### 4.5 Push y deploy

```bash
cd ~/Documentos/0_ioon/-0_ioon
git add .
git commit -m "catalogo: paso 1 - LiquidTextWebGL en hero (ioon-effects)"
git push origin main
```

Coolify redespliega automáticamente.

## 5. Knobs disponibles en el componente

Para tuning sin tocar shader:

| Prop | Default | Rango sugerido | Nota |
|---|---|---|---|
| `texts` | — | 1+ strings | Si es 1, no rota. Si es array, rota. |
| `interval` | `4500` | 3000–8000 | ms entre rotaciones. |
| `intensity` | `0.012` | 0.005–0.04 | Amplitud del desplazamiento. >0.04 ya es agresivo. |
| `scale` | `3.0` | 1.5–6.0 | Frecuencia espacial del ruido (más alto = más "patrones chicos"). |
| `speed` | `0.25` | 0.05–1.0 | Qué tan rápido se mueve el ruido. |
| `color` | `#fafafa` | — | Color del texto. Pasar `C.ink` del catálogo. |
| `fontFamily` | Space Grotesk | — | Default coincide con la fuente del catálogo. |
| `fontWeight` | `300` | — | Default coincide con la directriz ioon. |
| `letterSpacing` | `-1px` | — | Default coincide con el heading actual. |
| `containerHeight` | `clamp(96px, 12vw, 160px)` | — | Alto del bloque; define cuánto espacio ocupa. |

Empezamos con todos los defaults excepto `texts`, `color`, `containerHeight`. Si después de ver en producción se siente fuerte o débil, se ajusta `intensity` y `speed` en pasos de 0.05 y 0.05 respectivamente.

## 6. Pendientes registrados (acción necesaria fuera de este sub-chat)

### 6.1 Actualizar `ioon_8-4-2` (planeación-técnica)

El doc original asume **Ruta A SVG** como paso 1. Con la decisión Ruta B WebGL, hay que reflejar:

- §3 (mapeo): texto líquido → demo de prueba sigue siendo catálogo, pero la implementación es WebGL (OGL), no SVG.
- §8 (orden de adopción): paso 1 ya no es "cero librería"; ahora es "alta de OGL como dependencia + primer componente del paquete".

Acción: pegar este `ioon_8-7-2` en chat 8.4 como input para emitir versión nueva del doc requerimientos (`v20260504-XXXX`).

### 6.2 Actualizar `ioon_8-5-2` (stack)

El doc shortlist tiene a OGL como **preferida**, pero "bloqueada hasta validar 8.4". Con la decisión cerrada, hay que:

- Emitir entrada en `ioon_8-5-9_stack_log-decisiones`: candidatas evaluadas, decisión final (OGL), descartadas (Pixi.js: bundle, hover-effect: mantenimiento, curtains.js: redundancia con OGL), criterio decisor (bundle ≤ 80 KB + estética alineada con cluster Awwwards 2018-2020 + control fino del shader).
- Mover OGL al inventario maestro `ioon_8-5-2_stack_inventario-maestro` con su ficha estándar (categoría nueva: "Producto / componentes web internos").

Acción: pegar este `ioon_8-7-2` en chat 8.5 como input para registrar la decisión.

### 6.3 Probar mapa de ruido tipo PNG (después)

Esta primera implementación usa **ruido simplex procedural en GLSL**. Cuando paso 2 (transición de imagen en `demo-arquitectura-1`) monte la biblioteca `_maps/` con texturas PNG, retomar texto líquido y comparar:

- Variante A: procedural (la actual, hoy en producción del catálogo).
- Variante B: PNG (humo / agua / papel / orgánico) cargado como uniform.

Decidir por preferencia visual cuál entra al paquete como default y cuál queda como opcional. Si la variante B aporta personalidad distintiva, se puede usar para diferenciar el catálogo de los demos (catálogo = procedural; demos clientes = PNG con mapa elegido).

**Recordatorio para chat 1.4.1 / 8.7:** retomar este pendiente cuando paso 2 esté listo y `_maps/` tenga al menos 3 texturas iniciales.

### 6.4 Actualizar directrices de identidad visual (8.10)

Las directrices actuales (v20260413) declaran "sin gradientes decorativos, animaciones ≤ 0.4 s". Con la adopción de WebGL displacement, hay que registrar **excepciones documentadas** para componentes de la familia `ioon-effects`:

- Excepción 1: gradientes/texturas WebGL permitidas dentro de componentes `ioon-effects`.
- Excepción 2: animaciones continuas (sin tope de 0.4 s) en componentes `ioon-effects`.
- Alcance: sólo dentro de los componentes; resto del sitio mantiene la regla.

Acción: pegar este `ioon_8-7-2` en chat 8.10 para emitir versión `v20260504-XXXX` de las directrices con anexo de excepciones.

### 6.5 Validar copy en 8.9

Las 4 frases de §3 son propuesta operativa, no aprobación final de tono. Pegar en 8.9 tono-de-voz-y-copy para revisión y posible ajuste; el componente no se toca, sólo el array.

## 7. Métricas a capturar en producción

Una vez en `catalogo.ioon.mx`:

- **Bundle real** del catálogo después del cambio (`npm run build` y mirar `dist/assets/*.js` gzipped). Esperado: <80 KB de aumento total.
- **FPS del hero** en MacBook (Chrome DevTools Performance) y en mobile (Safari + iPhone). Esperado: 60 fps desktop, ≥30 fps mobile.
- **Comportamiento del fallback**: confirmar que con WebGL deshabilitado o `prefers-reduced-motion` el heading sigue siendo legible y semántico.

Estas métricas se registran como entrada en `ioon_8-7-X_catalogo_log-cambios_v...` después del deploy, no antes.

## 8. Resumen ejecutivo (1 párrafo)

Se incorpora `LiquidTextWebGL` como primer componente de la biblioteca interna `ioon-effects`, instalado inline en `catalogo-ioon/src/lib/`, con una sola dependencia nueva (`ogl`, MIT, ~50 KB gzipped), reemplazando el `<h1>` del hero por un texto que rota entre 4 frases con deformación tipográfica sutil mediante shader de ruido simplex procedural. El componente respeta `prefers-reduced-motion`, tiene fallback automático a `<h1>` plano si WebGL falla, pausa render fuera del viewport (IntersectionObserver), y expone props para tunear intensidad, escala y velocidad. La decisión técnica viene de chat fjlp 1.4.1 (análisis Davide Perozzi 2k19), confirmada en respuesta del 04 mayo 2026; deja pendientes en 8.4 (actualizar requerimientos a Ruta B), 8.5 (registrar decisión OGL en log y mover al inventario), 8.10 (anexar excepciones a directrices), 8.9 (validar copy) y 1.4.1 (retomar comparativa procedural vs. PNG cuando paso 2 monte `_maps/`).
