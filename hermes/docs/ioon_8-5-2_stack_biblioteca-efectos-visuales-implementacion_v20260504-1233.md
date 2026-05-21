---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260504-1233
autor: Francisco Javier León Pacheco
nivel: subtema · shortlist de herramientas
estado: superado-por-marco-v4 — recreado como histórico. La recomendación final (OGL preferida) fue invalidada por §1.14 del Marco v4. Ver ioon_8-4-13_v20260511-1139 para corrección.
proposito: shortlist de herramientas candidatas para implementar la biblioteca interna de efectos visuales `ioon-effects`. Bloqueado hasta que 8.4 fije los requerimientos en `ioon_8-4-2_planeacion-tecnica_biblioteca-efectos-visuales-requerimientos_v20260504-1233`. Este documento es _evaluación_, no _decisión_.
depende_de:
  - fjlp_1-1_contexto-general-francisco (perfil personal)
  - fjlp_1-2_organizacion-de-archivos (convención de nombres)
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255 (chat maestro de ioon)
  - ioon_8-0-2_ioon_resumen-ejecutivo_v20260420-1324 (estado del proyecto)
  - ioon_8-5-1_stack_contexto_v20260422-1656 (contexto del sub-chat 8.5)
  - ioon_8-4-2_planeacion-tecnica_biblioteca-efectos-visuales-requerimientos_v20260504-1233 (REQUERIMIENTOS — bloqueante)
  - fjlp_1-4-1-6_fichas-de-referencias_ficha-website-davide-perozzi-2k19_v20260503-2102 (referencia)
alimenta_a:
  - ioon_8-5-9_stack_log-decisiones (entrada nueva cuando se elija)
  - 8.6 website / 8.7 catalogo (consumidores finales)
---

# Inventario candidato — biblioteca de efectos visuales `ioon-effects`

> **Nota histórica (mayo 11 2026):** este documento es la shortlist original que recomendaba **OGL** como base. El Marco v4 (`ioon_8-4-2_v20260511-1115`) canonizó **R3F + drei** como motor 3D/WebGL del estudio (§1.14), lo que invalida la conclusión de §4 de este archivo. Se conserva como historia de la deliberación. Ver `ioon_8-4-13_v20260511-1139` para la corrección.

Shortlist de herramientas para implementar los 4 efectos definidos en **`ioon_8-4-2_planeacion-tecnica_biblioteca-efectos-visuales-requerimientos`**. Este documento sigue la regla del chat 8.5 — **no recomienda herramientas mientras los requerimientos de 8.4 no estén fijados**. Lo presentamos como evaluación previa: cuando 8.4 cierre, esto se vuelve decisión y se mueve al log.

## 1. Estado de bloqueo

⛔ **Bloqueado.** Antes de incorporar cualquiera de estas herramientas al inventario maestro:

- 8.4 debe cerrar los 7 puntos de su §7 (alcance, mapeo, bundle, excepciones, nombre del paquete, criterios, orden).
- Una vez cerrados, este documento se actualiza con la decisión, se genera la entrada correspondiente en `ioon_8-5-9_stack_log-decisiones`, y la herramienta elegida pasa al inventario maestro `ioon_8-5-2_stack_inventario-maestro` con su ficha estándar.

## 2. Necesidad técnica resumida

Cuatro efectos a implementar; la herramienta o combinación elegida debe cubrirlos:

1. **Hover-displacement** — deformación de imagen al hover.
2. **Transición de imagen** — reemplazo de fade entre dos fotos.
3. **Texto líquido** — deformación tipográfica sutil.
4. **Fondo atmosférico** — canvas full-bleed con ruido animado.

Detalle completo de requerimientos en `ioon_8-4-2_planeacion-tecnica_biblioteca-efectos-visuales-requerimientos`.

## 3. Candidatas evaluadas

### 3.1 OGL (preferida para WebGL)

