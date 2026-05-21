---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260514-2000
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente · fase C
proposito: cristalizar la arquitectura de captura/notas/wiki del estudio en modelo C híbrido fase C. Define la división canónica de superficies entre AppFlowy (captura cotidiana + proyectos), AFFiNE.pro (visual/pizarras), SilverBullet (wiki técnico scriptable), y cómo el sistema fjlp 1.2.4 markdown sigue siendo la fuente canónica subyacente
depende_de:
  - fjlp 1.2 organización de archivos (sistema canónico de naming markdown)
  - fjlp 1.2.4 (estructura jerárquica X.Y.Z)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía self-hosted general)
alimenta_a:
  - ioon 8-5-2 inventario maestro (filas de captura/notas/wiki)
  - ioon 8-4-7 pendientes técnicos (P0-X activación AppFlowy + AFFiNE + SilverBullet)
  - fjlp 1.5 aprendizaje (decisión documentada también ahí porque atraviesa rol personal del autor)
---

# Decisión canónica — Modelo C híbrido fase C para captura, notas y wiki

Decisión cristalizada el 14 de mayo de 2026. Cierra la búsqueda iterativa A → B → C que arrastraba el estudio buscando la arquitectura correcta de captura/notas/wiki.

---

## 1. Idea central (1 frase)

Tres herramientas open source coexisten en roles separados, **sin canibalizarse**: **AppFlowy** para captura cotidiana + proyectos · **AFFiNE.pro** para superficies visuales y pizarras · **SilverBullet** para wiki técnico scriptable — todas sobre la fuente canónica subyacente del sistema fjlp 1.2.4 markdown que vive en el repo `-0_ioon`.

---

## 2. Contexto e historia de la búsqueda

ioon arrancó con notas markdown puras en repo git (sistema fjlp 1.2.4) · primera versión funcional pero con fricciones:

- Captura cotidiana desde móvil es dolorosa (editar markdown en iOS sin herramienta dedicada).
- Visualización de pizarras / arquitecturas no funciona en markdown puro.
- Búsqueda full-text en repo grande se vuelve lenta.
- Sin tags · sin backlinks · sin vistas alternativas (kanban, timeline, calendar).

**Modelo A** (descartado · principios de mayo): "una sola herramienta universal" — Notion / Obsidian / AppFlowy single-tool. Tentación clásica, falla por el mismo motivo siempre: ninguna herramienta es buena en captura rápida **y** visual de pizarras **y** wiki técnico scriptable. Forzar una sola → todo sale mediocre.

**Modelo B** (descartado · mediados de mayo): "dos herramientas: captura + visual". AppFlowy + AFFiNE. Mejor que A, pero deja huérfano el wiki técnico (docs de arquitectura, runbooks, referencia de comandos). En markdown puro la fricción persiste.

**Modelo C híbrido fase C** (decisión actual): tres herramientas con superficies claras. Cada una con su fuerza, sin solapamiento.

---

## 3. Decisión — las tres superficies

### 3.1 AppFlowy — captura cotidiana + proyectos

