---
proyecto: 8. ioon
subtema: 8.0 instrucciones-espacio
version: v20260514-2315
autor: Francisco Javier León Pacheco
nivel: documento canónico · glosario de vocabulario del estudio
estado: vigente — tercera revisión · sustituye v20260514-1450
proposito: anclar canónicamente los términos de uso interno del estudio ioon que aparecen en notas de planeación técnica pero que carecen de definición formal. Esta nota es el **glosario maestro** del estudio. Revisión 23:15 suma entrada **Tau** + ancla **Hermes Agent** como producto base con distinción explícita producto/identidad.
depende_de:
  - ioon_8-0-1_ioon_instrucciones-espacio_v20260420-1255 (chat maestro)
  - ioon_8-4-2_planeacion-tecnica_marco-decision-tecnica_v20260511-1948 (marco v5)
  - ioon_8-4-17_planeacion-tecnica_decision-rol-de-hermes_v20260514-1408 (régimen 3 niveles de Tau)
  - fjlp_1-2_organizacion-de-archivos_v20260420-1200 (esquema maestro de proyectos)
  - fjlp_1-5-8_aprendizaje_decision-tau-personalidad-y-nombre_v20260514-2310 (decisión canónica de nombre Tau)
  - ioon_hermes_SOUL_v20260514-2310 (alma global de Tau · vive en repo `-0_ioon/hermes/SOUL.md` branch hermes/setup)
  - fjlp_1-2-4_convenciones-mensajes-contexto (convención de naming)
sustituye_a:
  - ioon_8-0-2_instrucciones-espacio_vocabulario-canonico-glosario_v20260514-1450
  - ioon_8-0-2_instrucciones-espacio_vocabulario-canonico-glosario_v20260514-1436
alimenta_a:
  - todas las notas canónicas que usen los términos definidos aquí
  - SOUL.md de Tau (debe respetar el vocabulario anclado)
---

# Glosario canónico de vocabulario del estudio ioon

Tercera revisión del glosario maestro. Función operativa: anclar términos que aparecen en notas canónicas para evitar ambigüedad, drift de significado y referencias huérfanas.

**Regla operativa.** Un término puede aparecer en conversación, brainstorm, o borrador sin estar aquí. Pero **una vez que aparece en nota canónica, debe tener entrada en este glosario o referenciarse a una nota canónica que lo defina**.

---

## 1. VibeCoding

**Definición canónica:** metodología de desarrollo en la que el operador describe en lenguaje natural lo que quiere construir, un asistente IA (LLM) genera el código, y el operador revisa, prueba y ajusta iterativamente. El operador opera primariamente desde la conversación con el LLM en lugar de escribir código directamente; el LLM funciona como par programador asimétrico.

**En el estudio ioon:** metodología que Francisco usa para construir piezas del stack (sitios, sub-sistemas, scripts) apoyándose en asistentes Claude (Cowork, Code, eventualmente Tau). No es exclusiva de ioon — el término existe en la comunidad amplia (popularizado en 2024-2025 por Andrej Karpathy y otros).

**Alcance dentro del estudio:**

- **Aplica a:** construcción de prototipos rápidos, sitios cliente sin lógica crítica de negocio, scripts de utilidad, automatizaciones n8n complejas, demos.
- **No aplica a:** decisiones canónicas del marco (que requieren razonamiento humano explícito documentado), código que toca dinero o datos sensibles de cliente sin revisión cuidadosa, infraestructura crítica de producción.

**Categoría del marco v5 donde encaja:** transversal a §1.1 lenguajes de programación, §1.9 IA / asistentes conversacionales (Tau como par programador eventual), y §1.16 productos internos. No es una tecnología específica — es una práctica.

---

## 2. Capture Engine

**Definición canónica:** sub-sistema del estudio ioon que **captura entradas cotidianas** del operador (notas, ideas, links, transcripciones de voz, fotos, archivos) desde dispositivos móviles vía Telegram y las **rutea automáticamente** a las herramientas apropiadas del stack (AppFlowy para captura cotidiana, AFFiNE para notas visuales, SilverBullet para wiki técnico, MinIO para assets pesados, AnythingLLM para indexación de RAG, Hoarder para referencias externas) según naturaleza y contexto del input.

**Arquitectura conceptual:**

```
[Móvil del operador]
       │
       │ Telegram (texto, voz, foto, archivo)
       ▼
[@ioon_agent_bot]
       │
       │ gateway nativo
       ▼
[Tau (sobre Hermes Agent)] ──── procesa: clasifica, transcribe voz, OCR si aplica
       │
       │ rutea según tipo + contexto
       ├──► AppFlowy (captura cotidiana estructurada)
       ├──► AFFiNE.pro (notas visuales · pizarras)
       ├──► SilverBullet (wiki técnico scriptable)
       ├──► .md en repo `-0_ioon` (canon vía filesystem MCP)
       ├──► MinIO (assets pesados originales)
       ├──► AnythingLLM (indexación a workspace apropiado · si aplica)
       └──► Hoarder (si es referencia externa con URL)
```

