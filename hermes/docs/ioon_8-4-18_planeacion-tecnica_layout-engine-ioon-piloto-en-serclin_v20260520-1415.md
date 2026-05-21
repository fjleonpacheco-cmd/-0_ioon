---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260520-1415
autor: Francisco Javier León Pacheco
nivel: nota-tecnica
estado: borrador-para-ingerir
proposito: formalizar la adopción de Every Layout como capa oficial de composición CSS en el stack creativo-web de ioon, con Serclin como proyecto piloto. Documenta el plan híbrido en tres fases (demo mínima → refactor Serclin → demo completa) y deja registradas las tres condiciones que gobiernan la adopción (validar antes de declarar default, distinguir aplicación completa vs subset, distinguir media queries de layout vs de modo). La nota cambia la definición operativa de 8.4.12 (stack creativo-web) — esa actualización queda pendiente como tarea derivada.
depende_de:
  - ioon_8-4-10_planeacion-tecnica_resumen-ejecutivo-stack-y-pendientes_v20260511-1215 (stack pendientes vigente)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (stack creativo-web vigente — debe actualizarse tras Fase B)
  - ioon_8-14-2-6_serclin_ficha-tecnica_v20260512-2129 (ficha P0-2.7 — base sobre la que actúa el refactor de Serclin)
  - ioon_8-4-16_planeacion-tecnica_nota-coolify-autodeploy-no-confiable-y-force-rebuild_v20260514-2017 (operativa de deploy aplicable al ciclo de refactor)
  - input externo: manifiesto técnico "Every Layout" (Andy Bell + Heydon Pickering) — 12 primitivas + axiomas de composición + reglas tipográficas
alimenta_a:
  - ioon 8.4.12 (actualización de la definición operativa del stack creativo-web)
  - ioon 8.14.2 (siguiente sesión Serclin — Fase B de refactor)
  - ioon 8.5 stack (cosecha de librería interna Astro reusable)
  - librería interna ioon (sin chat dedicado todavía — vive en `8_ioon/labs/every-layout-demo/`)
---

# Nota técnica — Layout Engine de ioon: adopción de Every Layout, piloto en Serclin

Esta nota formaliza una decisión arquitectónica del estudio: adoptar **Every Layout** (Bell + Pickering) como capa de composición CSS oficial del stack creativo-web de ioon. La adopción se hace bajo modelo de piloto: Serclin v1 funciona como laboratorio, y la declaración de default cross-proyecto queda condicionada a evidencia de la Fase B (no se da por sentado en esta nota).

La nota **no actualiza** todavía 8.4.12 (stack creativo-web). Esa actualización es tarea derivada que se ejecuta una vez cerrado el piloto.

---

## 1. Origen de la consideración

Sesión del 20 de mayo de 2026. Francisco capturó del libro *Every Layout* un manifiesto técnico estructurado en cuatro capas: axiomas de composición, catálogo de 12 primitivas algorítmicas, reglas de tipografía fluida, y guía de implementación para Astro/Next.js. El manifiesto rechaza explícitamente las media queries de viewport como mecanismo de responsividad y propone diseño intrínseco mediante `flex-basis`, `min-inline-size`, `calc()` y `min/max()`.

La pregunta que disparó la nota: ¿cómo integramos el micrositio Serclin (Astro + Tailwind 4 + GSAP, ya en producción) en este sistema? Esa pregunta escaló rápido a una pregunta de fondo: ¿adoptamos Every Layout solo para Serclin, o como default del estudio?

---

## 2. Diagnóstico — qué está haciendo Serclin hoy contra qué pide Every Layout

Serclin v1 ya implementa **el resultado** de varias primitivas, pero las implementa con utilities Tailwind ad-hoc y media queries explícitas — exactamente lo que el manifiesto rechaza.

- **Cada `.scene`** es `min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24` — patrón Cover sin saberlo.
- **Dentro de cada escena**, los elementos se separan con `mb-12` repetido en cada hermano — contraviene la lógica Stack (`* + *` con margen aplicado solo al subsecuente).
- **Las medidas tipográficas** están dispersas: `max-w-[18ch]`, `max-w-[42ch]`, `max-w-[44ch]`, `max-w-[34ch]`. Ninguna unificada como `--measure`.
- **Las tipografías escalan con media queries:** `text-[12vw] md:text-[9vw]`. Debería ser `clamp()` fluido.
- **Scene4 grid** es `grid grid-cols-2 ... md:gap-x-12 md:gap-y-12` — columnas decididas por viewport, no por espacio disponible.

