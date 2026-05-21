---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260515-0800
autor: Francisco Javier León Pacheco
nivel: índice · navegación
estado: vigente
proposito: ofrecer el mapa de navegación canónico del subtema 8.5 stack · lista todas las notas con su rol, estado, dependencias · funciona como ToC para llegar a la nota correcta sin caminar el filesystem
depende_de:
  - fjlp 1.2 organización de archivos (sistema canónico de naming)
  - fjlp 1.2.4 (estructura jerárquica X.Y.Z)
alimenta_a:
  - ioon 8-5-2 inventario maestro (mapa cruzado · este índice apunta · 8-5-2 detalla)
  - cualquier nota futura del 8.5 stack (se registra aquí al crearse)
---

# 8.5 Stack — Índice maestro

Mapa de navegación del subtema 8.5. **Toda nota nueva del 8.5 stack se registra aquí cuando se cristaliza · este índice se mantiene actualizado.**

Si buscas la **respuesta corta** ("¿qué CRM usamos?"), ve directo a la decisión canónica. Si buscas el **panorama operativo** ("¿qué corre en producción hoy?"), ve a `8-5-2 inventario maestro`. Si buscas **historia** ("¿por qué descartamos X?"), ve a la decisión correspondiente · cada una tiene §5 alternativas descartadas.

---

## 1. Notas del 8.5 ordenadas

### 8-5-0 Índice maestro
**Este archivo.** Mapa de navegación · ToC de 8.5. Se actualiza con cada nota nueva.

### 8-5-1 (reservado)
Reservado para una posible nota futura de panorama macro del stack si el inventario crece demasiado y se necesita una "vista ejecutiva" separada del inventario detallado.

### 8-5-2 Inventario maestro
- **Versión vigente:** `v20260515-0752`
- **Rol:** vista completa del stack operativo del estudio · 23+2 categorías del marco v5 bi-eje (eje técnico §1.1-1.17 + eje operativo §2.1-2.8) · cada categoría con tecnología vigente, alternativas en standby, estado, notas operativas.
- **Cuándo consultarla:** "¿qué corre en producción?" · "¿qué tengo desplegado en Coolify?" · "¿qué pendientes técnicos arrastra cada categoría?".
- **Notas relacionadas:** 8-5-2 vieja `v20260511-2043` (archivada · superada).

### 8-5-2 Biblioteca efectos visuales · implementación
- **Versión vigente:** `v20260504-1233`
- **Rol:** nota técnica de implementación de la biblioteca propia `ioon-effects` (efectos React drop-in del estudio · producto interno categoría 1.16).
- **Cuándo consultarla:** cuando arranque desarrollo activo de ioon-effects.
- **Nota:** mismo prefijo numérico que el inventario maestro arriba · son notas distintas (el sistema permite reuso de número 8-5-2 para sub-tópicos del stack · ambas viven en `docs/` con sus timestamps distintos · sin colisión).

### 8-5-3 Nota Frappe · candidato ERP · evaluación postventana
- **Versión vigente:** `v20260504-1234`
- **Rol:** análisis técnico de Frappe como candidato ERP/CRM unificado · **evaluación postventana** (se descartó tras profundizar). Documenta razones de descarte para no relitigar.
- **Cuándo consultarla:** si vuelve a aparecer la tentación "¿y si Frappe?" en alguna conversación.
- **Cierra a:** 8-5-5 Twenty CRM (decisión final).

### 8-5-4 Guía operativa (pendiente · regenerar)
- **Estado:** pendiente de regeneración (Batch 5).
- **Rol previsto:** guía de uso cotidiano del stack · cómo arrancar un proyecto nuevo · cómo provisionar un cliente · checklist de setup.

### 8-5-5 Decisión · Twenty CRM
- **Versión vigente:** `v20260514-1700`
- **Rol:** CRM canónico del estudio · self-hosted en Coolify · `crm.ioon.mx`.
- **Costo:** $0/mes.
- **Cuándo consultarla:** "¿qué CRM usamos?" · "¿por qué no HubSpot/Pipedrive?".

