---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260511-1115
autor: Francisco Javier León Pacheco
nivel: plan canónico · fases operativas
estado: vigente · adoptado bajo identidad Tau
proposito: plan operativo para la implementación de Hermes Agent como base técnica del agente del estudio · cuatro fases (1, 1.5, 2, 3) con entregables, checkpoints, dependencias · este plan opera bajo el régimen de 3 niveles cristalizado en 8-4-17 y se adopta bajo la identidad Tau cristalizada en fjlp_1-5-8
depende_de:
  - ioon_8-4-9_planeacion-tecnica_decision-hermes-vs-iiagent_v20260509-0034 (elección de Hermes Agent como base técnica)
  - ioon_8-4-17_planeacion-tecnica_decision-rol-hermes-tau-3-niveles_v20260514-1408 (régimen operativo bajo el que este plan ejecuta)
  - fjlp_1-5-8_aprendizaje_decision-tau-personalidad-y-nombre_v20260514-2310 (identidad bajo la que se adopta Hermes Agent)
alimenta_a:
  - 0_ioon/hermes/SOUL.md (cabecera y §1 referencian este plan)
  - 0_ioon/hermes/context/fjlp.md (perfil del autor referencia fase activa)
  - 0_ioon/hermes/context/ioon.md (§7 roadmap referencia este plan como P0-1)
  - ioon_8-4-7 pendientes técnicos (P0-1 referencia este plan)
---

# Plan canónico — Implementación de Hermes Agent (activación de Tau)

Plan operativo cristalizado el 11 de mayo de 2026 a las 11:15 UTC-6. Adoptado bajo identidad **Tau** desde la decisión de personalidad y nombre del 14-may-2310 — el plan técnico no cambia · solo se aclara que **Hermes Agent** es la base técnica (producto Nous Research MIT) y **Tau** es la identidad operativa que toma forma sobre esa base.

Este plan describe **cómo se activa el agente**, fase por fase. **El qué hace el agente** (rol arquitectónico, régimen de delegación) vive en 8-4-17. **El cómo se llama y se siente** vive en fjlp_1-5-8.

---

## 1. Idea central (1 frase)

Hermes Agent se activa como infraestructura técnica de Tau en **cuatro fases** (1, 1.5, 2, 3) cada una con entregable concreto · sin saltar fases · sin declarar capacidades antes de que se prueben.

---

## 2. Estado actual al 14-may-2026 (cierre P0-2.8)

**Fase 1 arrancando.** Se completaron los entregables iniciales:

- SOUL.md cristalizado en `0_ioon/hermes/SOUL.md` (con identidad Tau §1 + tono §2 + reglas duras §3 + régimen 3 niveles §4).
- `context/fjlp.md` cristalizado con perfil del autor + convención fjlp 1.2.4 + sección "lo que el autor delega / no delega".
- `context/ioon.md` cristalizado con estudio (stack, clientes, restricciones, roadmap).
- Branch `hermes/setup` en `fjleonpacheco-cmd/-0_ioon` con commit `1a085e0` ("hermes/setup: SOUL.md identidad Tau + context files iniciales").

**Pendiente inmediato fase 1:** ver §3.1 abajo.

---

## 3. Fases del plan

### 3.1 Fase 1 — Setup base + primera capa funcional

**Objetivo:** Tau operacional en lectura (Nivel 1) y propuesta texto-a-texto (Nivel 2 con aprobación).

**Entregables:**

- [x] SOUL.md con identidad y régimen vivido (cierre 14-may-23:10).
- [x] `context/fjlp.md` y `context/ioon.md` cristalizados.
- [x] Repo `-0_ioon` con branch `hermes/setup` para iteración del agente.
- [ ] **Hermes Agent instalado en `servidor-ioon-2`** vía Docker / Coolify.
- [ ] **Conexión a OpenRouter** con cap mensual configurado (~$40 USD).
- [ ] **Conexión a Telegram bot** `@ioon_agent_bot` para captura.
- [ ] **Filesystem MCP conectado** apuntando a `0_ioon/` para lectura del canon.
- [ ] **Skills básicas instaladas** (de `skills/` del repo): leer-nota-canonica, buscar-en-canon, capturar-input.
- [ ] **Primera conversación productiva** en Telegram (Tau lee canon, responde pregunta del autor, sin escribir nada externo).