Conclusión: Serclin está a ~80% del comportamiento intrínseco que pide el manifiesto, pero con implementación que no permite cosechar primitivas reusables. El refactor no rescribe lógica — refactoriza la forma de la implementación.

---

## 3. Tres decisiones cerradas

### 3.1 Tailwind y primitivas conviven

**Decisión:** Tailwind 4 y las primitivas de Every Layout coexisten en el stack. **No** se elimina Tailwind. La división de responsabilidades:

- **Primitivas Every Layout** dictan *layout y geometría*: composición vertical, contención de medida, centrado, distribución en grid intrínseco, agrupación, etc.
- **Tailwind** queda como capa de *pintura*: color, peso tipográfico, tracking, leading, decoración, animación de transición simple.

Las clases utility ad-hoc que actúan sobre layout (`max-w-[42ch]`, `flex flex-col justify-center min-h-screen`, `grid grid-cols-2`) **desaparecen**. Las clases utility que actúan sobre pintura (`font-spartan text-[color:var(--color-ink)]`, `opacity-0`, `tracking-[-0.03em]`) **se quedan**.

Razón: ir full Every Layout (eliminar Tailwind) duplica el costo del refactor y pierde la velocidad de prototipo en clientes que no requieren scroll-storytelling. La convivencia es operativa.

### 3.2 Escala modular se introduce ahora

**Decisión:** la escala modular se define junto con el refactor, no después. Variables en `global.css` bajo `@theme` de Tailwind 4 (Tailwind 4 consume custom properties nativamente):

```
--ratio: 1.5;
--s-2: calc(var(--s-1) / var(--ratio));
--s-1: calc(var(--s0) / var(--ratio));
--s0: 1rem;
--s1: calc(var(--s0) * var(--ratio));
--s2: calc(var(--s1) * var(--ratio));
--s3: calc(var(--s2) * var(--ratio));
--s4: calc(var(--s3) * var(--ratio));
--s5: calc(var(--s4) * var(--ratio));
```

Razón: Serclin hoy tiene `mb-12 / mb-16 / mb-20` decidido a ojo. Aprovechar el refactor para introducir el sistema armónico evita tener que repetir el ejercicio de "cuál es el espaciado correcto" en cada cliente. Ratio inicial: 1.5 (sugerido por el manifiesto). Si después de Serclin se siente apretado, se mueve a 1.618 (golden) sin re-arquitectura — solo cambia una variable.

### 3.3 Serclin es laboratorio + Every Layout aspira a default cross-proyecto

**Decisión:** Serclin se refactoriza como piloto. La adopción cross-proyecto se declara **solo después de evidencia positiva** de la Fase B (criterios en §7).

Esta nota **no declara** Every Layout como default ya. Lo declara aspiración condicionada.

---

## 4. Tres condiciones que gobiernan la adopción

### 4.1 Validar en Serclin antes de declarar default

No se documenta Every Layout como capa oficial del stack creativo-web (cambio a 8.4.12) hasta que el piloto rinda evidencia. Eso evita declarar una arquitectura sin haberla ejecutado en producción.

### 4.2 Aplicación completa vs subset

No todos los proyectos rinden lo mismo bajo Every Layout. La regla:

- **Aplicación completa** (todas las primitivas relevantes + escala modular + tipografía fluida) cuando el proyecto tiene composición no trivial: múltiples páginas con secciones distintas, grids dinámicas, layouts adyacentes que mutan. Ejemplos esperados: Casa Grande, Hanseatic v2 si va a fase web propia.
- **Subset mínimo** (Stack + Center + escala modular) para landings simples o sitios de 1-2 páginas. Ejemplos: micrositios de prospecto, página de mantenimiento, demo de un solo flujo.

Sin esta distinción explícita la práctica deriva en purismo (sobreingenierar landings) o desorden (aplicar primitivas a medias en proyectos grandes).

### 4.3 Media queries de layout vs de modo

El manifiesto rechaza las **media queries de layout** — las que cambian columnas según viewport. **No** rechaza, y nunca podría rechazar, las **media queries de modo**:

- `prefers-reduced-motion` (accesibilidad, ya implementada en Serclin)
- `prefers-color-scheme` (dark mode)
- `prefers-contrast` (accesibilidad)
- `@media print` (estilos de impresión)

Estas se quedan. La distinción debe documentarse en el doc canónico para evitar que en un mes un colaborador (o el propio Francisco) borre `prefers-reduced-motion` "porque el manifiesto dice no media queries" y rompa la accesibilidad.

---

## 5. Plan híbrido en tres fases

### Fase A — Demo mínima (~4 h)

**Salida:** sandbox Astro en `8_ioon/labs/every-layout-demo/` con las 5 primitivas que aplican al refactor de Serclin + escala modular.

