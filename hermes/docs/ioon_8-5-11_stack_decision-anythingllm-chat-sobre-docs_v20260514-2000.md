---
proyecto: 8. ioon
subtema: 8.5 stack
version: v20260514-2000
autor: Francisco Javier León Pacheco
nivel: item · decisión cristalizada
estado: vigente
proposito: cristalizar la elección de AnythingLLM como motor RAG (retrieval-augmented generation) self-hosted del estudio para chat sobre documentación canónica · diferenciado de Tau (agente operativo) por rol distinto
depende_de:
  - ioon_8-4-17_planeacion-tecnica_decision-rol-hermes-tau-3-niveles_v20260514-1408 (Tau es agente operativo · AnythingLLM es buscador conversacional sobre docs)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (filosofía self-hosted)
alimenta_a:
  - ioon 8-5-2 inventario maestro (fila chat sobre docs / RAG)
  - ioon 8-4-7 pendientes técnicos (P2-X activación AnythingLLM con corpus inicial)
---

# Decisión canónica — AnythingLLM como motor RAG sobre docs canónicos

Decisión cristalizada el 14 de mayo de 2026. Resuelve el caso "consultar el canon en conversación natural sin abrir archivos manualmente" que Tau no cubre del mismo modo (Tau es agente operativo con régimen 3 niveles · no buscador estilo Perplexity sobre el repo).

---

## 1. Idea central (1 frase)

**AnythingLLM** queda adoptado como motor RAG self-hosted en `chat.ioon.mx` · indexa el repo `-0_ioon/docs/` + carpetas seleccionadas + URLs · permite preguntas en lenguaje natural sobre el canon · **complementa a Tau, no lo reemplaza**.

---

## 2. Distinción crítica vs Tau

| Aspecto | Tau (8-4-17) | AnythingLLM (esta decisión) |
|---|---|---|
| Rol | Agente operativo con autonomía progresiva | Buscador conversacional sobre corpus de docs |
| Caso de uso | "Crea el deal en Twenty" · "Resume esta nota" · "Captura este input" | "¿Qué dice el canon sobre Coolify auto-deploy?" · "¿En qué nota se decidió Twenty?" |
| Acción sobre sistemas externos | Sí (régimen 3 niveles) | No · solo lectura del corpus indexado |
| Estado | Persistente (memoria · context) | Stateless por conversación |
| Costo cognitivo del usuario | Alto (interlocutor activo) | Bajo (consulta puntual) |

**Regla operativa:** consulta sobre canon → AnythingLLM. Acción sobre el estudio → Tau.

---

## 3. Decisión

**AnythingLLM** queda adoptado.

