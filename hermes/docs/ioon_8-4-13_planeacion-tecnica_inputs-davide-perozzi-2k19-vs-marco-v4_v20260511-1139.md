---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260511-1139
autor: Francisco Javier León Pacheco
nivel: documento informativo · cruce input-externo vs marco
estado: listo-para-integrar — propone actualización menor a §1.12, §1.14 y §1.16 del marco v4
proposito: cruzar los hallazgos del análisis de la referencia Davide Perozzi 2k19 (ficha fjlp 1-4-1-6) contra el Marco de Decisión Técnica v4. Clasifica cada hallazgo como (a) instalable directo sin pelearle al stack, (b) patrón replicable adoptable, o (c) lo que no me sirve. Sirve como insumo para 8-4-6 (ioon-effects requerimientos) y como complemento informativo del marco v4.
depende_de:
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1115 (marco v4 vigente)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (decisión que canonizó §1.12, §1.14, §1.16)
  - fjlp_1-4-1-5_fichas-de-referencias_ficha-artista-davide-perozzi (origen del input)
  - fjlp_1-4-1-6_fichas-de-referencias_ficha-website-davide-perozzi-2k19 (origen del input)
alimenta_a:
  - ioon_8-4-6 (requerimientos ioon-effects — actualización pendiente; ver §5)
  - ioon_8-4-2 (marco; sugerir anotación menor en §1.12 y §1.14 — ver §5)
  - chat 1.4.1 (corrige propuesta previa LiquidTextWebGL.jsx con OGL → reescritura con R3F+drei; ver §6)
---

# Inputs de Davide Perozzi 2k19 cruzados contra el Marco Técnico v4

Documento informativo que aplica el Marco v4 (§1, §2, §3) al material recolectado en el chat `fjlp 1.4.1 fichas-de-referencias` sobre el portfolio 2k19 de Davide Perozzi. Para cada hallazgo, una decisión clara: librería instalable, patrón adoptable, o descarte.

**Aclaración honesta (§6 lo detalla).** Sesiones previas a esta nota propusieron herramientas que ahora chocan con el Marco v4 — específicamente OGL como base de `ioon-effects` y referencias positivas a `smoovy` / `momentum-js`. Esta nota corrige esas propuestas usando los criterios del marco vigente.

---

## 1. Tabla de cruce — hallazgo × categoría del marco

Resumen visual antes del detalle. Cada hallazgo de Davide se mapea a la(s) categoría(s) del Marco v4 donde encaja (o donde colisiona).

| Hallazgo del 2k19 | Categoría(s) del marco | Veredicto |
|---|---|---|
| Smoovy (smooth scroll, parallax, WebGL utils — TypeScript, MIT) | §1.12 | **Descartar** — duplica GSAP+ScrollTrigger |
| momentum-js (efecto inercia, JS, MIT) | §1.12 | **Descartar** — cubierto por GSAP Draggable |
| OGL (micro WebGL, ~50KB, MIT) | §1.14 | **Descartar como base** — R3F+drei es el default. Posible uso puntual en experimento aislado, no como sistema |
| Nuxt (meta-framework Vue) | §1.2 | **Descartar** — Vue ya descartado en §1.2 |
| WebGL displacement como técnica | §1.14, §1.16 | **Patrón adoptable** — implementar con R3F+drei |
| Hover-displacement sobre imagen (técnica) | §1.14, §1.16 | **Patrón adoptable** — R3F+drei + shader |
| Transición de imagen con displacement (técnica) | §1.14, §1.16 | **Patrón adoptable** — R3F+drei + shader |
| Texto líquido (técnica deformación tipográfica) | §1.14, §1.16 | **Patrón adoptable** — R3F+drei + shader o SVG nativo |
| Fondo atmosférico (técnica ruido animado) | §1.14, §1.16 | **Patrón adoptable** — R3F+drei + shader o p5.js |
| Outline-only display type (`-webkit-text-stroke`) | §1.12 (CSS first line) | **Patrón adoptable** — CSS puro |
| Cursor personalizado con estados | §1.12 (CSS first line) | **Patrón adoptable** — adaptado a directriz "sin íconos de color" |
| Click-and-hold gate como entrada | §1.12 | **Patrón caso-por-caso** — NO por default |
| Headlines rotativos | §1.12 | **Patrón adoptable** — useState + setInterval |
| Tag rows tipo marquee | §1.12 | **Patrón adoptable** — CSS keyframes |
| Numeración editorial `N° 1 / N° 2 / N° 3` | §1.8, §3.2 | **Patrón adoptable** — confirma lenguaje visual |
| Subdominio year-stamped (`2k19.*`) | (operacional, no en marco) | **Patrón adoptable** — práctica de versionado |
| Neue Plak Extended (Monotype, propietaria) | §1.8 | **Caso-por-caso** — solo si cliente lo justifica (no default) |
| Neue Haas Unica Pro (Monotype, propietaria) | §1.8 | **Caso-por-caso** — Space Grotesk vigente como default ioon |
| Custom scroll engine (aminejs, no público) | §1.12 | **Descartar** — no instalable; GSAP cubre |
| Postura política explícita en banner (estilo "Fuck Nazis!") | §3.1, §1.8 | **Descartar** — rompe voz consultora ioon |
| Copy con humor meme ("Wow Such Smooth") | §1.8, §3.1 | **Descartar** — rompe tono editorial silencioso |
| Sin imágenes en proyectos (typographic specimens + tag rows) | §3.2 | **Patrón adoptable** — variante fallback editorial cuando cliente no tiene foto pro |
| Web Font Loader (`webfontloader` npm) | §1.8 | **Descartar marginal** — `astro:font` / `next/font` lo cubre |