**Primitivas Fase A:**

1. **Stack** — composición vertical con `* + *` y `--space` ajustable.
2. **Center** — contención de medida con `--measure` y gutters protectores.
3. **Cover** — escena de pantalla completa con nodo focal centrado por `margin-block: auto`.
4. **Grid** — cuadrícula intrínseca con `min(--minimum, 100%)` en `minmax`.
5. **Icon** — alineación tipográfica con `1cap` o `0.75em`.

**Estructura del sandbox:**

- Una página por primitiva. Título grande con el nombre. Snippet canónico visible. Demo en vivo abajo. 2 variaciones del valor de la variable de control (ej. `--space: var(--s0)` vs `--space: var(--s2)`). Un anti-ejemplo (cuándo no usarla).
- Página `/scale` que muestra la escala modular completa (`--s-2` a `--s5`) renderizada como bloques.
- Página `/`: índice con links a cada primitiva + escala.
- Sin branding ioon. Sin animación GSAP. Color paper/ink minimal. El sandbox **no se publica como sitio cliente**; es laboratorio interno.

**Componentes Astro a construir:** `Stack.astro`, `Center.astro`, `Cover.astro`, `Grid.astro`, `Icon.astro`. Cada uno acepta props que se mapean a custom properties vía `style` in-line (per §4.1 del manifiesto).

**Criterio de cierre Fase A:** las 5 primitivas funcionan en el sandbox, se entiende cuándo usar cada una, y los 5 componentes Astro están listos para consumir.

### Fase B — Refactor Serclin consumiendo la librería (~4 h)

**Pre-requisito:** Fase A cerrada. Los 5 componentes Astro existen y están probados.

**Plan operativo dentro de Fase B:**

- **B.1 (60 min) — Tokens en `global.css`.** Agregar la escala modular (`--s-1` a `--s5`) y las variables de tipografía fluida (`--font-display`, `--font-h1`, `--font-h2`, `--font-body`) como `clamp()`. Sin tocar escenas todavía.
- **B.2 (60 min) — Scene1 y Scene2 piloto.** Cada `.scene` pasa a `<Cover>`. Contenido interno se envuelve en `<Stack>`. Párrafos se envuelven en `<Center>`. Validar que GSAP sigue jalando (los selectores `[data-stagger]`, `[data-fade]`, `[data-fade]` no dependen del layout, solo del DOM — deberían sobrevivir).
- **B.3 (60 min) — Scene3, Scene4, Scene5.** Scene4 es el caso crítico: la grid 2×2 con `bg-word` de fondo. Conversión a `<Grid minimum="14ch">`. El wrapper `relative` para centrar el "SISTEMA" sigue funcionando porque las primitivas no tocan posicionamiento absoluto.
- **B.4 (30 min) — Fluidez tipográfica.** Eliminar `text-[Nvw] md:text-[Mvw]` de cada escena. Reemplazar por consumo de variables `--font-display` etc. Cero `@media` en typography al final del bloque.

**Validación al cierre de Fase B:**

1. Lighthouse mobile sigue ≥ 90 Performance, 100 Accessibility (criterios de la ficha 8.14.2.6).
2. `prefers-reduced-motion` sigue produciendo fallback estático funcional.
3. Los selectores GSAP siguen activos (no se rompieron animaciones por cambio de DOM).
4. El git diff es legible: cada commit toca una capa específica (tokens, primitiva, escena).

### Fase C — Demo completa de las 7 primitivas restantes (~6-8 h)

**Pre-requisito:** Fase B cerrada y desplegada en producción con validación positiva.

**Primitivas Fase C:**

6. **Box** — encapsulación con border + outline-offset, inversión de colores HSL.
7. **Cluster** — agrupación horizontal con wrap simétrico.
8. **Sidebar** — distribución cuántica con `flex-grow: 999` y `min-inline-size: 50%`.
9. **Switcher** — Holy Albatross con `calc((threshold - 100%) * 999)` y Quantity Queries.
10. **Frame** — relación de aspecto con `aspect-ratio` + `object-fit: cover`.
11. **Reel** — desplazamiento horizontal con `overflow-x: auto` y `flex: 0 0 width`.
12. **Imposter** — overlay centrado con `transform: translate(-50%, -50%)`.

Misma estructura de sandbox que Fase A: una página por primitiva, snippet canónico, variaciones, anti-ejemplo.

**Criterio de cierre Fase C:** las 12 primitivas existen como páginas demo + componentes Astro reusables. El sandbox es referencia operativa para onboarding de cualquier colaborador futuro o para arrancar el próximo cliente.