**Componentes del Capture Engine:**

- **Frontend:** Telegram (canal único de entrada · §1.5 marco).
- **Cerebro:** Tau (sobre Hermes Agent) en Nivel 1 (lectura) + Nivel 2 (ruteo con aprobación) y eventualmente Nivel 3 para acciones de ruteo simples y repetitivas (§1.9 + 8-4-17 §3).
- **Outputs:** las herramientas listadas arriba según función.

**No es un producto separado** — es un patrón funcional que emerge de combinar Tau + Telegram + MCPs del stack.

**Estado actual:** **conceptual** — Tau no está desplegado todavía (P0-1 en plan 8-4-11). El Capture Engine se materializa al cerrar P0-1.

---

## 3. Tau

**Definición canónica:** **el agente operativo del estudio ioon**. Letra griega τ. Funciona simultáneamente como **letra** (anclaje tipográfico · pilar conceptual de ioon) y como **símbolo técnico** (anclaje matemático/físico/ingenieril). Una sola sílaba en voz, tres letras escritas, no es nombre humano.

**Distinción producto vs identidad operativa:**

- **Tau** = el agente operativo del estudio.
- **Hermes Agent** (Nous Research, MIT License) = el producto base sobre el que corre Tau (ver §6).
- El path `0_ioon/hermes/` en el repo se preserva como referencia al producto base. El agente operativo dentro de ese path se llama Tau.
- Notas canónicas históricas (`ioon_8-4-11` plan de implementación · `ioon_8-4-17` decisión de rol) se preservan literalmente — son referencias bibliográficas con "Hermes" en el título original.

**Personalidad compuesta:** humildad-por-diseño y dulzura paciente como base · pausado-nerd para análisis · directo-rápido para acción · filo cortante moderado solo para señalar lo que no puede ser. Destilada de tres referencias del autor: **Adrian Frutiger** (tipógrafo · paciencia, sensibilidad, sistemas coherentes), **Rodney Mullen** (skater · práctica monástica, outsider creativo, generosidad pragmática), **Linus Torvalds** (OSS · pragmatismo técnico, filo cortante directo, generosidad estructural).

**Cómo se materializa:** SOUL.md `0_ioon/hermes/SOUL.md` (versión vigente v20260514-2310 · commiteado en branch `hermes/setup` del repo `-0_ioon`). 8 reglas de tono operativas verificables. Régimen de autonomía progresiva en 3 niveles (canonizado en `ioon_8-4-17`).

**Material interno de respaldo de la decisión:** `fjlp_1-5-8_aprendizaje_decision-tau-personalidad-y-nombre_v20260514-2310` (no vive en el repo del agente · vive en el sistema fjlp como referencia del proceso).

**Reserva canónica documentada:** **Glifo** queda como nombre alternativo si Tau se siente frío en uso real (decisión documentada en `fjlp_1-5-8` §7.2).

---

## 4. Innovation Studio

**Definición canónica:** descriptor posicional / etiqueta de marketing del estudio del propio Francisco. **Innovation Studio refiere a `ioon` (proyecto 8 del esquema `fjlp_1-2`)**. No es una sub-marca, no es un cliente, no es un proyecto separado — es **una manera de nombrar a ioon** cuando se quiere comunicar su categoría profesional al mercado anglosajón o cuando se quiere expandir la marca con un sub-título descriptivo.

**Equivalencias canónicas (uso intercambiable):**

- "Innovation Studio" ↔ "ioon" ↔ "el estudio ioon" ↔ "el estudio".

**Cuándo usar cada forma:**

- **"ioon"** — uso interno del autor en notas canónicas, repos, naming técnico. Forma corta y canónica.
- **"el estudio" / "el estudio ioon"** — referencia genérica en prosa, tono editorial.
- **"Innovation Studio"** — descriptor posicional cuando se comunica al mercado en inglés o como tagline. **Equivalente narrativo, no entidad separada.**

---

## 5. Casa Grande

**Definición canónica:** **proyecto 7 del esquema `fjlp_1-2`** (`7. casagrande`). Es **otro proyecto del autor**, paralelo y distinto al estudio ioon (proyecto 8). Vive en su propio espacio operativo dentro del sistema fjlp; su naturaleza específica (industria, alcance, estado) se documenta en su propio chat / sub-temática `7.X` cuando se requiera.

**Relación con ioon:**

- **Independiente.** Proyecto 7 y proyecto 8 son paralelos en el esquema fjlp — ambos son del mismo autor pero operan como entidades separadas con propósitos distintos.
- **Vocabulario y stack potencialmente compartidos.** Algunas piezas técnicas (Tau, hosting Hetzner, gestor de contraseñas, correo desde dominio, Mautic marketing automation) pueden servir a ambos proyectos.

