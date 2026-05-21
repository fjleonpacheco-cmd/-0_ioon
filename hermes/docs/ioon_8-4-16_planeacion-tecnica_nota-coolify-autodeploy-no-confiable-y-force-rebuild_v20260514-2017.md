---
proyecto: 8. ioon
subtema: 8.4 planeacion-tecnica
version: v20260514-2017
autor: Francisco Javier León Pacheco
nivel: nota-informativa
estado: borrador-para-ingerir
proposito: registrar en 8.4 que el patrón de "auto-deploy on push" documentado en la ficha técnica de Serclin (8.14.2.6) NO se sostiene de forma confiable. En la sesión P0-2.8 del 14 de mayo, los commits Bloque A y Bloque C llegaron a `origin/main` pero el sitio en producción siguió sirviendo el HTML del commit inicial. El patrón operativo confiable es Redeploy manual con Force rebuild desde la UI de Coolify. La nota levanta las implicaciones para 8.4.10 (stack pendientes) y 8.4.12 (stack creativo-web).
depende_de:
  - ioon_8-4-10_planeacion-tecnica_resumen-ejecutivo-stack-y-pendientes_v20260511-1215 (stack pendientes vigente)
  - ioon_8-4-12_planeacion-tecnica_stack-creativo-web_v20260511-1656 (stack creativo-web vigente)
  - ioon_8-14-2-6_serclin_ficha-tecnica_v20260512-2129 (ficha P0-2.7 que documentó SSH tunnel y proyectó "deploys de ~1 h" para próximos clientes)
alimenta_a:
  - ioon 8.4.10 (sección "Coolify" del stack pendientes — agregar caveat de auto-deploy no confiable)
  - ioon 8.4.12 (capítulo de orquestación / deploy — agregar el patrón Redeploy + Force rebuild como default operativo, no como excepción)
  - ioon 8.14.2 (siguiente sesión de Serclin — confirmar que el redeploy del 14 de mayo resolvió el desfase y, si no, escalar a diagnóstico de webhook GitHub→Coolify)
---

# Nota informativa — Coolify: auto-deploy on push no es confiable, Force rebuild manual es el patrón default

Esta nota viaja a **8.4 planeación técnica** para documentar un hallazgo operativo del 14 de mayo de 2026 que contradice un supuesto que quedó implícito en la ficha técnica de Serclin (8.14.2.6) y en los flujos de Hanseatic Pharma: que Coolify auto-despliega de forma confiable al detectar un push a `main`.

La nota **no propone aún cambios al marco**. Solo levanta el hallazgo, su evidencia, las implicaciones inmediatas y las preguntas pendientes para resolver en la próxima sesión.

---

## 1. Origen de la consideración

Durante la sesión P0-2.8 de Serclin (14 mayo 2026), Francisco aplicó tres bloques de cambios al micrositio según feedback de José Arnaud del 13 de mayo:

- **Bloque A** — tipografía lg+, gap E4, ScrollIndicator clickeable. Commit `4276010`, push a `main`.
- **Bloque B** — snap viewports + frases-puente. El commit no quedó como entrada propia (git reportó "nothing to commit" porque los cambios se colaron dentro del staging de Bloque A). Sin push propio.
- **Bloque C** — logo flotante reemplaza overlines SERCLIN. Commit `a7533b9`, push a `main`.

Tras los pushes (~09:38 hora local), Francisco abrió `serclin.ioon.mx` y reportó: "no ha jalado". El HTML servido seguía mostrando los 5 overlines `SERCLIN`, el label `Deslizar` del ScrollIndicator viejo, y ningún `FloatingLogo`.

---

## 2. Evidencia del desfase

Diagnóstico via `curl` directo al sitio público:

- `serclin.ioon.mx` servía el HTML del commit `f7d8cbd` (initial commit del 12 de mayo).
- Working tree local: limpio, en `main`, sincronizado con `origin/main` (que sí contiene `4276010` y `a7533b9`).
- Repo remoto correcto: `git@github.com:fjleonpacheco-cmd/serclin.git`.
- Sin errores de build aparentes en el código local (Astro compilaría fine; los componentes nuevos están bien estructurados).

