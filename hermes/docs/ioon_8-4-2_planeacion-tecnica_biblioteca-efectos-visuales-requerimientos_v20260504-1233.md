---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260504-1233
autor: Francisco Javier León Pacheco
nivel: subtema · documento de requerimientos
estado: superado-por-marco-v4 — recreado como histórico. Ver ioon_8-4-13_v20260511-1139 para corrección de stack (OGL → R3F+drei).
proposito: trasladar al chat 8.4 la propuesta de incorporar una biblioteca interna de efectos visuales a las demos del catálogo, fijando aquí los requerimientos y criterios de evaluación antes de que 8.5 inventaríe herramientas concretas
depende_de:
  - fjlp_1-1_contexto-general-francisco (perfil personal)
  - fjlp_1-2_organizacion-de-archivos (convención de nombres)
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255 (chat maestro de ioon)
  - ioon_8-0-2_ioon_resumen-ejecutivo_v20260420-1324 (estado del proyecto)
  - ioon_8-4-1_planeacion-tecnica_contexto_v20260422-1618 (contexto del sub-chat 8.4)
  - ioon_8-5-1_stack_contexto_v20260422-1656 (contexto del sub-chat 8.5)
  - ioon_catalogo_v20260420-1115 (catálogo de demos)
  - fjlp_1-4-1-6_fichas-de-referencias_ficha-website-davide-perozzi-2k19_v20260503-2102 (referencia que origina la propuesta)
alimenta_a:
  - ioon_8-5-2_stack_biblioteca-efectos-visuales-implementacion_v20260504-1233 (inventario de herramientas; bloqueado hasta validar requerimientos aquí)
  - 8.6 website (consumirá los componentes resultantes)
  - 8.7 catalogo (consumirá los componentes resultantes)
  - 8.10 identidad-visual (eventual actualización de directrices con excepciones documentadas)
---

# Requerimientos — biblioteca interna de efectos visuales para demos

> **Nota histórica (mayo 11 2026):** este documento queda **superado** por la canonización del Marco v4 (`ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1115`) y por la nota de corrección `ioon_8-4-13_v20260511-1139`. La recomendación original (OGL como base) fue invalidada por §1.14 del Marco v4 que canoniza R3F+drei. Se conserva como **historia de la deliberación**. Para decisiones operativas, usar 8-4-13.

Documento de entrada para el chat **8.4 planeación-técnica**. Origen: análisis de la referencia **Davide Perozzi 2k19** (ficha `fjlp_1-4-1-6`). La propuesta no es copiar a Davide, sino **destilar técnicas concretas** y proveerlas como capacidad reusable de las demos de `catalogo.ioon.mx`, configurables por cliente.

## 1. Origen del input

- Sesión de análisis en el chat **fjlp 1.4.1 fichas-de-referencias**, ficha del portfolio `2k19.perozzi.studio` y de su autor.
- Conclusión operativa: hay un cluster de técnicas (WebGL displacement, hover líquido, transiciones de imagen, texto deformable, fondos atmosféricos) que no son herramientas SaaS de inventario sino **componentes de producto** que extenderían la capacidad expresiva de las demos del catálogo.
- Queda fuera del alcance de este documento: la motivación estratégica (vive en 8.1 esencia), el contenido editorial de cada demo (vive en su 8.14.X), y la curaduría de la referencia (vive en 1.4.1).

## 2. Capacidad que se propone agregar

Una biblioteca interna — nombre tentativo `ioon-effects` — que provea **componentes React drop-in** para:

1. **Hover-displacement sobre imágenes**: deformación sutil de fotos al pasar el cursor, sin reemplazar la foto.
2. **Transición WebGL entre dos imágenes**: reemplazo del fade tradicional por una mezcla con mapa de displacement.
3. **Texto deformable / líquido**: títulos o section-markers que ondulan sutilmente, vía SVG `<feTurbulence>` + `<feDisplacementMap>` (sin WebGL) o vía shader (con WebGL) según el caso.
4. **Fondo atmosférico generativo**: canvas full-bleed con ruido animado, opacidad muy baja (~5–10 %), detrás de una sección.

Cada efecto es un componente independiente. Se pueden usar por separado o combinarse según lo que pida el demo.

## 3. Mapeo efecto → demo donde se prueba

Distribuido por demo para que cada vertical desarrolle su firma técnica diferenciada:

| Efecto | Demo de prueba | Justificación |
|---|---|---|
| Texto líquido (SVG) | `catalogo.ioon.mx` — heading hero | Más barato, máxima visibilidad, valida la ruta SVG sin librerías. |
| Transición de imagen (WebGL) | `demo-arquitectura-1` — hero slideshow | El slideshow ya existe; reemplazo de transición es contenido. |
| Hover-displacement (WebGL) | `demo-fotografia-1` — grid de portafolio | El sitio es portfolio fotográfico, el hover ya es funcional. |
| Fondo atmosférico (WebGL) | demo futura: consultoría / wellness / agencia | Encaja en sitios contemplativos sin foto pesada; reservado para próxima alta. |

Premisa: **un efecto fuerte por demo** (no acumular dos efectos pesados en un mismo sitio). El cliente que personalice el demo recibe una sola firma técnica, no un sampler.

## 4. Requerimientos no-negociables

Estos requerimientos son criterios de aceptación de cualquier solución que 8.5 proponga:

### 4.1 Compatibilidad de stack
- Compatible con el stack vigente: **Vite + React 18** (catálogo y demos actuales) y, como segundo destino, **Astro 5** (sitio principal `ioon.mx` y futuras presentaciones).
- Componentes deben ser **client-only** cuando usen WebGL; sin SSR.
- Lazy-load del WebGL: no se debe ejecutar antes de que el componente esté en viewport.

### 4.2 Reusabilidad
- **Un solo paquete interno** consumido por todas las demos. No copiar componentes entre repos.
- API estable por componente: las **personalizaciones por cliente** se expresan como props, no como forks.
- Props mínimas esperadas por componente: `images` o `src`, `intensity`, `duration`, `accent`/`tint`, `displacementMap` (cuando aplique), `disabled` (para fallback explícito).

### 4.3 Soberanía tecnológica
- Solo dependencias **OSS con licencia permisiva** (MIT, BSD, Apache 2.0). Coherente con la filosofía operativa de ioon ("Soberanía Tecnológica + Estética de Autor").
- Cada candidata debe quedar registrada en 8.5 con su licencia, mantainer, link y fecha de evaluación.

### 4.4 Performance
- Bundle adicional por demo: **≤ 80 KB gzipped** (suma de todos los efectos activos en ese demo).
- 60 fps sostenidos en MacBook reciente; degradación elegante a 30 fps o desactivación en dispositivos sin WebGL o de bajo rendimiento.
- `IntersectionObserver` obligatorio: pausa de render cuando el componente sale del viewport.
- Half-resolution automático en pantallas <768 px o cuando `prefers-reduced-motion: reduce`.

### 4.5 Accesibilidad y degradación
- Si WebGL falla o el navegador no lo soporta: **fallback automático** al comportamiento original (foto sin distorsión, slideshow con fade CSS, texto sin deformación).
- Respeto a `prefers-reduced-motion`: cuando el usuario lo declara, los efectos se atenúan o se desactivan.
- El contenido (texto, imagen) debe seguir siendo leído por lectores de pantalla; los efectos son decorativos.

### 4.6 Personalización por cliente
- Lo que cambia entre clientes: imágenes, color de acento (`tint`), elección de mapa de displacement de una **biblioteca interna** (`_maps/`) con 5–6 texturas base, e intensidad.
- Lo que no cambia: el componente, el shader, la API.
- El mapa de displacement elegido **se documenta en la ficha del cliente** (ej. "Cano Vera — mapa: agua-suave; intensidad: 0.3; tint: #a8835f").

### 4.7 Mantenibilidad
- Una sola persona (yo) debe poder mantener el paquete sin depender de un especialista en shaders.
- Los shaders se mantienen mínimos (≤ 50 líneas de GLSL por efecto) y vienen con un breve docstring que explique cada parámetro.
- Cada componente con su propio README y ejemplo de uso en el repo.

## 5. Excepciones a las directrices ioon que esto implica

Las directrices visuales actuales (v20260413) declaran "sin gradientes decorativos, sin sombras, animaciones ≤ 0.4 s". Adoptar estos efectos requiere **excepciones documentadas, no rupturas**:

| Directriz original | Excepción propuesta | Alcance de la excepción |
|---|---|---|
| Sin gradientes decorativos | Permitidos en hero del demo cuando se usan como capa de displacement WebGL | Solo dentro del componente del efecto; resto del sitio mantiene la regla. |
| Animaciones ≤ 0.4 s | Transiciones de hero hasta 1.0 s | Solo `<ImageTransition>`; resto del sitio mantiene 0.4 s. |
| Sin colores fuera de paleta | `accent` por cliente puede vivir fuera de la paleta ioon | Solo en lugares declarados (tint del displacement, dot de badge, underline de CTA); resto monocromo. |