### 8-5-6 Decisión · Google Workspace
- **Versión vigente:** `v20260514-1730`
- **Rol:** capa de identidad/email/calendar/file-sharing externo · **rompe filosofía self-hosted deliberadamente** por deliverability y aceptabilidad cliente.
- **Costo:** $86 USD/año por usuario.
- **Cuándo consultarla:** "¿por qué rompimos self-hosted para email?" · "¿qué plan de Workspace?".

### 8-5-7 Decisión · Payload CMS de cliente
- **Versión vigente:** `v20260514-1800`
- **Rol:** CMS de aplicaciones cliente · Payload-in-Next.js · MIT · self-hosted.
- **Costo:** $0/mes.
- **Cuándo consultarla:** "¿qué CMS para apps cliente?" · "¿Sanity o Payload?".
- **Origen técnico:** 8-4-12 §2.2 (esta nota es formalización canónica).

### 8-5-8 Decisión · Mautic marketing automation
- **Versión vigente:** `v20260514-1830`
- **Rol:** motor de marketing automation · self-hosted en `mautic.ioon.mx` · **complementa a Twenty CRM** (no lo reemplaza).
- **Costo:** $0/mes fase 1 · ~$15-30 USD/mes cuando escale SMTP.
- **Cuándo consultarla:** "¿Twenty o Mautic?" · "¿newsletter en qué herramienta?".

### 8-5-9 Decisión · Vaultwarden password manager
- **Versión vigente:** `v20260514-1900`
- **Rol:** password manager self-hosted compatible 100% con clientes Bitwarden oficiales · `vault.ioon.mx`.
- **Costo:** $0/mes.
- **Cuándo consultarla:** "¿dónde van los passwords?" · "¿por qué no 1Password?".

### 8-5-10 Decisión · Hoarder bookmarks
- **Versión vigente:** `v20260514-1930`
- **Rol:** bookmark manager self-hosted · `bookmarks.ioon.mx` · tags con IA.
- **Costo:** <$1 USD/mes (LLM).
- **Cuándo consultarla:** "¿dónde guardo este link?" · "¿Pocket o algo mejor?".

### 8-5-11 Decisión · AnythingLLM chat sobre docs
- **Versión vigente:** `v20260514-2000`
- **Rol:** motor RAG self-hosted para chat sobre canon · `chat.ioon.mx` · **complementa a Tau** (no lo reemplaza · ver §2 de la nota).
- **Costo:** incluido en cap OpenRouter $40/mes.
- **Cuándo consultarla:** "¿Tau o AnythingLLM?" · "¿cómo busco algo en el canon?".

### 8-5-12 Decisión · Uptime Kuma monitoring
- **Versión vigente:** `v20260514-2030`
- **Rol:** monitor de uptime self-hosted · `status.ioon.mx` · alertas Telegram + email.
- **Costo:** $0/mes.
- **Cuándo consultarla:** "¿está caído X?" · "¿cómo me entero de caídas?".

### 8-5-91 / 8-5-92 / 8-5-93 Borradores-input (pendientes · regenerar)
- **Estado:** pendientes de regeneración (Batch 5).
- **Rol previsto:** inputs en bruto / borradores que alimentan las decisiones canónicas · viven en 8.5 como histórico de exploración.

---

## 2. Mapa de dependencias

Quién depende de quién (las flechas → significan "consume / requiere"):

```
8-5-0 (este índice)
   ↓ referencia a
   8-5-1..12

8-5-2 (inventario maestro)
   ↓ cristaliza decisiones de
   8-5-5, 8-5-6, 8-5-7, 8-5-8, 8-5-9, 8-5-10, 8-5-11, 8-5-12
   ↓ alimenta
   8-4-7 pendientes técnicos

8-5-5 (Twenty CRM)
   ↓ alimenta integración con
   8-5-6 (Google Workspace SSO · fase 2)

8-5-6 (Google Workspace)
   ↓ provee SMTP saliente para
   8-5-8 (Mautic)
   ↓ provee identidad para
   8-5-5 (Twenty SSO)

8-5-7 (Payload)
   ↑ origen técnico en
   8-4-12 §2.2

8-5-8 (Mautic)
   ↓ promueve leads a
   8-5-5 (Twenty)

8-5-11 (AnythingLLM)
   ↓ comparte cap LLM con
   8-4-17 → 0_ioon/hermes/SOUL.md (Tau)
   ↓ comparte filosofía con
   8-5-10 (Hoarder · ambos usan OpenRouter)

8-5-12 (Uptime Kuma)
   ↓ monitorea todos los anteriores
```