| Campo | Valor |
|---|---|
| Tipo | Micro-librería WebGL |
| Sitio | https://github.com/oframe/ogl |
| Licencia | MIT |
| Tamaño | ~50 KB minified gzipped |
| Mantenimiento | Activo (Nathan Gordon). |
| API | Modern (ES modules); sin React-specific helpers (se monta vía `useEffect`). |
| Cubre | Efectos 1, 2, 3 (vía shader) y 4 (vía shader). |
| Costo cognitivo | Medio: requiere escribir GLSL pequeño (≤50 líneas por efecto). |
| Pro | Bundle muy chico, control total, estética alineada con la práctica de Davide Perozzi y el cluster Awwwards 2018-2020. |
| Contra | Hay que escribir shaders (no es plug-and-play). |

**Veredicto preliminar:** la elección más alineada con "Estética de Autor + Soberanía Tecnológica" si se confirma que los 4 efectos comparten substrate WebGL.

### 3.2 Pixi.js v8 (alternativa de menor curva)

| Campo | Valor |
|---|---|
| Tipo | Framework WebGL 2D |
| Sitio | https://github.com/pixijs/pixijs |
| Licencia | MIT |
| Tamaño | ~150 KB minified gzipped (puede subir según features) |
| Mantenimiento | Muy activo (PixiJS Foundation). |
| API | Imperativa, con `DisplacementFilter` y `NoiseFilter` listos sin shader propio. |
| Cubre | Efectos 1, 2, 4 (built-in filters); efecto 3 menos elegante. |
| Costo cognitivo | Bajo: copy-paste de patrones documentados; sin GLSL. |
| Pro | Curva de entrada más suave; muy documentado. |
| Contra | Bundle 3× más grande; estética más "genérica Pixi" (todos los sitios con `DisplacementFilter` se huelen iguales); menos control fino. |

**Veredicto preliminar:** plan B si se prioriza tiempo de implementación sobre el carácter estético.

### 3.3 SVG nativo — `<feTurbulence>` + `<feDisplacementMap>` (sin librería)

| Campo | Valor |
|---|---|
| Tipo | Filtros SVG built-in (especificación W3C). |
| Sitio | https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap |
| Licencia | Estándar web. |
| Tamaño | 0 KB. |
| Mantenimiento | Estándar — sin riesgo de abandono. |
| Cubre | Efecto 3 (texto líquido). Limitado para 1 y 2. No cubre 4 generativo. |
| Costo cognitivo | Bajo: 30 líneas de SVG declarativo + ajuste de parámetros. |
| Pro | **Cero bundle**, performance GPU-accelerated, animable con CSS o JS, ningún riesgo de cadena de dependencias. |
| Contra | Reactividad al mouse menos elegante; no sirve para texturas complejas o ruido animado avanzado. |

**Veredicto preliminar:** **necesaria de adoptar igual** para el texto líquido — es la mejor opción técnica disponible y es independiente de la decisión OGL/Pixi.

### 3.4 hover-effect (Robin Delaporte) — descartada

| Campo | Valor |
|---|---|
| Tipo | Librería específica de hover-displacement. |
| Sitio | https://github.com/robin-dela/hover-effect |
| Licencia | MIT |
| Tamaño | ~10 KB |
| Cubre | Solo efecto 1. |
| Mantenimiento | Inactivo (~5 años sin commits relevantes). |

**Veredicto preliminar:** descartada por mantenimiento y porque encierra en un solo efecto.

### 3.5 curtains.js — descartada

| Campo | Valor |
|---|---|
| Tipo | Librería de "WebGL planes" (HTML elements como texturas WebGL). |
| Sitio | https://github.com/martinlaxenaire/curtainsjs |
| Licencia | MIT |
| Tamaño | ~80 KB |
| Cubre | Efectos 1 y 2. |
| Mantenimiento | Activo pero con poco uso comparado con OGL/Pixi. |

**Veredicto preliminar:** descartada porque OGL es más liviano y más flexible.

## 4. Recomendación tentativa (no decisión)

Sujeto a validación en 8.4:

