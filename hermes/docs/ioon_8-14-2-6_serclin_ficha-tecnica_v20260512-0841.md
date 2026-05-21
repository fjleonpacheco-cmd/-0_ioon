---
proyecto: 8. ioon
subtema: 8.14.2 serclin
version: v20260512-0841
autor: Francisco Javier León Pacheco
nivel: ficha técnica de proyecto cliente
estado: en-preparacion (P0-2 sin arrancar al corte)
proposito: ficha técnica del sitio web Serclin — microsite scroll-storytelling de una página, 5 escenas verticales, primer proyecto cliente real con stack creativo-web cristalizado en 8-4-12. Documento vivo que se actualiza conforme avanzan las fases P0-2.1 a P0-2.8. Al cierre alimenta a 8.5 stack como aprendizajes técnicos del primer caso real de GSAP+ScrollTrigger en producción.
depende_de:
  - fjlp_1-1_contexto-general-francisco
  - fjlp_1-2-4_organizacion-de-archivos_directriz-nombres_v20260420-1843
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255
  - ioon_8-0-2_ioon_resumen-ejecutivo_v20260420-1324
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1948 (marco v5 vigente)
  - ioon_8-4-10_planeacion-tecnica_resumen-ejecutivo-stack-y-pendientes_v20260511-1215 (P0-2 vigente)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (patrón §4.4 microsite efímero / §4.1 portafolio)
  - ioon_8-4-7_planeacion-tecnica_pendientes-tecnicos_v20260511-1215 (sub-tareas P0-2.1 a P0-2.8)
  - ioon_8-14-2-1_serclin_presentacion-1_v... (presentación previa publicada — estudio de mercado)
  - ioon_8-14-2-2_serclin_presentacion-2_v... (presentación previa publicada — ventaja competitiva)
  - ioon_8-14-2-3_serclin_presentacion-3_v... (presentación previa publicada — audiencia)
  - ioon_8-14-2-4_serclin_presentacion-4_v... (presentación previa publicada — matriz de identidad de marca)
  - ioon_8-14-2-5_serclin_presentacion-5_v... (si existe — confirmar desde 8.14.2)
alimenta_a:
  - ioon 8.5 stack (aprendizajes técnicos al cierre — primer caso real de GSAP+ScrollTrigger en producción, calibración curva, validación stack §4.4)
  - ioon 8-4-10 próxima versión del resumen ejecutivo (cuando cierre P0-2)
  - ficha del primer demo Motor de proofing (curva GSAP+ScrollTrigger ya pagada cuando arranque P0-3)
  - sub-chat 8.14.2 (bitácora viva del proyecto vive aquí)
---

# Ficha técnica · Sitio Serclin (8.14.2.6)

Microsite scroll-storytelling de una página, 5 escenas verticales. **Primer proyecto cliente real** del estudio con el stack creativo-web cristalizado en 8-4-12. Cabeza de cola P0 vigente (P0-2 en 8-4-10 v1215) por tener fecha externa pendiente con el cliente.

Esta ficha vive en el sub-chat 8.14.2 (cliente Serclin); referencias técnicas del stack viven en 8.5 stack y referencias de planeación en 8.4. Documento vivo — secciones se llenan conforme avancen las fases.

---

## 1. Identidad del proyecto

### 1.1 Cliente

- **Nombre:** Serclin.
- **Sub-chat:** 8.14.2.
- **Sector / actividad:** `[PENDIENTE — desde 8.14.2]`.
- **Contacto principal:** `[PENDIENTE — desde 8.14.2]`.
- **Relación previa con ioon:** establecida — 4 (¿o 5?) presentaciones publicadas en `/serclin/`:
  - `1_estudio-de-mercado`
  - `2_ventaja-competitiva`
  - `3_audiencia`
  - `3_matriz-de-identidad-de-marca`
  - `[PENDIENTE — confirmar si existe presentación 5 según árbol fjlp_1-2 que la lista]`
- **Ficha de cliente operativa:** `src/content/clientes/serclin.json` en repo `-0_ioon`.

### 1.2 Encargo

- **Tipo:** microsite scroll-storytelling.
- **Alcance vendible:** una página, 5 escenas verticales.
- **Naturaleza:** primer proyecto cliente real del estudio con stack post-cristalización 8-4-12. **Reemplaza a Motor de proofing en cabeza de P0** porque es venta real, no demo especulativo, y usa solo piezas vigentes del stack sin riesgo de aprendizaje en producción.
- **Por qué cabeza de P0:** única acción con cliente esperando confirmación de timeline. Por eso P0-2.1 pre-flight va primero — para validar curva antes de comprometer fecha al cliente.

### 1.3 Copy y dirección visual

**Estado:** ya cerrados al corte (declarado en 8-4-10 §1).