- **Origen:** [useanything.com](https://useanything.com) · open source MIT · Node.js + LanceDB + opcional Postgres.
- **Hosting:** Coolify en `servidor-ioon-2`.
- **Storage embeddings:** LanceDB built-in (suficiente para volumen del estudio · upgradable a Pinecone/Qdrant si crece).
- **Acceso:** `chat.ioon.mx` (wildcard DNS).
- **LLM provider:** OpenRouter (mismo cap mensual compartido con Tau · ~$40 USD/mes).
- **Embeddings:** OpenAI text-embedding-3-small o equivalente vía OpenRouter.
- **Corpus inicial:** repo `-0_ioon/docs/` completo + URLs canónicas externas (sitios admirados, docs de Astro/Next.js/Payload).

---

## 4. Razones de la elección

### 4.1 Self-hosted real con UI pulida

AnythingLLM tiene UI propia (no es solo backend · viene con chat interface completa). Sin necesidad de construir frontend.

### 4.2 Multi-workspace nativo

Permite separar corpora: workspace "Canon ioon" · workspace "Stack técnico" · workspace "Clientes". Cada uno con sus docs, sus prompts, su contexto. Útil para no contaminar respuestas (preguntar sobre Serclin no debería mezclar contexto de Cano Vera).

### 4.3 Conectores múltiples

Soporta indexar:
- Archivos locales (markdown del repo).
- URLs (sitios web cualesquiera).
- GitHub repos completos.
- Notion (si se usara).
- YouTube transcripts.
- Confluence (si aplicara).

Flexibilidad alta sin tener que construir scrapers.

### 4.4 Provider-agnóstico

Soporta OpenAI, Anthropic, OpenRouter, Ollama (local), Google, Azure. Sin lock-in al provider.

### 4.5 Permisos multi-usuario

Cuando entre socio, se puede dar acceso con permisos por workspace.

### 4.6 Filosofía alineada

MIT · self-hostable · datos locales · ningún componente cloud obligatorio.

---

## 5. Alternativas evaluadas y descartadas

### Construir RAG propio
LangChain / LlamaIndex / haystack + frontend custom. Posible pero costo de construcción alto · mantenimiento recurrente · sin ventaja sobre AnythingLLM que ya resolvió todo. Descarte por costo de oportunidad.

### Khoj
Open source · UI buena · workspace concept similar. AnythingLLM más maduro en features · comunidad más grande. Descarte como segunda opción · reevaluable si AnythingLLM empeora.

### Danswer (ahora Onyx)
Open source enterprise-flavored · self-hostable · pesado para escala personal. AnythingLLM más ligero y suficiente para el caso. Descarte por sobreingeniería.

### Perplexica
Versión OSS de Perplexity. Buena para búsqueda web · débil para corpus privado. Mismatch de caso de uso. Descarte por scope.

### NotebookLM
SaaS de Google · buen para corpus · lock-in Google · filosofía rota. Descarte por filosofía.

### Tau directamente
Tau podría leer el canon con régimen Nivel 1 (lectura sin aprobación) · pero Tau es agente con estado persistente y régimen de acción · usarlo para queries sobre canon es desperdicio · y mezcla casos de uso distintos. La separación AnythingLLM/Tau es saludable.

---

## 6. Setup operativo

### Fase 1 — instalación

1. Coolify · proyecto "AnythingLLM" desde catálogo.
2. Configurar provider OpenRouter (API key compartida con Tau).
3. Configurar embeddings provider.
4. Subdominio `chat.ioon.mx`.

### Fase 2 — workspace inicial

5. Crear workspace "Canon ioon" indexando el repo `-0_ioon/docs/`.
6. Configurar system prompt: "Eres un asistente que solo responde basándote en el canon indexado. Cita siempre la nota fuente (nombre del archivo). Si no encuentras respuesta en el canon, dilo explícitamente."
7. Probar con 10 queries representativas (¿qué CRM se decidió? · ¿cuál es el roadmap operativo? · ¿qué dice el canon sobre Coolify autodeploy?).
8. Ajustar prompt y chunking si las respuestas son flojas.

### Fase 3 — workspaces adicionales

9. Workspace "Stack técnico" con docs externas (Astro, Next.js, Payload, Coolify, Three.js, GSAP).
10. Workspace por cliente activo (Serclin, Hanseatic, Educativo Antequera) — indexa solo los docs del cliente.

---

## 7. Costos

| Concepto | Costo |
|---|---|
| Licencia AnythingLLM | $0 (MIT self-hosted) |
| Hosting incremental | $0 (cubierto por VPS) |
| LLM API uso | parte del cap $40 USD/mes de OpenRouter (compartido con Tau · uso liviano probablemente <$10/mes) |
| Embeddings | parte del mismo cap (uso liviano) |
| **Total mensual** | **incluido en cap OpenRouter** |

---

## 8. Riesgos y mitigaciones

### Calidad de RAG depende de chunking + prompt
Si el chunking es malo o el prompt es flojo, las respuestas son flojas. Mitigación: tunear con casos reales · medir % de respuestas útiles · iterar.

### Cap de OpenRouter compartido
Si el uso de Tau + AnythingLLM excede $40 USD/mes, hay que decidir entre apagar uno o subir cap. Mitigación: monitor mensual · ajustar.

### Embeddings re-generar al cambiar provider
Si se cambia provider de embeddings, hay que re-indexar todo. Mitigación: elegir provider estable de entrada · documentar elección.

---

## 9. Criterios de reapertura

1. **AnythingLLM abandonado**. Disparador: migrar a Khoj.
2. **Calidad de respuestas crónicamente baja** post-tuning. Disparador: replantear RAG o evaluar fine-tuning con corpus específico.
3. **OpenRouter sube precio** brutalmente. Disparador: evaluar local LLM con Ollama.

---

## 10. Vigencia y revisión

**Revisión natural:** 3 meses post-fase 1 (validar utilidad real).

**Revisión por evento:** cualquiera del §9.

---

*Decisión cristalizada el 14-may-2026 20:00 UTC-6. Complementa Tau, no lo sustituye · separación de roles es saludable.*