**Decisión que falta:** si estas excepciones se incorporan a 8.10 identidad-visual como "directrices v20260504 con anexo de excepciones para producto demo", o si se mantienen como nota local del producto sin tocar las directrices generales del estudio.

## 6. Criterios de evaluación de candidatas (para 8.5)

Cuando 8.5 proponga librerías concretas, cada candidata se mide contra:

1. **Licencia** OSS permisiva (MIT/BSD/Apache).
2. **Tamaño** gzipped (objetivo: ≤ 50 KB por librería; ideal el más chico que cumpla).
3. **Mantenimiento activo** (último commit < 12 meses, issues respondidos).
4. **Documentación** y ejemplos disponibles.
5. **Comunidad / ecosistema** (mejor si tiene helpers React listos, no obligatorio).
6. **Costo cognitivo**: cuánto código nuevo tengo que escribir yo para llevarla a producción.
7. **Cobertura del requerimiento**: cuántos de los 4 efectos resuelve la misma librería (mejor si una sola cubre varios).

## 7. Decisiones a fijar en este chat antes de pasar a 8.5

8.4 debe cerrar lo siguiente para que 8.5 pueda proponer herramientas concretas:

- [ ] Confirmar **alcance** (los 4 efectos vs. arrancar con un subconjunto).
- [ ] Confirmar **mapeo efecto → demo** de la sección 3 (o ajustarlo).
- [ ] Confirmar los **bundles límites** (§4.4) y los **criterios de degradación** (§4.5).
- [ ] Decidir el **tratamiento de las excepciones** a directrices (§5): documentarlas en 8.10 o como nota local.
- [ ] Aprobar el **nombre del paquete interno** (`ioon-effects` u otro) y su **ubicación en el monorepo** (`packages/` vs. raíz).
- [ ] Aprobar los **criterios de evaluación** (§6) o ajustarlos.
- [ ] Definir **orden de adopción** (sugerido: texto líquido SVG → transición de imagen → hover displacement → fondo atmosférico).

## 8. Plan de adopción sugerido (incremental)

Cada paso valida la decisión técnica antes de comprometer la siguiente:

1. **Fase 1 — SVG puro, cero librería.** Texto líquido en heading del catálogo. Costo bundle: 0. Valida ruta SVG y la sensación general en producción.
2. **Fase 2 — Primer efecto WebGL.** Transición de imagen en hero de `demo-arquitectura-1`. Acá se monta la base del paquete `ioon-effects` y la primera librería. Valida criterios de §4 y §6.
3. **Fase 3 — Segundo efecto WebGL.** Hover displacement en grid de `demo-fotografia-1`. Reusa la base de fase 2; bundle adicional bajo.
4. **Fase 4 — Fondo atmosférico.** Cuando se cree la demo nueva (consultoría / wellness / agencia). El paquete ya está maduro.

Entre fase y fase: revisión de bundle real, performance real en mobile, fallback real.

## 9. Cross-references al inventario (8.5)

El documento espejo en 8.5 — **`ioon_8-5-2_stack_biblioteca-efectos-visuales-implementacion_v20260504-1233.md`** — propone candidatas concretas (OGL, Pixi.js, SVG nativo) **bloqueadas hasta que 8.4 cierre los puntos del §7**. Mientras tanto, 8.5 funciona como _shortlist_ de evaluación, no como decisión.

## 10. Resumen ejecutivo (1 párrafo)

Se propone agregar a las demos del catálogo de ioon una capacidad de efectos visuales (WebGL + SVG) destilada del análisis de Davide Perozzi 2k19, materializada como un paquete React interno (`ioon-effects`) consumido por todas las demos, configurable por cliente vía props (imágenes, tint, mapa, intensidad), con licencias OSS permisivas, bundle ≤ 80 KB por demo, fallback automático sin WebGL, respeto a `prefers-reduced-motion` y excepciones documentadas a las directrices visuales actuales. La adopción es incremental, empezando por SVG puro (cero librería) en el catálogo y avanzando demo por demo. 8.4 fija requerimientos y criterios; 8.5 inventaria herramientas; 8.6 / 8.7 las consumen.