**Checkpoint fase 1:** Tau responde 5 preguntas reales del autor sobre canon sin alucinar · cita la nota fuente · ofrece próxima acción cuando aplica.

**Dependencias:** ninguna externa. Solo tiempo del autor.

**ETA estimada:** 2-3 semanas calendar.

---

### 3.2 Fase 1.5 — Cleanup post-migración + base de skills

**Objetivo:** consolidar lo aprendido en fase 1 y dejar el agente robusto antes de habilitar escritura.

**Entregables:**

- [ ] Ajustes al SOUL.md tras 2 semanas de uso real (probable: 3-5 reglas de tono que emergen en uso).
- [ ] Ajustes a `context/fjlp.md` y `context/ioon.md` (cosas que se notan faltantes solo en uso).
- [ ] `skills/` poblado con 5-10 skills auto-creadas (en base a patrones recurrentes).
- [ ] `memory/` con entradas iniciales (preferencias del autor, patrones de trabajo).
- [ ] Backup automatizado de `0_ioon/hermes/` incluido en backup global Coolify → B2.
- [ ] Documentación interna del flow operativo en wiki SilverBullet.

**Checkpoint fase 1.5:** primer mes sin intervención técnica del autor en el agente · todo lo que necesita ajuste se hace via SOUL.md / context / skills, no via código del agente.

**Dependencias:** fase 1 cerrada + 4 semanas de uso real.

**ETA estimada:** mes 2.

---

### 3.3 Fase 2 — Habilitar escritura (Nivel 2 ramping)

**Objetivo:** Tau propone y ejecuta (con aprobación texto-a-texto) acciones sobre sistemas externos.

**Entregables:**

- [ ] Integración con Twenty CRM (API) — Tau puede proponer crear/editar Opportunities y People · aprobación texto-a-texto.
- [ ] Integración con repo `-0_ioon` (write) — Tau puede proponer commits a notas canónicas · aprobación texto-a-texto.
- [ ] Integración con Google Calendar (write) — Tau puede proponer crear eventos · aprobación texto-a-texto.
- [ ] Integración con AnythingLLM (read) — Tau puede consultar el workspace "Canon ioon" para fundamentar respuestas.
- [ ] Conteo de aprobaciones por tipo de acción (preparación para Nivel 3).

**Checkpoint fase 2:** Tau ejecuta 5+ acciones distintas sobre sistemas externos en una semana con 90%+ de aprobación sin corrección.

**Dependencias:** fase 1.5 cerrada + Twenty CRM activo (8-5-5) + Workspace activo (8-5-6) + AnythingLLM activo (8-5-11).

**ETA estimada:** mes 3-4.

---

### 3.4 Fase 3 — Promoción a Nivel 3 condicional

**Objetivo:** acciones específicas con 30+ aprobaciones sin corrección suben a Nivel 3 (auto-ejecución con notificación post-hoc).

**Entregables:**

- [ ] Primera acción promovida a Nivel 3 (probable: clasificación de inputs de Telegram).
- [ ] Notificaciones post-ejecución con opción de revertir.
- [ ] Logs auditables de toda ejecución Nivel 3.
- [ ] Métricas de salud del régimen (ver 8-4-17 §8) en dashboard simple (SilverBullet con bloque de cómputo embebido o panel Grafana).

**Checkpoint fase 3:** 3+ acciones distintas en Nivel 3 sin regresiones por 90 días consecutivos.

**Dependencias:** fase 2 cerrada + ≥90 días de uso real con métricas.

**ETA estimada:** mes 6-9.

---

## 4. Lo que NO está en este plan

- **Construir agentes adicionales** (auditor, comercial, copywriter). Esos son posteriores al cierre de fase 3 de Tau · primero un agente sólido, luego ramificación. Decisión documentada en fjlp_1-5-6.
- **Conectar Tau a sistemas de cliente externo** (mover sin aprobación cosas en clientes activos). NUNCA — ver 8-4-17 §5 lista de no-delegación.
- **Voice / TTS / STT** integraciones. Pueden venir en fase 4+ si el caso lo justifica.
- **Multi-modal** (Tau procesando imágenes/audio nativamente). En standby · cuando Hermes Agent libere features estables · no urgente.