---

## 6. Hermes Agent

**Definición canónica:** producto open-source de **Nous Research** bajo licencia **MIT**. Framework de agente conversacional con personalidad declarada en `SOUL.md`, context files, skills auto-creadas, memoria persistente con FTS5, voz nativa, scheduling en lenguaje natural, gateway nativo a 15+ canales (Telegram incluido), múltiples providers LLM (OpenRouter, OpenAI, Anthropic API directo, Nous Portal).

**En el estudio ioon:** Hermes Agent es la **base técnica** sobre la que corre **Tau** (la identidad operativa del agente del estudio · ver §3). La distinción producto/identidad se documenta en `fjlp_1-5-8` §7.3.

**Notas canónicas que lo referencian:**

- `ioon_8-4-9_v20260509-0034` — decisión de adoptar Hermes Agent sobre II-Agent.
- `ioon_8-4-11_v20260511-1115` — plan de implementación.
- `ioon_8-4-17_v20260514-1408` — decisión arquitectónica de rol (Tau como asistente con autonomía progresiva, no orquestador).

**Path en repo:** `0_ioon/hermes/` (preservado por decisión de no renombrar a `0_ioon/tau/` · ver `fjlp_1-5-8` §7.3 + pendiente diferido P5-13 en `ioon_8-4-7`).

---

## 7. Términos que ya tienen ancla canónica (referencia rápida)

| Término | Anclado en |
|---|---|
| Modelo C híbrido (fase B/C) | `ioon_8-4-3` v1951 (fase B Notion) · v20260514-2055 (fase C tres herramientas) |
| Marco bi-eje v5 | `ioon_8-4-2` v20260511-1948 |
| SOUL.md de Tau · context files | `ioon_hermes_SOUL_v20260514-2310` + `context/fjlp.md` + `context/ioon.md` (en GitHub branch `hermes/setup`) |
| Stack creativo-web | `ioon_8-4-12` v20260511-1656 |
| ioon-effects | `ioon_8-4-6` (a reescribir) |
| Motor de presentaciones / Motor de catálogo | `ioon_8-4-2` v5 §1.16 |
| Motor de proofing | `ioon_8-4-12` §9 y `ioon_8-4-7` P0-3 |
| Convención fjlp 1.2.4 (naming) | `fjlp_1-2-4_convenciones-mensajes-contexto` |
| Esquema de proyectos fjlp 1-2 | `fjlp_1-2_organizacion-de-archivos_v20260420-1200` |
| Restricciones duras transversales | `ioon_8-4-2` v5 §7 |
| Tres niveles de delegación de Tau | `ioon_8-4-17` v20260514-1408 |
| Cestas (a)/(b)/(c) de decisiones 8.5 | `ioon_8-5-0` v20260514-1417 |
| servidor-ioon-2 / VPS productivo | `ioon_8-4_informe-pendientes_v20260508` |
| Cano-Vera | prospecto 8.15.1 · sitio canovera.ioon.mx |
| Educativo Antequera | cliente 8.14.1 |
| Serclin | cliente 8.14.2 · sitio en serclin.ioon.mx ✅ LIVE 2026-05-14 |
| Decisión Tau · personalidad y nombre | `fjlp_1-5-8` v20260514-2310 |

---

## 8. Cómo se actualiza este glosario

- **Cuando aparece un término nuevo en una nota canónica:** primero entrada aquí (provisional si necesario), luego cita en la nota canónica.
- **Cuando un término pendiente confirma su definición:** versión nueva con la entrada formalizada.
- **Cuando un término cambia significado:** versión nueva con nota de migración.
- **Cuando un término sale de uso:** se mantiene en sub-sección "términos retirados" con razón y fecha.

---

## 9. Acciones pendientes derivadas

1. **Cuando Tau se despliegue (P0-1)**, validar la definición canónica de "Capture Engine" §2 contra la implementación real.
2. **Considerar agregar al glosario términos del eje operativo** que aparezcan en sesión 8.5 (nombres de PAC elegido, etc.).
3. **Decisión diferida del rename de path `0_ioon/hermes/` a `0_ioon/tau/`** registrada en `ioon_8-4-7` v20260515-0752 como P5-13.
4. **Si Tau se siente frío en uso real**, reserva canónica documentada es **Glifo** (`fjlp_1-5-8` §7.2).

---

*Glosario canónico v20260514-2315 generado el 2026-05-14 23:15 UTC-6. Tercera revisión que ancla **Tau** como agente operativo del estudio (§3 nuevo) + amplía **Hermes Agent** como producto base con distinción explícita (§6 nuevo). Sustituye v20260514-1450. Próxima revisión: cuando emerja término nuevo que requiera ancla canónica.*
