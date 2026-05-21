---
id: 1-4-1-6
tipo: website
nombre: 2k19 — Portfolio Davide Perozzi
autor: Norman Dubois (diseño) + Davide Perozzi (development)
año: 2019; mantenido al menos hasta 2022 (footer "©2022 - ∞ created by UNDESIGNED")
medio: portfolio web personal · Nuxt + Vue + WebGL
fuente: https://2k19.perozzi.studio/
tags: [portfolio-personal, nuxt, vue-js, webgl, displacement, custom-scroll-engine, aminejs, tipografia-display, neue-plak-extended, neue-haas-unica, outline-display-type, cursor-personalizado, click-and-hold-gate, marquee-tags, micro-interacciones, smooth-scroll, parallax, transiciones, minimalismo, paleta-crema, acento-coral, copy-con-humor, anti-fascista, headlines-rotativos, web-craft, awwwards-sotd, fwa, alemania]
conexiones: [1-4-1-5]
estado: revisada
version: v20260503-2102
---

# Website — 2k19 (Portfolio Davide Perozzi)

## Síntesis (1-2 líneas)
Portfolio personal del creative developer Davide Perozzi (2019). Diseño de Norman Dubois, development de Davide. Nuxt + Vue + WebGL, dos canvas en capas, custom scroll engine, tipografía display masiva (Neue Plak Extended) y copy con humor seco. Pieza de referencia del cluster "portfolio dev como objeto de craft" de finales de los 2010s — y, en mayo 2026, **su única presencia personal pública viva**.

## Datos mínimos
- Autor / creador:
  - Diseño / dirección visual: Norman Dubois.
  - Development: Davide Perozzi.
- Año / época: 2019; footer indica mantenimiento "©2022 - ∞ created by UNDESIGNED" — el sitio fue republicado/preservado por el estudio UNDESIGNED en 2022.
- Medio / formato: sitio web one-page (portfolio personal), versión "year-stamped" (preservada como `2k19.*`).
- Fuente / URL: https://2k19.perozzi.studio/.
- **Contexto del dominio (verificado 2026-05-03):** los dos dominios "principales" del autor están caídos:
  - `https://perozzi.studio/` → 404 page not found (página oscura, mono blanco — captura archivada en `fjlp_1-4-1-7`).
  - `http://www.davideperozzi.com/` → 404 page not found (mismo template).
  - Por eso el subdominio `2k19.perozzi.studio` no es un archivo histórico — es de hecho el sitio personal vigente de Davide hoy.
- Cobertura editorial / awards (auto-declarados por Davide en el sitio):
  - **Awwwards**: Site Of The Day, Developer Site, Mobile Of The Week, Mobile Excellence, Honorable Mention.
  - **CSS Design Awards**: Site Of The Day, Best UI/UX & Innovation.
  - **The FWA**: FWA of the Day (caso del portfolio de Norman; el de Davide listado en thefwa.com/cases).
  - **Mindsparkle Mag**: Site Of The Day.
  - **CSS Awards**: Site Of The Day (MUELLER by Bande Vier — proyecto previo).
- Contexto original: portfolio personal lanzado en 2019; pieza-bisagra entre la práctica solitaria de Davide y la fundación de UNDESIGNED (2021).

## Análisis semántico
- Temas: presentación de un creative developer; el sitio personal como pieza retórica donde la forma demuestra la capacidad técnica; humor seco como antídoto a la asepsia del nicho.
- Mensaje o idea central: "esto sé hacer, y lo hago con disciplina editorial"; la tipografía y la cadencia hablan más fuerte que un showreel; la personalidad del autor cabe en la copy.
- Emociones / atmósfera: pulcritud, calma, control. Pausas largas. Sensación de habitación bien iluminada y vacía a propósito. Humor en los headlines rotativos rompe la solemnidad.
- Contexto histórico-cultural: pleno momento de los portfolios dev SOTY (Bruno Simon 2019, Lusine, Antoine + Manuel, Locomotive). Este se planta en el lado más editorial/tipográfico que cinemático/3D-narrativo.
- Referencias internas: tradición editorial suiza llevada a pantalla; piezas tipográficas grandes en sitios como Locomotive, Hello Monday y otros del cluster Awwwards 2018–2020.