---

## 5. Riesgos y mitigaciones del plan

### 5.1 Sobreingeniería de fase 1

Riesgo: querer configurar todo perfecto antes de usar. Mitigación: regla "instalado y conectado a Telegram > pulido pero no conectado". Aprender en uso, no en docs.

### 5.2 Saltar fases

Riesgo: querer escribir en sistemas externos antes de cerrar lectura. Mitigación: checkpoint de cada fase es **no negociable** · si no se cumple, no se avanza.

### 5.3 OpenRouter cap insuficiente

Riesgo: $40/mes podría ser poco si Tau + AnythingLLM se usan intensivo. Mitigación: monitorear semanal el primer mes · ajustar cap si se aproxima al límite · evaluar modelos más baratos en routing.

### 5.4 Hermes Agent evoluciona (Nous Research)

Hermes Agent es producto activo · puede tener breaking changes en versiones mayores. Mitigación: pinear versión específica · upgrade deliberado con sandbox antes de pushear a producción.

### 5.5 Incidente del autor (como el 15-may borrado accidental)

Mitigación general para el plan: el canon vive en GitHub · el SOUL.md está commiteado · memory/ tiene backup B2 · skills/ están versionadas. Si el autor borra carpeta local, restore es trivial · si el VPS muere, restore desde B2.

---

## 6. Métricas de éxito del plan

Al cierre de fase 3 (mes 6-9), se considera el plan exitoso si:

- Tau opera diario sin intervención técnica del autor por >30 días seguidos.
- Tasa de aprobación Nivel 2 >80%.
- 3+ acciones promovidas a Nivel 3 estables.
- El autor reporta subjetivamente "acelera mi trabajo" (no "me hace pensar dos veces si responder").
- El SOUL.md ha sido editado al menos 3 veces basado en patrones reales (no exploración teórica).

Si alguna métrica no se cumple, no significa que el plan fracasó · significa que el régimen necesita ajuste (no que el agente sea inadecuado · ver 8-4-17 §10).

---

## 7. Relación con identidad Tau

Este plan se ejecuta **bajo la identidad Tau** desde la decisión del 14-may-23:10. Cambios importantes en cómo se enuncia el plan tras esa decisión:

- En SOUL.md cabecera: "agente Hermes" → "agente Tau" (Hermes Agent es la base técnica).
- En entregables que referencian "el agente": se entiende como Tau operando sobre Hermes Agent.
- El path `0_ioon/hermes/` se preserva (referencia al producto base · ver 8-4-17 §12 y decisión de no renombrar path en fjlp_1-5-8).

El plan técnico no se ve afectado por la identidad · son capas distintas.

---

## 8. Próximo paso concreto al 15-may-2026

Cerrar los entregables faltantes de fase 1 (§3.1) **en este orden**:

1. Instalar Hermes Agent en `servidor-ioon-2` vía Coolify.
2. Configurar conexión a OpenRouter con API key + cap $40/mes.
3. Conectar a Telegram bot `@ioon_agent_bot`.
4. Conectar Filesystem MCP apuntando a `0_ioon/`.
5. Probar primera conversación en Telegram (Tau lee SOUL.md, responde).

ETA realista 1-2 semanas (considerando incidente de hoy 15-may + recuperación pendiente del sistema fjlp).

---

## 9. Revisión y vigencia

**Revisión natural:** al cerrar cada fase · validar checkpoint · documentar aprendizajes.

**Revisión por evento:**
- Cambio mayor en Hermes Agent que afecte el plan.
- Decisión de pivote en régimen 3 niveles (cambio a 8-4-17).
- Incidente serio que requiera replanteamiento.

---

*Plan cristalizado el 11-may-2026 11:15 UTC-6. Adoptado bajo identidad Tau desde 14-may-23:10. Estado al 15-may: fase 1 en curso · 3 entregables cerrados de 9.*