---

## 2. Categoría A · Instalable directo (npm), sin pelearle al stack

**Honesto:** después de aplicar el marco v4, esta categoría queda **casi vacía**. Las librerías de Davide o sus dependencias chocan con decisiones ya tomadas. Lo que queda son cosas marginales o complementarias, no protagonistas.

### A.1 GSAP plugins especializados (ya admitidos en §1.12, activables uno-a-uno)

El marco dice "Plugins especializados (Draggable, MorphSVG, MotionPath) activables uno-a-uno según necesidad". Davide tiene piezas que justificarían activar plugins puntuales:

- **`gsap/Draggable`** — para efectos tipo momentum/inercia (lo que momentum-js intentaba dar). **Activar cuando se haga el primer caso real que lo necesite** (ej. galería con drag horizontal estilo Awwwards).
- **`gsap/MotionPathPlugin`** — si en algún demo se quiere un cursor con trayectoria curva tipo Davide o partículas siguiendo path.
- **`gsap/Flip`** — para transiciones de layout fluidas (galería filtrable de demo-arquitectura-1 podría ganar aquí).

No son novedad — están dentro del marco v4 §1.12. Lo que aporta Davide es **justificación concreta de cuándo activar cada uno**.

### A.2 Adobe Fonts — uso puntual de Neue Plak / Neue Haas para cliente

§1.8 dice "Foundries OSS preferidos. Custom solo en casos de identidad de cliente específica." Davide muestra el valor expresivo de Neue Plak Extended (extra black) como display type. **Si un cliente de ioon pide un lenguaje display denso/extendido tipo Davide**, Adobe Fonts (ya activo en §1.7 vía Adobe CC) cubre Neue Plak y Neue Haas Unica Pro sin agregar SaaS nuevo. Default del estudio sigue siendo Space Grotesk via Fontshare/Google Fonts.

Alternativas OSS si se quiere acercarse sin Adobe:
- Para display extendido: **Bebas Neue** (libre, Google Fonts) — más alta condensada, no extended exacta pero del mismo cluster expresivo.
- Para body neutral: **Inter**, **Space Grotesk**, **Manrope** — todas en Google Fonts/Fontshare.

### A.3 Lo que NO entra aquí

Las librerías propias de Davide (`smoovy`, `momentum-js`) y `aminejs` (no público) y `OGL` (en lugar de R3F) no aplican como instalables porque pelean con §1.12, §1.14 y/o §1.2.

---

## 3. Categoría B · Patrones replicables (no librería, sí adoptables)