---

## 3. Estado consolidado del 8.5 al 15-may-2026

| Nota | Estado | Activación |
|---|---|---|
| 8-5-0 índice | vigente | siempre |
| 8-5-2 inventario maestro | vigente v20260515-0752 | siempre |
| 8-5-2 biblioteca efectos visuales impl | vigente v20260504-1233 | en standby (cuando arranque ioon-effects) |
| 8-5-3 nota Frappe descartada | vigente histórica | referencia |
| 8-5-4 guía operativa | **pendiente regenerar** | — |
| 8-5-5 Twenty CRM | decisión vigente · activar fase 1 | **P0-X siguiente** |
| 8-5-6 Google Workspace | decisión vigente · activar fase 1 | **P0-X siguiente** |
| 8-5-7 Payload CMS | decisión vigente · usar en primer demo | con primer cliente Next |
| 8-5-8 Mautic | decisión vigente · fase 2 dormida | post-Workspace |
| 8-5-9 Vaultwarden | decisión vigente · activar inmediato | **P0-X siguiente** |
| 8-5-10 Hoarder | decisión vigente · activar fase 1 | post-Vaultwarden |
| 8-5-11 AnythingLLM | decisión vigente · activar tras Tau | post-Tau fase 1 |
| 8-5-12 Uptime Kuma | decisión vigente · activar inmediato | **P0-X siguiente** |
| 8-5-91/92/93 borradores | **pendientes regenerar** | — |

---

## 4. Orden de activación sugerido (primer trimestre)

Quincena por quincena · sin saturar:

1. **Semana 19-may:** Vaultwarden + Uptime Kuma (infra base · sin estos, todo lo demás es frágil).
2. **Semana 26-may:** Google Workspace (capa identidad para que el resto se conecte limpio).
3. **Semana 2-jun:** Twenty CRM (primera herramienta operativa real · capturar prospectos vivos).
4. **Semana 9-jun:** Hoarder + AnythingLLM (capa knowledge personal · post-Tau fase 1 cerrada).
5. **Fase B-C modelo C híbrido (8-4-3):** AppFlowy + AFFiNE + SilverBullet en paralelo conforme convenga.
6. **Mes jul:** Mautic fase 1 (formulario en sitio público · captura leads).
7. **Trigger cliente:** Payload se activa cuando entre primer demo (Motor de proofing).

---

## 5. Notas reservadas (slots futuros)

- **8-5-13 en adelante:** disponibles para nuevas decisiones canónicas de stack.
- **8-5-X (donde X >= 80):** reservados para sub-tópicos exploratorios (borradores que pueden cristalizar a número definitivo cuando maduren).

---

## 6. Convenciones del 8.5

- **Toda decisión canónica del stack** vive como nota `8-5-N` con frontmatter `nivel: item · decisión cristalizada`.
- **Toda nota técnica exploratoria** del stack vive como `8-5-N` con frontmatter `nivel: nota-informativa` o `borrador-para-ingerir`.
- **Cambio mayor en stack** (adopción de nueva pieza, descarte de pieza activa, migración) → nueva nota canónica `8-5-N` · nunca edición destructiva del histórico.
- **Refinamiento de pieza existente** (versión nueva del software, ajuste menor) → bump de timestamp en la nota canónica de esa pieza.

---

## 7. Cómo se usa este índice desde Tau

Tau (`0_ioon/hermes/SOUL.md`) consulta este índice cuando una pregunta del autor toca stack. Patrón:

```
Autor: "¿qué CRM teníamos?"
Tau: [lee 8-5-0 § Twenty CRM] [lee 8-5-5 si necesita detalle]
     Responde: "Twenty CRM self-hosted en crm.ioon.mx (8-5-5). 
     ¿Quieres el detalle de razones o solo confirmación?"
```

El índice es el **punto de entrada** al 8.5 · evita que Tau busque grep en el filesystem cuando ya hay un mapa.

---

*Índice maestro del 8.5 stack v20260515-0800. Se actualiza al cristalizar cualquier nota nueva del subtema.*