## Análisis técnico

### Stack verificado (inspección directa en navegador, 2 sesiones)
- **Framework**: Nuxt (scripts servidos desde `/_nuxt/`), confirmando Vue.js. `window.__NUXT__` presente con `serverRendered:true` (renderizado SSR + hidratación cliente).
- **Stack completo según el propio Davide** en el bloque "My portfolio" del sitio: Vue, WebGL, Animations, Parallax, "Random buzzword" (broma), Smooth scrolling, **Displacement**, Developer, JavaScript, **aminejs**, SCSS.
- **WebGL**: dos canvases en capas:
  - `.canvas-wrapper--background`
  - `.canvas-wrapper--foreground`
  - El background lleva una textura ambiental tipo "humo/nube" suave que aparece en transiciones (efecto de displacement).
- **Custom scroll engine**: vivo en la Vue instance del layout (`scrollerService` + `scroller.scrollToY()`), expone observables RxJS (`scroll$`, `scrollVelocity$`) y métodos `scrollToY`, `triggerScroll`, `update`. Probablemente `aminejs` o derivado interno de UNDESIGNED. **`aminejs` no aparece como repo público de Davide** (búsqueda directa en sus 49 repos GitHub, 0 matches con substring "amine"). Hipótesis: módulo interno UNDESIGNED o repo privado.
- **Vue components**: la app expone `cursor`, `viewport`, `resources`, `glConfig`, `imprintEnabled` en su layout root. La Vue instance del preloader expone `handleCircleDown`, `handleLoadingDone`, etc. — el gate puede bypasearse seteando `clicked=ready=loaded=true` y llamando `handleLoadingDone()` directamente.
- **Analytics**: Google Analytics (UA-137490660-1, legacy property).

### Tipografía (verificado vía `document.fonts`)
- **Display**: Neue Plak Extended — pesos cargados: Light, Regular, Bold, **ExtraBlack**. La ExtraBlack carga el wordmark "DAVIDEPEROZZI" y los nombres de proyectos (ROOTS, MACKMEDIA…) y secciones outline (AWARDS, CONTACT) en tamaños masivos.
- **Body**: Neue Haas Unica Pro — pesos: Light, Regular, Medium. Carga el cuerpo de texto, navegación y headlines centrales.
- Mulish queda listada pero no carga (¿fallback?).
- HTML class flag confirma carga vía Web Font Loader: `wf-neueplakextendedextrablack-n4-active wf-neueplakextendedbold-n4-active wf-active`.