El verdadero aporte de Davide al estudio: **técnicas que ya son neutrales de implementación**. La biblioteca cambia, la técnica queda.

### B.1 Efectos WebGL — implementables con stack vigente

§1.14 canoniza Three.js + R3F + drei como motor. Los 4 efectos formales de Davide son shaders aplicados a un plano; todos implementables sin agregar dependencia nueva:

| Efecto formal | Implementación en stack ioon | Donde encaja |
|---|---|---|
| Texto líquido (deformación tipográfica) | R3F + drei (`<shaderMaterial>`) sobre texto rasterizado en canvas, o SVG nativo (`<feTurbulence>` + `<feDisplacementMap>`) cero-librería | Componente de `ioon-effects` (§1.16) |
| Transición entre dos imágenes con displacement | R3F + drei + shader de mezcla | Componente de `ioon-effects` |
| Hover-displacement sobre imagen | R3F + drei + shader de mouse-reactive | Componente de `ioon-effects` |
| Fondo atmosférico (ruido animado) | R3F + drei + shader 2D, o p5.js generativo | Componente de `ioon-effects` o `1.14 sketch` |

**Nota sobre SVG.** El texto líquido tiene ruta alterna sin WebGL vía `<feTurbulence>` + `<feDisplacementMap>` (estándar W3C, cero bundle, GPU-accelerated). **Esta ruta no aparece nominalmente en el marco v4 pero encaja en §1.12 línea "CSS animations + transitions — primera línea para microefectos triviales sin librería"** ampliada a SVG. Vale la pena registrarla como técnica disponible y preferida cuando no se necesita reactividad mouse.

### B.2 Recursos formales (CSS / micro-JS) — sin librería

Patrones que se implementan con HTML/CSS/JS vanilla, completamente alineados con §1.12 "primera línea para microefectos triviales sin librería":

| Patrón | Implementación | Alineación con marco |
|---|---|---|
| Outline-only display type | `-webkit-text-stroke: 1px var(--ink); color: transparent;` | ✓ CSS first line (§1.12) |
| Cursor personalizado **monocromo** | `mousemove` listener + CSS transform | ✓ Adaptación: sin punto rojo central (rompe "sin íconos de color" §1.8 directrices) |
| Headlines rotativos | `useState` + `setInterval` en React | ✓ Microefecto trivial (§1.12) |
| Marquee de tags | CSS `@keyframes` | ✓ CSS first line |
| Numeración editorial `N° 1` | Patrón visual + overline | ✓ Confirma lenguaje §1.8 |
| Tipografía como protagonista, foto = 0 | Decisión editorial, no técnica | ✓ Variante de fallback (cliente sin material visual) |

### B.3 Patrones operacionales

| Patrón | Aplicación en ioon |
|---|---|
| Subdominio year-stamped (`2k19.*`) | Útil para preservar versiones públicas de demos cuando se rediseñan. Ej.: `2026.demo-arquitectura-1.ioon.mx` cuando suba v2 |
| Stack visual sin fotos (puro typographic) | Variante de demo aplicable a clientes que aún no tienen producción fotográfica profesional. Diseño elegantemente incompleto, no roto |

### B.4 Click-and-hold gate — patrón caso-por-caso

Pieza ambivalente. Como patrón es interesante, como práctica generalizable es contraproducente para el modelo de ioon (venta rápida vía catálogo). Registrar como **disponible pero NO default**: aplicable solo si un cliente lo justifica (ej. sitio de contemplación, lanzamiento ceremonial, no e-commerce ni dashboard).

---

## 4. Categoría C · Lo que NO me sirve

Decisiones de descarte explícitas para no reabrir sin evidencia externa nueva. Cada una con su razón anclada al marco vigente.

### 4.1 Librerías descartadas