- **Copy fuente:** `[PENDIENTE — desde 8.14.2 / repo: ruta exacta del .md o .json donde vive]`.
- **Dirección visual cerrada:** `[PENDIENTE — desde 8.14.2 / referencia a tipografía expresiva, paleta, decisiones de moodboard]`.

---

## 2. Brief técnico

### 2.1 Una página, 5 escenas verticales

Una página HTML, scroll vertical natural, 5 secciones tipo escena que se animan con GSAP+ScrollTrigger conforme el usuario hace scroll.

### 2.2 Las 5 escenas

`[PENDIENTE — desde 8.14.2: descripción mínima de cada escena para poder maquetar y animar]`

| # | Escena | Mensaje principal | Recursos visuales | Tipo de animación dominante |
|---|---|---|---|---|
| 1 | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` |
| 2 | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` |
| 3 | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` |
| 4 | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` |
| 5 | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` | `[PENDIENTE]` |

### 2.3 Tipografía expresiva pura

- **Decisión declarada en 8-4-10:** "tipografía expresiva pura". El protagonismo visual lo lleva la tipografía, no la imagen.
- **Sistema base:** Space Grotesk (sistema tipográfico ioon vigente, resumen 8.0.2 §3).
- **Variaciones expresivas para Serclin:** `[PENDIENTE — desde 8.14.2: ¿se usa solo Space Grotesk o se introduce tipografía expresiva adicional para el caso?]`.
- **Reglas duras del sistema ioon a respetar:** sin colores fuera de paleta (ink/paper/muted/accent/border/highlight), sin sombras, sin gradientes decorativos, sin bordes redondeados >4px, sin emojis, sin íconos de color, sin badges con fondo, sin ilustraciones genéricas.

---

## 3. Stack del proyecto

### 3.1 Stack confirmado (de 8-4-12 §4.4 microsite efímero / §4.1 portafolio puro)

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | **Astro 5** | Vigente en stack (1.2 marco v5) |
| Estilos | **Tailwind 4** | Vigente |
| Componentes base | **shadcn/ui** | Vigente; usar selectivamente sólo si hace falta estado interactivo React |
| Animación de scroll | **GSAP + ScrollTrigger** | Por instalar en este proyecto — primer caso real (1.12 marco v5) |
| Microinteracciones | **Motion** | Solo si hay estado interactivo React; probablemente no necesario en microsite |
| React | **opcional** | Solo islas con estado interactivo real; preferir Astro plano |
| CMS | **ninguno** | Microsite efímero — sin Payload, sin Directus |
| Imagen | **Astro `<Image />` + Sharp built-in** | Sin Cloudinary (no es caso de fotógrafo profesional con volumen) |
| Hosting | **Coolify** sobre `servidor-ioon-2` | Patrón canónico de deploy (motor de catálogo) |
| Repo | **`fjleonpacheco-cmd/-0_ioon`** | Carpeta `[PENDIENTE — confirmar ruta dentro del mono-repo]` |

### 3.2 Patrón aplicado

Por la naturaleza del proyecto (una página, scroll-storytelling, sin estado interactivo serio, sin auth, sin CMS), aplica:

- **Patrón principal:** §4.4 microsite efímero de 8-4-12 (Astro plano, sin React si no hace falta, sin CMS).
- **Posible solapamiento con §4.1 portafolio puro** si se considera que Serclin funcionará como pieza editorial vigente (no campaña efímera). **Decisión por confirmar en P0-2.2.**

### 3.3 Plugins GSAP a activar

GSAP base + ScrollTrigger son la línea base. Plugins especializados se activan **uno-a-uno solo si una escena lo justifica concretamente**:

- **Draggable** — solo si alguna escena tiene interacción tipo galería con momentum/inercia.
- **MorphSVG** — solo si alguna escena tiene forma SVG que se transforma en otra forma SVG.
- **MotionPath** — solo si alguna escena tiene elemento siguiendo trayectoria curva.
- **Flip** — solo si alguna escena tiene cambio de layout que necesita transición FLIP.

**Estado:** `[PENDIENTE — confirmar tras descripción de las 5 escenas (§2.2)]`. Default: arrancar sin plugins, sumar solo cuando una escena concreta lo necesite.

### 3.4 Subdominio y deploy

- **Subdominio:** `[PENDIENTE — DECIDIR antes de P0-2.7 deploy]`.
  - Opción A: `serclin.ioon.mx` (subdominio del estudio).
  - Opción B: dominio propio del cliente.
- **DNS:** GoDaddy (1.15 marco v5) — A record al VPS `178.104.111.155`.
- **SSL:** automático Let's Encrypt vía Traefik.

---

## 4. Alcance acotado anti-scope-creep

Declarado explícito en 8-4-10 §4.1 P0-2 — **cualquier ampliación se vuelve fase 2 con presupuesto aparte**. No se negocia durante P0-2.

**El sitio NO incluye:**

- Sin formulario de contacto.
- Sin blog.
- Sin admin / panel de gestión.
- Sin CMS.
- Sin login / área privada.
- Sin newsletter.

**Lo que SÍ incluye:**

- Una página estática.
- 5 escenas verticales con scroll-storytelling.
- Tipografía expresiva pura.
- Animaciones con GSAP+ScrollTrigger.
- Versión responsive (mobile + desktop).
- Fallback estático con `prefers-reduced-motion`.

---

## 5. Plan de fases (de 8-4-7 v1215 / 8-4-10 §4.1)

Esfuerzo total estimado: **26-30 h reales**, ~2 semanas calendario.

| Fase | Nombre | Esfuerzo | Estado | Notas |
|---|---|---|---|---|
| **P0-2.1** | Pre-flight calibración | 4-5 h | `[PENDIENTE — primera acción]` | Mini-prototipo de 2 escenas dummy con GSAP+ScrollTrigger para validar curva antes de comprometer fecha al cliente. **Bloqueante interno para P0-2.2.** Producto: carpeta `serclin-preflight/` + nota corta de decisión (sigo o reajusto oferta) |
| **P0-2.2** | Diseño Figma | `[PENDIENTE — definir tras P0-2.1]` | `[PENDIENTE]` | Mockups de las 5 escenas, ajuste de tipografía expresiva, decisión patrón §4.4 vs §4.1 |
| **P0-2.3** | Setup proyecto | `[PENDIENTE]` | `[PENDIENTE]` | Carpeta en mono-repo, dependencias (Astro + Tailwind + shadcn/ui + GSAP + ScrollTrigger), config inicial |
| **P0-2.4** | Maquetado | `[PENDIENTE]` | `[PENDIENTE]` | HTML estructural de las 5 escenas + estilos base sin animación |
| **P0-2.5** | Animaciones | `[PENDIENTE]` | `[PENDIENTE]` | GSAP+ScrollTrigger por escena, secuencia coreografiada |
| **P0-2.6** | Polish | `[PENDIENTE]` | `[PENDIENTE]` | Refinamiento visual, performance, accesibilidad, fallback `prefers-reduced-motion` |
| **P0-2.7** | Deploy | `[PENDIENTE]` | `[PENDIENTE]` | Coolify + DNS + SSL + verificación HTTPS |
| **P0-2.8** | Iteraciones | `[PENDIENTE]` | `[PENDIENTE]` | Feedback del cliente + ajustes finales + cierre formal del proyecto |

---

## 6. Criterios de cierre

Heredados de 8-4-10 §4.1 P0-2. Se verifican antes de declarar P0-2 cerrado:

- **Lighthouse mobile ≥ 90 Performance.**
- **Lighthouse mobile ≥ 95 Accessibility.**
- **`prefers-reduced-motion`** con fallback estático funcional.
- **Ficha técnica de aprendizajes** completada (esta misma ficha actualizada al cierre, especialmente §10).
- **Cliente firma conformidad** del entregable (proceso `[PENDIENTE — desde 8.14.2: ¿hay protocolo formal de aprobación o queda en confirmación verbal?]`).

---

## 7. Decisiones por tomar durante el proyecto

| ID | Decisión | Cuándo | Estado |
|---|---|---|---|
| D1 | ¿Patrón §4.4 microsite efímero o §4.1 portafolio puro? | P0-2.2 (diseño Figma) | Pendiente |
| D2 | ¿Subdominio `serclin.ioon.mx` o dominio propio del cliente? | Antes de P0-2.7 deploy | Pendiente |
| D3 | ¿Se introduce tipografía expresiva adicional a Space Grotesk? | P0-2.2 | Pendiente |
| D4 | ¿Plugins GSAP especializados (Draggable, MorphSVG, MotionPath, Flip)? | P0-2.5 según escena lo justifique | Default no — sumar solo si concreto |
| D5 | ¿Se incluye alguna isla React con estado interactivo, o Astro plano puro? | P0-2.3 setup | Default Astro plano |
| D6 | ¿Hay versión móvil distinta o solo responsive del mismo HTML? | P0-2.4 maquetado | Default responsive |

Cada decisión se registra en §10 bitácora cuando se tome, con razonamiento.

---

## 8. Riesgos vivos

Heredados de 8-4-10 §7 que aplican específicamente:

- **Curva GSAP+ScrollTrigger sobre proyecto cliente.** Mitigado por P0-2.1 pre-flight como bloqueante interno antes de comprometer fecha. Si el pre-flight se atora, se reajusta la oferta.
- **Scope creep.** Acotado en §4 de esta ficha; cualquier ampliación = fase 2 con presupuesto aparte.
- **Fecha externa pendiente con el cliente.** Confirmar fecha solo tras P0-2.1 validar curva. No comprometer antes.
- **Performance con animaciones pesadas.** Mitigar con `prefers-reduced-motion`, lazy-loading de imágenes, build estático Astro (sin hidratación JS innecesaria).
- **Accesibilidad ignorada por enfoque visual.** Mitigar con criterio Lighthouse ≥ 95 desde P0-2.6 polish, no al cierre.

---

## 9. Aprendizajes que viajan a 8.5 stack al cierre

Sección que se cosecha al cerrar P0-2.8 y se inyecta al inventario maestro v[siguiente] de 8.5 como evidencia operativa.

Áreas de aprendizaje a registrar:

- **Curva real GSAP+ScrollTrigger** vs estimada (¿se ajustaron las 26-30 h?).
- **Patrón §4.4 vs §4.1 de 8-4-12** — cuál se usó y por qué; viaja como confirmación o ajuste al marco.
- **Suficiencia de Sharp built-in** sin Cloudinary para microsite no-fotográfico.
- **Performance Lighthouse** alcanzada vs criterio mínimo.
- **Plugins GSAP activados** (cuáles y por qué) — viaja a §1.12 marco como caso real.
- **Decisiones de subdominio y DNS** — viaja a 1.15 inventario.
- **Tiempo invertido en setup** vs maquetado vs animaciones vs polish — calibra estimaciones futuras.
- **Cualquier sorpresa, fricción o decisión inesperada** que no estaba en el marco vigente.

`[PENDIENTE — llenar al cierre P0-2.8]`

---

## 10. Bitácora de avance

Entradas cronológicas conforme avancen las fases. Cada entrada con timestamp + fase + qué se hizo + decisiones tomadas + bloqueos / desbloqueos.

### 2026-05-12 — apertura de ficha

Ficha creada como ficha viva en preparación. P0-2 sin arrancar al corte. Próxima acción operativa: P0-2.1 pre-flight Serclin (4-5 h) como bloqueante interno antes de comprometer fecha al cliente. En paralelo durante pausas: P2-4 cap OpenRouter (5 min) y P0-1.1 fase 1 Hermes (SOUL.md global + context files).

### `[PENDIENTE — entradas conforme avance P0-2.1 a P0-2.8]`

---

## 11. Referencias rápidas

| Concepto | Valor / nota |
|---|---|
| Sub-chat cliente | 8.14.2 |
| Índice de esta ficha | 8.14.2.6 |
| Presentaciones publicadas previas | `/serclin/1`, `/serclin/2`, `/serclin/3_audiencia`, `/serclin/3_matriz-de-identidad-de-marca`, `[5?]` |
| Ficha del cliente | `src/content/clientes/serclin.json` |
| Stack del proyecto | Astro 5 + Tailwind + shadcn/ui + GSAP/ScrollTrigger (sin React, sin CMS) |
| Patrón 8-4-12 aplicable | §4.4 microsite efímero (default) o §4.1 portafolio puro (a confirmar P0-2.2) |
| Esfuerzo estimado | 26-30 h reales, ~2 semanas calendario |
| Subdominio | `[PENDIENTE D2]` |
| Repo | `fjleonpacheco-cmd/-0_ioon` |
| Ruta dentro del mono-repo | `[PENDIENTE — confirmar ruta]` |
| Cliente sector | `[PENDIENTE — desde 8.14.2]` |
| Contacto principal | `[PENDIENTE — desde 8.14.2]` |
| Fecha comprometida al cliente | `[PENDIENTE — confirmar tras P0-2.1]` |

---

## 12. Vigencia y actualización

Esta ficha es **viva durante P0-2** y se actualiza con cada fase cerrada (entrada en §10 bitácora + actualización de campos pendientes correspondientes).

**Triggers de versión nueva del archivo:**

- Cierre de cualquier fase P0-2.X (genera nueva versión con `supersede_a` apuntando a la anterior).
- Cierre formal del proyecto (P0-2.8) — versión final con §9 aprendizajes completo.
- Cualquier cambio sustantivo (decisión D1-D6 cerrada, riesgo materializado, scope creep aprobado como fase 2).

Al cierre de P0-2.8, esta ficha:

1. Se marca como `estado: cerrado-publicado`.
2. Se cosecha §9 aprendizajes y se inyecta al inventario maestro v[siguiente] de 8.5.
3. Se referencia desde 8-4-10 próximo (resumen ejecutivo) como caso real cerrado.
4. Se mantiene como antecedente para fichas futuras de proyectos cliente con stack creativo-web.

---

*Ficha creada el 12 de mayo de 2026 08:41 UTC-6 al inicio de P0-2 vigente. Documento vivo — actualizar conforme avancen las fases. Llenar placeholders `[PENDIENTE — desde 8.14.2]` con info del sub-chat de Serclin antes de arrancar P0-2.1 pre-flight para no acumular incógnitas durante el sprint.*