Conclusión: **el código está en GitHub; el deploy en Coolify no jaló los commits posteriores al inicial**. ~4 horas después del push, el sitio seguía sirviendo el build del 12 de mayo.

---

## 3. Hallazgo operativo

### 3.1 Coolify v4.0.0 (servidor-ioon-2) no auto-deploya de forma confiable

Hay precedente documentado por el propio Francisco en `ioon_serclin_presentaciones_20260420-1200.md`:

> "A veces Coolify reutiliza la imagen del commit anterior ('Build step skipped'). En esos casos hay que hacer Redeploy manual desde la UI de Coolify."

La sesión P0-2.8 confirma que **el modo de fallo no es esporádico ni reservado a cambios menores**: 2 commits con cambios sustanciales de UI quedaron sin desplegar durante horas, sin alerta automática.

### 3.2 Patrón confiable: Redeploy manual con Force rebuild sin caché

Para forzar que el commit más reciente de `main` realmente llegue a producción:

1. Abrir SSH tunnel: `ssh -L 8000:localhost:8000 ioon-new`
2. Abrir `http://localhost:8000` en navegador
3. Entrar al proyecto en Coolify → **Redeploy**
4. **Activar "Force rebuild without cache"** (o equivalente). Sin este toggle, Coolify puede saltar el build step y reusar la imagen anterior.
5. Confirmar en logs que el build corre completo, no que dice "Build step skipped".
6. Hard-refresh del sitio (`Cmd+Shift+R`) — el HTML del browser y posibles caches de Traefik pueden ocultar el cambio aún cuando el build esté listo.

Esto agrega ~2–5 minutos por iteración de feedback. Pendiente la sesión de hoy: confirmar que el redeploy disparado resolvió el desfase.

### 3.3 Sub-hallazgo — el subdominio `coolify.ioon.mx` ya resuelve, pero está roto

La ficha técnica de Serclin (8.14.2.6) reportó el 12 de mayo que `coolify.ioon.mx` devolvía `DNS_PROBE_FINISHED_NXDOMAIN`. Al diagnosticar el desfase de hoy, intenté abrir esa URL y encontré un estado distinto y peor:

- DNS sí resuelve — apunta a `178.104.111.155` (mismo IP que sirve `serclin.ioon.mx`).
- TLS handshake completa, pero con certificado *self-signed* `CN=TRAEFIK DEFAULT CERT` (no es el Let's Encrypt esperado).
- HTTP responde `503 Service Unavailable`.

Lectura: en algún momento entre el 12 y el 14 de mayo se agregó el registro DNS para `coolify.ioon.mx`, pero **no se configuró ni la regla de routing en Traefik** (label `Host('coolify.ioon.mx')` en el contenedor de Coolify) **ni el certificado Let's Encrypt** para ese host. El resultado es peor que NXDOMAIN porque pasa el TLS handshake y devuelve 503 — más confuso al diagnosticar y suficiente para que un agente (o el propio Francisco en una próxima sesión) crea que el panel sí está expuesto y pierda tiempo intentando entrar antes de caer en cuenta de que sigue siendo SSH tunnel only.

Pendiente arquitectónico para 8.4.10 (no se resuelve en esta nota):

1. **Decisión binaria:** mantener Coolify solo vía SSH tunnel (más seguro, sin endpoint público que defender) o completar la exposición pública con autenticación SSO + IP allowlist.
2. **Si se mantiene SSH-only:** eliminar el registro DNS de `coolify.ioon.mx` para que vuelva a dar NXDOMAIN y no engañe a futuras sesiones. Actualizar `ioon_8-0-2 §4` removiendo cualquier mención al subdominio público.
3. **Si se decide exponer:** configurar Traefik label + Let's Encrypt + capa de auth (basic auth Traefik, o mejor SSO via Authentik / authentik-forward-auth). El costo en superficie de ataque del panel admin justifica análisis previo, no acción reactiva.

Mientras se decide, el patrón documentado en la ficha de Serclin (8.14.2.6) sigue siendo el oficial: `ssh -L 8000:localhost:8000 ioon-new` → `http://localhost:8000`.

### 3.4 Hallazgo secundario — higiene de git en sesiones de varios bloques

Bloque B nunca quedó como commit propio. La intención era separar A/B/C para trazabilidad del feedback de José Arnaud; en la práctica, los cambios de Bloque B (scroll-snap + frases-puente + `label` prop) viajaron escondidos dentro del commit de Bloque A.

No es crítico — funcionalmente todo está en `main` — pero rompe la lectura del git log como historial de feedback. Mitigación futura: `git status` + `git diff --staged` antes de cada `git commit`, especialmente cuando se trabaja por bloques diferenciados en una misma sesión.

---

## 4. Implicaciones para 8.4

### 4.1 Para 8.4.10 (stack pendientes / Coolify)

La fila de Coolify en la matriz del stack tiene que reflejar tres caveats. Hoy dice "Acceso vía SSH tunnel" como única particularidad operativa. Falta agregar:

- **Auto-deploy on push: no confiable** — asumir best-effort.
- **Patrón default: Redeploy manual con Force rebuild** en la UI tras cada push relevante.
- **SLA implícito por iteración: +5 min** sobre el tiempo de build, atribuible a la disciplina de redeploy manual.
- **Subdominio público `coolify.ioon.mx` está mal configurado** (DNS resuelve, Traefik devuelve 503). Decisión pendiente: limpiar DNS o completar exposición pública (ver §3.3).

### 4.2 Para 8.4.12 (stack creativo-web / orquestación)

La proyección de la ficha de Serclin de que "los futuros deploys cliente con Coolify deberían tomar ~1 h" se sostiene **para el primer despliegue** (P0-2.7 tomó 3 h, P0-2.8 inicial debería ser ~1 h). Pero los ciclos posteriores de feedback no son gratuitos: cada ronda exige el ritual de redeploy manual. Para clientes con muchas iteraciones rápidas (como Serclin con José Arnaud), conviene presupuestar ese overhead operativo en la cotización o en el alcance.

### 4.3 Para 8.14.2 (próxima sesión Serclin)

Pendiente: confirmar que el redeploy disparado al cierre de la sesión P0-2.8 resolvió el desfase. Si no, escalar a diagnóstico de la causa raíz (webhook GitHub→Coolify mal configurado, repo equivocado en source, branch incorrecta, o un problema de build silencioso en Astro/Docker).

---

## 5. Preguntas que 8.4 puede decidir posponer

Esta nota **no** pretende que 8.4 resuelva ahora mismo:

- Si vale la pena reemplazar Coolify por otra opción (Caprover, Dokku, Kamal, GitHub Actions + rsync) — eso es una pregunta de 8.5 stack a futuro, no detonada por este caso aislado.
- Si conviene escribir un script `ioon-redeploy <proyecto>` que abra el tunnel, dispare el redeploy via API de Coolify y haga hard-refresh — automatización útil pero no urgente.
- Si la disciplina de git separar A/B/C/D por bloque amerita un alias o pre-commit hook — micro-optimización personal de Francisco, no decisión técnica de ioon.

Estas quedan como pendientes potenciales, listas para 8.4 cuando haya bandwidth para revisarlas.

---

## 6. Recomendación operativa (sin esperar decisión de 8.4)

Hasta que se diagnostique la causa raíz del auto-deploy fallido:

1. **Tras cada `git push` a `main` de un proyecto cliente desplegado en Coolify:** asumir que NO se desplegó. Verificar manualmente con `curl https://<dominio>.ioon.mx | grep <texto-nuevo>` antes de notificar al cliente.
2. **Si el `curl` no encuentra el cambio:** disparar Redeploy con Force rebuild desde la UI de Coolify.
3. **Solo después de confirmar el HTML actualizado en producción**, notificar al cliente o cerrar el ticket de feedback.

Esta disciplina cierra el riesgo de presentar al cliente cambios que aún no están en vivo — situación que casi pasa en la sesión P0-2.8 si Francisco no hubiera abierto el sitio él mismo para verificar.

---

*Nota generada el 2026-05-14 al cierre de la sesión Serclin P0-2.8 Bloques A/B/C. Diagnóstico confirmado vía `curl`; redeploy manual disparado por Francisco al cierre de la sesión. Pendiente confirmar resolución en la próxima entrada de 8.14.2.*