| Pieza | Razón de descarte | Sección del marco |
|---|---|---|
| `smoovy` | Duplica funcionalidad de GSAP+ScrollTrigger (smooth scroll, parallax) ya canonizado | §1.12 |
| `momentum-js` | Cubierto por `gsap/Draggable` cuando se active | §1.12 |
| `Nuxt` (+ Vue como framework) | Vue descartado explícitamente como framework primario | §1.2 |
| `OGL` como base de sistema | R3F+drei es default React-first; OGL bonito pero rompe coherencia | §1.14, §1.16 |
| `aminejs` | No público; GSAP cubre la necesidad | §1.12 |
| `hover-effect` (Robin Delaporte) | Mantenimiento inactivo; nicho cubierto por R3F+drei | §1.14 |
| `curtains.js` | Redundante con R3F+drei | §1.14 |
| `webfontloader` | `astro:font` / `next/font` lo cubren con menos bundle | §1.8, §1.2 |

### 4.2 Voz / copy / postura del 2k19 — no transferibles a ioon

| Elemento | Razón |
|---|---|
| Postura política explícita en banner ("Fuck Nazis!") | Rompe principio §3.1 (experiencia de cliente primero — incluye que el sitio del estudio no sea polarizante en términos no estratégicos) |
| Copy con humor meme ("Wow. Such Smooth. Much Parallax", "I hope your fans ain't getting too loud") | Rompe tono editorial silencioso de identidad ioon (§1.8 directrices) |
| Cursor con punto central de color saturado | Rompe directriz "sin íconos de color" |
| WebGL displacement como capa global del sitio entero | Rompe §3.2 "tipografía y animación como cimientos" — el espectáculo no debe sustituir el contenido. Permitido solo en componentes `ioon-effects` con excepciones documentadas |

### 4.3 Subdominios principales caídos como dato curioso, no como insight

Hallazgo de la sesión anterior: `perozzi.studio/` y `davideperozzi.com/` retornan 404; el 2k19 es su sitio personal vigente. **Útil como dato biográfico** para la ficha 1-4-1-5, **no transferible** como patrón para ioon (no es una decisión de Davide, es un estado de su backlog).

---

## 5. Propuesta de actualización al marco y a documentos vecinos

Esta nota no requiere emitir v5 del marco, pero sí sugiere **anotaciones menores** en categorías existentes y **input concreto** a documentos abiertos.

### 5.1 Anotación sugerida en §1.12 del marco (animación)

Agregar a la lista de "primera línea sin librería":

> **SVG nativo (`<feTurbulence>` + `<feDisplacementMap>`).** Estándar W3C, sin dependencia npm. Adecuado para texto líquido y deformaciones sutiles sin reactividad mouse. Cuando se necesita reactividad o texturas complejas, escalar a R3F+drei.

### 5.2 Anotación sugerida en §1.14 del marco (3D)

Agregar a la sección "standby/descartes":

> **OGL** — descartada como base. R3F+drei provee la misma capacidad alineada con la decisión React-first.

### 5.3 Input a `ioon_8-4-6` (requerimientos ioon-effects, a cerrar)

La nota completa de requerimientos elaborada en sesión previa (`ioon_8-4-2_planeacion-tecnica_biblioteca-efectos-visuales-requerimientos_v20260504-1233`) tiene una propuesta de stack basada en OGL que ahora queda **invalidada por §1.14**. Para emitir versión nueva de los requerimientos:

- Reemplazar mención de OGL por **R3F + drei** como base WebGL.
- Mantener intactos los 4 efectos como capacidades target.
- Mantener intactos los criterios de §4 (bundle ≤ 80 KB, fallback, accesibilidad, props de personalización).
- Agregar SVG nativo como opción para texto líquido sin WebGL (alterna técnica).
- Bundle ≤ 80 KB sigue siendo objetivo; con R3F+three el cálculo cambia y conviene revisarlo (Three.js+R3F+drei pesa más que OGL solo; evaluar code-splitting y tree-shaking).

### 5.4 Excepciones a directrices visuales (8.10)

Sigue válido lo apuntado en sesión previa: documentar **excepciones acotadas** a las directrices visuales para componentes `ioon-effects`. Sin cambios respecto a la sesión anterior (gradientes/texturas permitidas dentro del componente, animaciones continuas dentro del componente, accent por cliente solo en lugares declarados).

---

## 6. Impacto en trabajo previo de esta línea de chats