### Paleta
- Fondo: crema/off-white (~#F8F1EC, casi rosado-papel).
- Texto: negro (#000 o muy oscuro).
- Acento: rojo coral (~#E64A30 a ojo) — usado en cursor, dashes activos del nav, marquee de tags de proyectos, indicador de scroll, arco del preloader.
- Disciplina: paleta de 3 tonos. Sin foto a color, sin imagen tradicional.

### Recursos formales (verificados visualmente)
- **Click-and-hold gate como entrada**: arco circular rojo en el centro que se llena mientras se mantiene pulsado; abajo "CLICK & HOLD". Hasta completarlo no entra al sitio. Gesto-firma del autor.
- **Cursor personalizado**: círculo rojo con punto central (también rojo). Reemplaza al cursor nativo (body classflag `hide-cursor`). Diámetro ~40px. Reactivo: cambia tamaño/forma sobre interactivos.
- **Indicador de scroll**: barra/línea roja vertical fina pegada al margen derecho.
- **Headlines rotativos** (banner superior central): copy que cicla entre frases — "Creative developer", "DevOps Engineer", "Fuck Nazis!", "Wow. Such smooth. Much Parallax", "Displacement everywhere", "Full stack developer", "Enjoying my portfolio?", "I hope your fans ain't getting too loud", "Look mum no hands!", "No, the 'e' in my name isn't silent". Mezcla declaración técnica + meme + postura política.
- **Tipografía como protagonista absoluta**: cada proyecto se presenta como un **nombre en Neue Plak Extended ExtraBlack a tamaño gigantesco** ("ROOTS", "MACKMEDIA", "Hue & Cry", "Norman", etc.), no como thumbnail. Los marcadores de sección "AWARDS" y "CONTACT" aparecen en **outline-only** (sólo contorno, sin relleno) ocupando casi el ancho del viewport.
- **Tag rows tipo marquee**: bajo cada nombre de proyecto, una fila horizontal de tags en rojo coral en mayúsculas (`WEBGL · DOCKER · PARALLAX · SMOOVY · …`) que scrollean en loop continuo.
- **Navegación**: 4 ítems numerados con superíndices `INTRO ⁰¹ / PROJECTS ⁰² / SKILLS ⁰³ / CONTACT ⁰⁴`. El activo lleva tachado en rojo (`-INTRO-`) o un dash rojo a la izquierda (`— PROJECTS`). Cada link envuelve **3 copias del texto** apiladas (`Intro Intro Intro`) para animación tipo roll-out en hover.
- **Headers de sección**: línea horizontal + numeral romano fino (`N° 1`, `N° 2`, etc.) + título grande ("WHO'S TALKING?", "WANNA SEND ME A MESSAGE?", etc.).
- **Composiciones tipo "Hi I'm Davide"**: contraste extremo entre texto fino ("Hi I'm") y display masivo ("Davide"), con palabras intercambiables animadas por carrusel ("not very tall / someone / half italian / just a guy / patient / not a meme yet / a hip hop head / not batman").
- **Versión móvil** (verificada via resize a 412×915): la jerarquía tipográfica se mantiene; el wordmark pasa a barra superior, los headlines rotativos siguen activos. Premiada con "Mobile Of The Week".
- **Subdominio "year-stamped" (`2k19`)**: explicita que es una versión histórica, no la actual — pero ironía: las "actuales" están caídas, así que esta es de hecho la cara presente del autor.

### Decisiones distintivas
- **Sin imágenes de proyecto**. Los proyectos viven sólo como typographic specimens + tag rows. Decisión radical en un nicho que vive de los thumbnails.
- **WebGL como soporte sutil**, no como espectáculo: el sitio no parece "demo-WebGL", parece "editorial con WebGL adentro" (la textura de displacement aparece sólo durante transiciones).
- **Stack Vue/Nuxt** (no React) en un nicho dominado por React/Three.js: decisión de gusto técnico que coincide con su perfil de fullstack DevOps.
- **Click-and-hold como ritual de entrada**: filtra al curioso casual, premia al que está dispuesto a esperar 2 segundos.
- **Postura política explícita** ("Fuck Nazis!") en el banner principal — raro en portfolios de craft.

## Por qué me inspira (nota personal)
[hereda de 1-4-1-5 — la nota personal vive en la ficha del artista; aquí se omite hasta tener observaciones específicas del sitio como objeto.]

## Conexiones con otras fichas
- **1-4-1-5** (ficha-artista — Davide Perozzi): esta ficha es la disección formal del artefacto; 1-4-1-5 la generaliza al autor.
- **1-4-1-7** (captura — perozzi.studio 404): evidencia visual de que el dominio "principal" del autor está caído, lo que justifica el rol del 2k19 como sitio vigente.

## Aplicabilidad
- En qué proyecto(s) propios podría resonar: como referencia formal directa para un futuro portfolio personal (fotográfico o de diseño) que privilegie tipografía y respiración por encima de saturación visual; cualquier pieza donde se quiera defender que "la tipografía puede sostener todo el peso visual sin imágenes".
- Qué tomar específicamente:
  - El gesto del subdominio "year-stamped" como manera honesta de versionar un portfolio.
  - La proporción de tipografía display vs. imagen (acá: imagen = 0).
  - El cursor como elemento de identidad, no como decoración.
  - WebGL "entre bambalinas" en lugar de en primer plano.
  - El click-and-hold como ritual de entrada — equivalente a una "puerta" que filtra atención.
  - El uso del **outline-only** display type para los marcadores de sección como vocabulario formal.
  - El permiso de incluir humor y postura personal en el banner principal sin romper la elegancia.
  - La paleta de 3 tonos (crema + negro + un acento coral) como disciplina cromática.

## Capturas visuales

### En `/outputs` (archivos):
- `fjlp_1-4-1-7_fichas-de-referencias_captura-perozzi-studio-404_v20260503-2102.jpg` — captura del estado 404 de `perozzi.studio/` (evidencia complementaria, no del 2k19 propiamente).

### Inline en el chat (no persistidas como archivos por throttle de descarga de Chrome, vía Claude in Chrome):
9+ capturas tomadas en sesiones consecutivas mostrando, en orden:
1. Pantalla de entrada con gate "CLICK & HOLD" + arco rojo (cap parcialmente cargada; arco progresivo).
2. Home post-entrada: wordmark "DAVIDEPEROZZI" arriba-izquierda, headline "CREATIVE DEVELOPER", nav numerada arriba-derecha, "AVAILABLE FOR NEW EXCITING COLLABORATIONS AND PROJECTS" izquierda.
3. Sección 1 ("WHO'S TALKING?") con composición "Hi I'm Davide" y headline "ENJOYING MY PORTFOLIO?".
4. Sección 2 transición con "FUCK NAZIS!" como headline activo.
5. Sección de proyectos: nombres masivos (ROOTS, MACKMEDIA) + tag rows en rojo (NEXTJS · SMOOVY · DIRECTUS · DOCKER · SWARM · WORDPRESS · GREENSOCK · …).
6. Transición a SKILLS con cursor visible (círculo rojo + punto) y textura displacement de fondo.
7. Sección 3 ("Skills and Credentials") con AWARDS en outline-only XL.
8. Lista de awards (Awwwards/CSS DA/FWA/Mindsparkle/CSS Awards).
9. Sección 4 ("WANNA SEND ME A MESSAGE?") con CONTACT empezando a entrar en outline-only.

**Por qué no como archivos**: Chrome bloquea descargas múltiples programáticas en ráfaga; sólo 1 de 6 archivos generados por html2canvas+`<a download>` llegó a Downloads (la del 404 perozzi.studio, después rebautizada y movida a /outputs). Reintentos con manual transform en lugar del scroll engine produjeron capturas casi vacías. Las inline screenshots del chat (en mensajes anteriores) muestran el contenido correcto en alta calidad.

### Cómo recuperarlas como archivo si las querés:
- **Desde el chat**: clic derecho en cada imagen embebida → Guardar como… → `/outputs/`.
- **Re-tomarlas con menos friction**: con la pestaña abierta, cualquier extensión tipo "GoFullPage" o el screenshot nativo de Chrome (DevTools → Cmd+Shift+P → "Capture full size screenshot") produce los archivos completos en pocos clicks.

## Notas abiertas / preguntas por resolver
- ¿Por qué `perozzi.studio/` y `davideperozzi.com/` están en 404? ¿Migración a un sitio nuevo? ¿Sólo paths internos sirven?
- Confirmar `aminejs` (privado, alias, o despublicado).
- Comparar versión móvil de manera más detallada (sólo capturé intro mobile).
- Capturas como archivos PNG limpios (ver "Cómo recuperarlas" arriba).
