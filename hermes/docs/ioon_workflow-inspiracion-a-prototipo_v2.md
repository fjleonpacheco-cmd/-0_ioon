# ioon OS: Protocolo de Configuración y Workflow de Inspiración

## 1. Identidad y Propósito

- **Estudio:** iioon (Oaxaca, MX)
- **Liderazgo:** Francisco León (Director de Arte/Foto)
- **Filosofía:** Soberanía Tecnológica (OSS) + Estética de Autor. "Diseño de Autor + Ejecución Automatizada".

---

## 2. El Workflow de "Inspiración a Prototipo" (Ciclo de Curaduría)

Este flujo permite que la inspiración visual sea procesada técnicamente antes de convertirse en UI.

1. **Captura (Pinterest):** León o alguno de sus clientes guardan referencias visuales en tableros específicos de Pinterest (ej. *Texturas Oaxaqueñas*, *Minimalismo 1940*).
2. **Almacenamiento (Hoarder):** n8n detecta el nuevo Pin y lo guarda automáticamente en Hoarder (marcador OSS autohospedado). Hoarder extrae la metadata y genera una biblioteca visual privada.
3. **Análisis Estético (Claude + Glosario de Autor):** El agente de IA escanea la colección y cruza la información con el Glosario de Autor.
   - *Fase 1c:* Glosario como archivo markdown inyectado en el system prompt del agente.
   - *Fase 2:* Glosario migrado a Directus como CMS + AnythingLLM como RAG.
   - *Ejemplo:* "Esta imagen de Pinterest tiene un grano de película que en nuestro glosario definimos como 'Orgánico' para tal cliente".
4. **Traducción Visual (Código):** El agente genera un prototipo funcional directamente en código (Astro + Tailwind + p5.js) basado en los hallazgos de Hoarder y las reglas del Glosario.
   - *Nota:* Penpot queda disponible como herramienta de diseño manual, pero no como paso automatizado en Fase 1 (su API no soporta generación programática de layouts).
5. **Validación de "Vibe" (Telegram):** El agente envía una captura o URL de preview a Telegram.
   - **León responde (Voz):** *"Me gusta el aire, pero ajusta el contraste al nivel 'Sereno' del glosario"*.
6. **Despliegue Técnico (Coolify):** Tras la aprobación, el agente despliega el prototipo en una URL de Preview en Hetzner vía Coolify.

---

## 3. El Control de Mando (Sprint & Tasking)

- **Notion:** Interfase de interacción humana y seguimiento de tareas.
- **Sprints:** Tableros quincenales donde se asignan tareas a Francisco León (Foto/Arte) o al Agente (Código/Prototipado).
- **Protocolo de Verificación de Marca:** El agente SIEMPRE consulta el Glosario de Autor antes de generar cualquier output visual.
  - *Fase 1c:* Consulta al archivo markdown en el contexto.
  - *Fase 2:* Consulta a Directus API + AnythingLLM Workspace.

---

## 4. Stack Tecnológico

### Activo (desplegado en Hetzner)
- **Infraestructura:** Coolify v4.0.0-beta.470 sobre Hetzner VPS `89.167.93.139`
- **Orquestador:** n8n (`n8n.ioon.mx`)
- **Agente:** II-Agent — frontend (`agent.ioon.mx`) + backend (`api.agent.ioon.mx`)
- **Bot:** `@ioon_agent_bot` (Telegram)
- **DNS:** GoDaddy (`ioon.mx`)

### Roadmap Fase 1b–1c
- **Repositorio de Inspiración:** Hoarder (por desplegar en Hetzner)
- **Glosario de Autor:** Archivo markdown con términos estéticos (por crear)
- **Integración Pinterest → Hoarder:** Workflow n8n (por crear)

### Roadmap Fase 2
- **CMS/Glosario:** Directus (por desplegar)
- **RAG:** AnythingLLM (por desplegar)

### Herramientas de diseño (no automatizadas)
- **Prototipado visual:** Penpot (uso manual, no en pipeline)
- **Gestión:** Notion (SaaS Estratégico)

### Framework de generación
- **Web:** Astro + Tailwind CSS 4.x + shadcn/ui
- **Arte:** p5.js (Processing) para capas atmosféricas

---

## 5. Roadmap de Fases

| Fase | Descripción | Estado |
|------|-------------|--------|
| **1a** | Pipeline de voz: Telegram → n8n → Gemini → II-Agent → Link de sesión | ✅ Funcional |
| **1b** | Desplegar Hoarder + conectar Pinterest vía n8n | ⬜ Pendiente |
| **1c** | Glosario de Autor como markdown en contexto del agente | ⬜ Pendiente |
| **2** | Directus como CMS del glosario + AnythingLLM como RAG | ⬜ Pendiente |
| **3** | Generación de prototipos en código + deploy automático vía Coolify | ⬜ Pendiente |

---

## 6. Guardrails de Marca (Consultar Siempre)

### Proyecto: (nombre del proyecto)
- **Restricción:** Prohibido el uso de…
- **Vibe:** (por ejemplo) 1940, calidez, hospitalidad, rescate histórico, serenidad.

*Nota: Estos guardrails deben definirse por proyecto en el Glosario de Autor (Fase 1c).*

---

## 7. Nota de Exclusión Artesanal

**Desktop Craft:** Adobe Creative Cloud y Affinity Suite se mantienen como herramientas locales para el retoque fotográfico de retrato y diseño de activos maestros. El agente de IA no interviene en esta fase de autor.