---

## 6. Cosecha esperada

Al cierre de las tres fases ioon tiene:

- **Librería interna Astro:** 12 componentes (`Stack`, `Center`, `Cover`, `Grid`, `Cluster`, `Sidebar`, `Switcher`, `Box`, `Frame`, `Reel`, `Imposter`, `Icon`). Distribución: copiar/pegar el directorio `src/components/layout/` por ahora; si crece a 20+ componentes, evaluar empaquetarlo como `@ioon/layout` (npm interno o git submodule).
- **Sistema de tokens compartido:** escala modular `--s-1` a `--s5` + tipografía fluida con `clamp()`. Vive en `global.css` y se instancia per-cliente con override mínimo de la paleta de color.
- **Sandbox educativo permanente:** `8_ioon/labs/every-layout-demo/` como referencia operativa. Onboarding técnico de un colaborador futuro pasa de "lee el libro" a "abre el sandbox + lee esta nota".
- **Stack 8.4.12 actualizado:** definición operativa pasa de "Astro + Tailwind + GSAP" a "Astro + Tailwind (capa de pintura) + Every Layout (capa de composición) + GSAP (capa de movimiento)".

---

## 7. Criterio para declarar Every Layout default cross-proyecto

La declaración formal de Every Layout como capa default del stack creativo-web (cambio a 8.4.12) se hace **solo si** al cierre de Fase B se cumplen los siguientes criterios:

1. Refactor de Serclin desplegado en producción sin regresión visual ni de performance.
2. Los 5 componentes Astro de Fase A se usaron sin necesidad de modificar su API durante el refactor. Si tuviste que cambiar la firma de `<Stack>` mientras refactorizabas Scene3, la primitiva no estaba madura.
3. El tiempo total de refactor (B.1 + B.2 + B.3 + B.4) cae dentro de ~6 h en la práctica. Si tomó 12 h, la promesa de "cosecha que ahorra horas en próximos clientes" no se sostiene.
4. Sensación subjetiva al cerrar Serclin: leer el código resulta más claro que antes, no menos. Esta es la métrica blanda pero la más importante.

Si 3 de 4 criterios pasan, se declara default. Si 2 o menos, se reabre la discusión en una nota posterior (qué falló, qué ajustar antes de adoptar cross-proyecto).

---

## 8. Implicaciones explícitas

### 8.1 Para 8.4.12 (stack creativo-web)

Pendiente, condicionado al cierre de Fase B. Cuando se ejecute, la definición operativa cambia:

- **Hoy:** Astro + Tailwind + GSAP.
- **Después:** Astro + Tailwind (pintura) + Every Layout (composición) + GSAP (movimiento) + escala modular ratio 1.5.

### 8.2 Para Hanseatic Pharma (hpt-demo)

**No se refactoriza.** El demo está a 90 días de revisión con el cliente, en producción, fue hecho con stack pre-cristalización. Refactorearlo es sobreingeniería defensiva. Vive su ciclo.

### 8.3 Para próximos clientes (Casa Grande y posteriores)

Arrancan con el engine nuevo desde el primer commit. Plantilla base de proyecto Astro incluye la librería de primitivas y la escala modular como dependencia interna.

### 8.4 Para Serclin 8.14.2

La Fase B agrega un sub-hito al roadmap del cliente: P0-2.9 (o como se numere) "refactor a Every Layout". No es entregable visible para José Arnaud — el cliente no ve diferencia visual. Es deuda técnica resuelta antes de que se note.

---

## 9. Lo que esta nota pospone

Esta nota **no resuelve**:

- Si la librería interna vive como código copiado por proyecto o como package empaquetado (`@ioon/layout` interno). Decisión que tomar al cierre de Fase C.
- Si el sandbox `every-layout-demo/` se publica en algún subdominio (`labs.ioon.mx` o similar) para tener referencia pública, o queda solo localmente. Tema de marca/posicionamiento, no técnico.
- Si se adopta también la propuesta de naming BEM-less / hash-based para primitivas (lo sugiere el manifiesto pero no es obligatorio). Por defecto se mantiene naming semántico tipo `.stack`, `.cover`, `.with-sidebar`.
- Si vale la pena escribir un linter custom o regla de PR review que detecte uso de `@media (min-width:...)` y lo flague como "¿es media query de layout? si sí, refactor a primitiva". Microautomatización a evaluar después de la Fase C.

---

*Nota generada el 2026-05-20. Borrador para ingerir en 8.4 planeación técnica. Fase A pendiente de iniciar; ETA de cierre completo (A + B + C) ~14-16 h distribuidas en 3-4 sesiones.*