- **Texto líquido** (efecto 3) → **SVG nativo**. Independiente del resto. Adoptable de inmediato.
- **WebGL** (efectos 1, 2, 4) → **OGL** como substrate único. Una librería para los tres.
- Estructura: paquete interno único `ioon-effects` (nombre tentativo de §7 de 8.4) que exporta los 4 componentes y comparte un módulo base `_ogl.js` + carpeta `_shaders/` + biblioteca de mapas `_maps/`.

Total bundle proyectado por demo (worst case con 2 efectos WebGL activos): ~70 KB gzipped — dentro del límite de 80 KB de 8.4 §4.4.

## 5. Estructura de paquete propuesta

```
packages/
  ioon-effects/
    package.json
    README.md
    src/
      index.js                       (re-exports)
      HoverDisplacement.jsx          (efecto 1, OGL)
      ImageTransition.jsx            (efecto 2, OGL)
      LiquidText.jsx                 (efecto 3, SVG)
      LiquidTextWebGL.jsx            (efecto 3, OGL — alterno)
      AtmosphericBackground.jsx      (efecto 4, OGL)
      _ogl.js                        (helpers WebGL compartidos)
      _shaders/
        displacement.frag.glsl
        transition.frag.glsl
        noise.frag.glsl
      _maps/
        humo.png
        agua.png
        papel.png
        organico.png
        marmoleo.png
        liquido.png
```

Cada componente, su propio README + ejemplo de uso. Documentado para que se pueda mantener sin saber escribir shaders desde cero.

## 6. Mapeo efecto → demo (espejo de 8.4 §3)

| Efecto | Demo de prueba | Subdominio |
|---|---|---|
| Texto líquido (SVG) | catálogo principal | `catalogo.ioon.mx` |
| Transición de imagen (OGL) | demo arquitectura | `demo-arquitectura-1.ioon.mx` |
| Hover-displacement (OGL) | demo fotografía | `demo-fotografia-1.ioon.mx` |
| Fondo atmosférico (OGL) | demo futura (consultoría/wellness) | pendiente alta |

## 7. Lo que NO se va a inventariar aquí (recordatorio)

Para mantener el alcance del 8.5 limpio:

- La **biblioteca de mapas de displacement** (`_maps/`) es activo de **diseño**, no SaaS. Se versiona con el repo. Si en algún momento se externaliza (ej. CDN propio), se evalúa entonces.
- Las **excepciones a directrices visuales** (gradientes en hero, animaciones > 0.4 s) son trabajo de **8.10 identidad-visual**, no de 8.5.
- La **adopción incremental** (orden de demos a tocar) es trabajo de **8.6 website**, **8.7 catalogo** y eventualmente **8.14.X** por cliente; 8.5 sólo provee la herramienta.

## 8. Próximo paso operativo

1. 8.4 cierra su §7.
2. Cuando se confirme alcance y orden:
   - Este documento se actualiza con la decisión final y se mueve a `ioon_8-5-X_stack_ioon-effects-ficha_v...md` siguiendo la ficha estándar de §6 del contexto de 8.5 (nombre, plan, costo, periodicidad, renovación, titular, credenciales, fecha de alta, estado, enlaces de soporte, notas).
   - Se genera entrada en `ioon_8-5-9_stack_log-decisiones` registrando: candidatas evaluadas, criterio decisor, descartadas y por qué.
   - Se mueve al **inventario maestro** (`ioon_8-5-2_stack_inventario-maestro_v...md`) en una categoría nueva: "Producto / componentes web internos".
3. Recién entonces 8.6 / 8.7 / 8.14.X pueden empezar a consumirla.

## 9. Resumen ejecutivo (1 párrafo)

Tres candidatas viables: **OGL** (MIT, ~50 KB, requiere shaders cortos, control total — preferida estéticamente y por bundle), **Pixi.js v8** (MIT, ~150 KB, sin shaders pero más genérico — plan B), y **SVG nativo** (`<feTurbulence>`/`<feDisplacementMap>`, 0 KB, perfecto para texto líquido). Recomendación tentativa: SVG para texto líquido + OGL para los tres efectos WebGL, todo dentro de un paquete interno `ioon-effects` consumido por todas las demos. Bloqueado hasta que 8.4 fije alcance, bundles, excepciones a directrices y orden de adopción.