Por integridad, registro el delta entre lo que se entregó antes y lo que el Marco v4 ahora exige.

### 6.1 Componente `LiquidTextWebGL.jsx` (sesión anterior) — INVALIDADO en su forma actual

Lo que se entregó en `ioon_8-7-2_catalogo_paso1-liquidtext-webgl-integracion_v20260504-1233` (catálogo paso 1) está construido sobre **OGL**. Esto choca con §1.14 del Marco v4.

**No hace falta tirarlo a la basura.** Hace falta reescribirlo:

- **API pública del componente: idéntica** (mismos props, mismos defaults). El consumo desde `App.jsx` no cambia.
- **Internals: reemplazar OGL por R3F + drei.**
  - Canvas a través de `<Canvas>` de R3F en lugar de `Renderer` de OGL.
  - Shader vive en `<shaderMaterial>` de drei.
  - `useFrame` de R3F en lugar de `requestAnimationFrame` manual.
  - El shader GLSL es **portable tal cual** (mismo simplex noise, mismas uniforms).
- **Bundle impact a verificar**: Three.js + R3F + drei minified gzipped ~150 KB. Si el code-splitting y tree-shaking dan ese número en producción, sigue dentro del cap de 80 KB **por demo cuando solo se cargue lo necesario** — requiere validar empíricamente.

Acción concreta cuando se decida implementar: reescribir el componente en una segunda iteración, posterior a este documento.

### 6.2 Notas previas `ioon_8-4-2_biblioteca-efectos-visuales-requerimientos_v20260504-1233` y `ioon_8-5-2_biblioteca-efectos-visuales-implementacion_v20260504-1233`

Su contenido sigue siendo útil como **historia de la deliberación**, pero su recomendación final (OGL preferida, Pixi.js plan B) queda superada por la canonización de R3F+drei en el Marco v4. Cuando se emita la versión nueva de ambos documentos:

- En el doc de requerimientos: reemplazar Ruta B (WebGL) → "WebGL via R3F+drei", manteniendo SVG nativo como alterna del texto líquido.
- En el doc de implementación: ya no es shortlist comparativa; es ejecución directa con R3F+drei. El doc puede simplificarse a una ficha estándar §6 del contexto 8.5.

### 6.3 Pendiente registrado en `ioon_8-7-2_catalogo_paso1`

El pendiente §6.3 ("probar mapa de ruido tipo PNG después") **se mantiene** sin cambios — es una variación visual, no técnica de stack.

---

## 7. Resumen ejecutivo (1 párrafo)

Tras cruzar los hallazgos del análisis del portfolio 2k19 de Davide Perozzi contra el Marco v4 del estudio: **categoría A (instalable directo)** queda casi vacía — solo plugins puntuales de GSAP (Draggable, MotionPath, Flip, ya admitidos en §1.12) y uso caso-por-caso de Adobe Fonts para tipografías display de cliente. **Categoría B (patrones adoptables)** es donde reside el verdadero aporte: técnicas de WebGL displacement (4 efectos) implementables con el stack vigente R3F+drei, efectos CSS/SVG sin librería (outline display type, cursor personalizado monocromo, headlines rotativos, marquee, numeración editorial, subdominio year-stamped), y patrones operacionales como "stack visual sin foto". **Categoría C (descartes)** incluye las librerías propias de Davide (`smoovy`, `momentum-js`, `aminejs`), `OGL` como base de sistema (R3F+drei la sustituye), `Nuxt` (Vue ya descartado), y la voz/copy del 2k19 (postura política explícita, humor meme, cursor con color saturado). Esta nota corrige propuestas previas de la línea de chats — el componente `LiquidTextWebGL.jsx` entregado debe reescribirse manteniendo API pública pero migrando internals OGL → R3F+drei. No requiere emitir v5 del marco; sí sugiere anotaciones menores en §1.12 (SVG nativo) y §1.14 (OGL descartada).

---

*Generado 2026-05-11 11:39 UTC-6, en cruce con Marco v4 (11:15 mismo día). Próximo paso natural: integrar a `ioon_8-4-6` cuando se cierre requerimientos de ioon-effects.*