- **Origen:** [appflowy.io](https://www.appflowy.io) · open source AGPL-3 · clon de Notion pero local-first y self-hostable.
- **Rol:** todo lo que **fluye día a día** — captura de ideas desde móvil, lista de tareas activas, tracking de proyectos cliente (uno por cliente: Serclin · Educativo Antequera · Hanseatic Pharma · Cano Vera prospect · etc.), bitácora diaria del estudio.
- **Por qué AppFlowy:**
  - UX cercana a Notion (curva cero para quien viene de ahí).
  - App móvil decente (la fricción de captura desde teléfono es lo que rompe sistemas markdown puros).
  - Self-hostable cuando se quiera (fase 1: cloud sync de AppFlowy · fase 2: self-host con AppFlowy Cloud edition en Coolify).
  - Schemas custom · vistas múltiples (table, board, calendar, gallery).
- **Hosting fase 1:** AppFlowy Cloud (free tier para arranque).
- **Hosting fase 2:** self-host en Coolify (`flow.ioon.mx`) cuando vol justifique.
- **Sync con canon markdown:** export periódico de proyectos completados al repo `-0_ioon` como notas fjlp 1.2.4 canónicas (las notas cristalizadas viven en el repo · AppFlowy es la sala de trabajo, no el archivo).

### 3.2 AFFiNE.pro — visual y pizarras

- **Origen:** [affine.pro](https://affine.pro) · open source MIT · workspace híbrido (docs + whiteboard + database).
- **Rol:** todo lo que **necesita ojo visual** — mapas de arquitectura del stack ioon · diagramas de flujo de cliente · pizarras de brainstorm · sketches de UI · timeline visual de proyectos · matrices de decisión 2x2.
- **Por qué AFFiNE:**
  - **Whiteboard real** integrado con docs (no es solo Excalidraw embebido, son superficies de primer orden).
  - Bloques editables que viven tanto en doc como en whiteboard (un mismo bloque puede aparecer en dos vistas).
  - MIT pura · self-hostable con un Docker compose.
  - UX visual más cercana a Figma + Notion fusionados que a Miro.
- **Hosting fase 1:** affine.pro cloud (free tier).
- **Hosting fase 2:** self-host en Coolify (`canvas.ioon.mx`) cuando vol justifique.
- **Sync con canon markdown:** los outputs visuales se exportan como PNG/PDF al repo `-0_ioon` en `docs/visual/` con nombre fjlp 1.2.4 (`ioon_8-4-XX_visual_<tema>_v<timestamp>.png`).

### 3.3 SilverBullet — wiki técnico scriptable

- **Origen:** [silverbullet.md](https://silverbullet.md) · open source MIT · wiki personal markdown-first con scripting embebido.
- **Rol:** todo lo que es **wiki técnico** — documentación de arquitectura ioon, runbooks de operación (cómo redeploy en Coolify · cómo restore de B2 · cómo provisionar un cliente nuevo), referencia de comandos · glosario técnico vivo.
- **Por qué SilverBullet:**
  - **Markdown puro** como almacenamiento (sin DB propietaria · cada nota es un `.md`).
  - **Scripting embebido** — bloques de código JavaScript que se ejecutan en la nota (queries sobre las propias notas, automaciones, dashboards calculados).
  - Self-hostable trivial (single binary o Docker, sin DB).
  - Cero lock-in: si SilverBullet muere, las notas siguen siendo markdown plano.
- **Hosting:** self-host en Coolify desde día 1 (`wiki.ioon.mx`).
- **Sync con canon markdown:** SilverBullet apunta directamente a un subset del repo `-0_ioon` (subcarpeta `docs/wiki/`) · las notas en SilverBullet **son** notas del repo · sin sincronización compleja.

---

## 4. División de superficies — regla operativa

Cuándo va una nota a cada superficie:

| Tipo de contenido | Superficie canónica | Por qué |
|---|---|---|
| Idea suelta capturada desde móvil | AppFlowy → eventualmente fjlp markdown si se cristaliza | UX móvil |
| Lista de tareas semanal | AppFlowy | Vista board · checkbox · móvil |
| Tracking de proyecto cliente | AppFlowy (uno por cliente) | Schemas custom · vistas múltiples · calendar |
| Bitácora diaria del estudio | AppFlowy (database con vista calendar) | Captura cotidiana |
| Mapa de arquitectura del stack | AFFiNE whiteboard | Visual · cajitas y flechas |
| Diagrama de flujo de cliente | AFFiNE whiteboard | Visual |
| Sketch de UI para demo | AFFiNE whiteboard | Visual |
| Runbook "cómo X" | SilverBullet wiki | Markdown · scripting opcional |
| Referencia de comandos | SilverBullet wiki | Búsqueda full-text |
| Glosario técnico | SilverBullet wiki | Wiki real con links |
| Decisión canónica (esta nota) | fjlp markdown en repo `-0_ioon/docs/` | Canon · versionado · referenciable |
| Plan de proyecto cristalizado | fjlp markdown en repo `-0_ioon/docs/` | Canon |
| Inventario maestro | fjlp markdown en repo `-0_ioon/docs/` | Canon |

**Regla crítica:** **el canon vive en el repo `-0_ioon/docs/` como markdown fjlp 1.2.4.** AppFlowy, AFFiNE y SilverBullet son **superficies de trabajo** que alimentan o consumen del canon. Si una nota se cristaliza (alcanza estado "vigente"), migra al repo · si está en flujo, vive en la superficie de trabajo apropiada.

---

## 5. Razones de la decisión

### 5.1 No existe herramienta única que cubra los 3 perfiles bien

Cada intento de "una sola" termina sacrificando una de las tres dimensiones (captura cotidiana móvil · visual whiteboard real · wiki scriptable). Aceptar tres herramientas separadas es realismo, no lujo.

### 5.2 Todas son open source con filosofía alineada

AppFlowy (AGPL) · AFFiNE (MIT) · SilverBullet (MIT) — todas self-hostables · todas con datos en formato abierto · todas con salida ordenada si una muere.

### 5.3 No se canibalizan (división clara)

La regla del §4 evita el problema típico de "todo en todo" que vacía sistemas. Cada superficie tiene su rol, los usuarios disciplinados respetan la división.

### 5.4 El canon markdown sigue siendo la fuente de verdad

El repo `-0_ioon/docs/` con markdown fjlp 1.2.4 sigue siendo lo que se respeta y se referencia. Las herramientas son consumidoras/productoras, no reemplazos del canon. Esto importa porque el canon es **inmune a cambio de herramienta** — si AppFlowy muere, el canon sobrevive.

### 5.5 SilverBullet sincroniza con el repo sin ETL

SilverBullet lee/escribe sobre el filesystem directamente. Apuntarlo a `docs/wiki/` significa que las notas wiki **son** archivos del repo · sin export/import · sin sync drift.

---

## 6. Alternativas evaluadas y descartadas

### Solo Obsidian
Excelente para markdown · plugins poderosos · sin app móvil de captura rápida (es editor, no inbox). Falla en captura cotidiana móvil + en visual de whiteboards reales (Excalidraw plugin existe pero es mid-tier). Descarte como "solución única".

### Solo Notion
SaaS · UX excelente · lock-in fuerte · sin self-hosting · markdown export es lossy. Filosofía rota. Descarte por filosofía.

### Solo AppFlowy
Buena base · pero el whiteboard de AppFlowy es elemental · sin scripting wiki. Cubre 1/3 de los perfiles bien. Descarte como solución única.

### Logseq
Markdown-first · outliner · backlinks. Buena para wiki personal · sin whiteboard real · UX móvil mejorando pero no es captura primero. Descarte por mismatch parcial.

### Tana
SaaS · supernodes potentes · costoso al escalar · lock-in. Descarte por filosofía + costo.

### Anytype
Open source · local-first · multi-plataforma · todavía menos maduro que AppFlowy para uso productivo. Reevaluable en 2027. Descarte por madurez actual.

### Miro / FigJam / Whimsical para whiteboard
SaaS · costo recurrente · sin integración real con docs/wiki. AFFiNE colapsa whiteboard + docs en una sola superficie. Descarte por costo + falta de integración.

### Excalidraw standalone
Excelente para diagramas simples · sin docs integrados · sin colaboración real. AFFiNE incluye Excalidraw-like pero con docs encima. Descarte por scope incompleto.

### Outline, BookStack, MediaWiki (wikis tradicionales)
Bases de datos pesadas · UX antigua · sin scripting embebido. SilverBullet en markdown puro + JavaScript embebido es UX 10 años más moderna. Descarte por UX.

---

## 7. Activación por fases

### Fase A — instalación y prueba (semanas 1-4 post-decisión)

1. AppFlowy Cloud free tier · alta de cuenta · primer workspace "ioon".
2. AFFiNE.pro cloud free tier · alta de cuenta · primer workspace "ioon".
3. SilverBullet self-host en Coolify (`wiki.ioon.mx`) apuntando a `docs/wiki/` del repo `-0_ioon`.
4. Primer experimento real: capturar 2 semanas de uso real · observar fricciones · ajustar.

### Fase B — adopción real (semanas 5-12)

5. AppFlowy: migrar tracking de Serclin, Educativo Antequera, Hanseatic Pharma a databases dedicadas.
6. AFFiNE: dibujar mapa de arquitectura del stack ioon como whiteboard primario.
7. SilverBullet: poblar wiki con runbooks (redeploy Coolify · restore B2 · provisioning cliente).
8. Establecer ritmo de cristalización: cada fin de semana, lo que se estabilizó migra a canon markdown.

### Fase C — self-host completo (3-6 meses)

9. Migrar AppFlowy Cloud → self-host en `flow.ioon.mx`.
10. Migrar AFFiNE cloud → self-host en `canvas.ioon.mx`.
11. Backups de las tres herramientas incluidos en backup global Coolify → B2.

---

## 8. Costos

| Concepto | Fase A-B (cloud) | Fase C (self-host) |
|---|---|---|
| AppFlowy | $0 free tier | $0 self-hosted |
| AFFiNE.pro | $0 free tier | $0 self-hosted |
| SilverBullet | $0 self-hosted | $0 self-hosted |
| Hosting incremental Coolify | $0 (cubierto VPS) | $0 |
| **Total mensual** | **$0** | **$0** |

Si en algún momento los free tiers de AppFlowy o AFFiNE Cloud cambian, la salida es self-host (fase C). Sin lock-in monetario.

---

## 9. Riesgos y mitigaciones

### Tres herramientas = más superficies que mantener
Riesgo de carga cognitiva real. Mitigación: la regla del §4 evita confusión · pequeñas notas no se duplican entre superficies · cada una con caso de uso claro.

### Sync entre superficies y canon
No hay sync automático bidireccional entre AppFlowy/AFFiNE y el repo markdown. Solo SilverBullet sincroniza directo. Mitigación: el flujo es **uno-direccional** (superficies de trabajo → cristalización en canon manual), no se intenta sync bidireccional · evita conflictos.

### Fricción de captura si la regla del §4 no se respeta
Si Francisco empieza a poner notas técnicas en AppFlowy o tracking de proyectos en SilverBullet, el sistema se degrada. Mitigación: revisar la división cada mes en los primeros 3 meses · ajustar regla si la realidad no la respeta.

### Herramientas relativamente jóvenes
AppFlowy (~3 años) · AFFiNE (~3 años) · SilverBullet (~2 años). Todos en versión 0.x o 1.x temprana. Riesgo: bugs, breaking changes. Mitigación: el canon markdown es independiente · si una herramienta muere, las otras y el canon sobreviven.

---

## 10. Criterios de reapertura

1. **Una de las tres herramientas se vuelve abandonware**. Disparador: evaluar reemplazo para esa superficie sin tocar las otras dos.
2. **La regla del §4 no se respeta en uso real durante 3 meses**. Disparador: cuestionar si la división es la correcta · posiblemente colapsar dos superficies en una.
3. **Aparece herramienta que cubra 2+ perfiles bien**. Disparador: revisión natural · evaluar reducir el número de superficies.
4. **El estudio crece a equipo de 3+ personas** y la colaboración multi-usuario revela fricciones específicas. Disparador: revisar herramientas con foco en sharing/permisos.

---

## 11. Vigencia y revisión

**Revisión natural:** 3 meses post-fase A (revisar uso real) · 6 meses (cierre de fase B).

**Revisión por evento:** cualquiera del §10.

---

## 12. Relación con sistema fjlp 1.2.4

El sistema canónico fjlp 1.2.4 **no cambia** con esta decisión. El repo `-0_ioon/docs/` sigue siendo la fuente de verdad para todo lo cristalizado. Las tres herramientas (AppFlowy / AFFiNE / SilverBullet) son **superficies operativas** que alimentan o consumen del canon · no lo reemplazan.

Para una nota cualquiera, la pregunta es: **¿está cristalizada (estado "vigente" o "decisión cerrada")?**
- **Sí** → vive en `-0_ioon/docs/` con nombre fjlp 1.2.4 y frontmatter completo.
- **No** (en flujo, captura, exploración, visual experimental) → vive en la superficie apropiada de §4.

Cristalización es un acto explícito · el autor decide cuándo una nota "se gana" entrada al canon.

---

*Decisión cristalizada el 14-may-2026 20:00 UTC-6. Cierra la búsqueda iterativa A → B → C de arquitectura de captura/notas/wiki.*
