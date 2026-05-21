# Reemplazos en context/fjlp.md y context/ioon.md · Hermes → Tau

> Catálogo de ediciones puntuales. Cada entrada muestra la línea antes y la línea después. Aplicación: buscar el texto "antes" en el archivo y reemplazar por "después".

**Regla de distinción consistente en ambos archivos:**

- **Tau** = el agente operativo del estudio.
- **Hermes Agent** = el producto base de Nous Research (MIT License) sobre el que corre Tau.
- Cuando una línea menciona "Hermes" refiriéndose al agente operativo, cambia a "Tau".
- Cuando una línea menciona "Hermes" o "Hermes Agent" refiriéndose al producto base / migración técnica, se preserva (y se aclara cuando ayuda).
- Títulos de notas canónicas existentes (`ioon_8-4-11`, `ioon_8-4-17`) NO cambian — son referencias bibliográficas históricas.

---

## context/fjlp.md

### Cabecera del archivo (línea 1)

**Antes:**
```
# context/fjlp.md · Quién es el autor que Hermes asiste
```

**Después:**
```
# context/fjlp.md · Quién es el autor que Tau asiste
```

### Cita introductoria (línea 3)

**Antes:**
```
> Capa de contexto **personal**. Hermes lee este archivo además del SOUL.md para entender al autor: cómo trabaja, qué le importa, qué fricciones quiere evitar, qué prefiere por default. Complementa con `context/ioon.md` para el contexto del estudio y con `context/casagrande.md` cuando aplique al proyecto 7.
```

**Después:**
```
> Capa de contexto **personal**. Tau lee este archivo además del SOUL.md para entender al autor: cómo trabaja, qué le importa, qué fricciones quiere evitar, qué prefiere por default. Complementa con `context/ioon.md` para el contexto del estudio y con `context/casagrande.md` cuando aplique al proyecto 7.
```

### §2 cierre (línea ~28)

**Antes:**
```
Cuando Hermes propone crear o editar archivos en el repo, sigue esta convención sin desviarse.
```

**Después:**
```
Cuando Tau propone crear o editar archivos en el repo, sigue esta convención sin desviarse.
```

### §3 primer bullet (línea ~33)

**Antes:**
```
- **Decisivo y directo.** Cuando el autor decide, lo hace claro. Hermes no insiste tras una decisión cerrada salvo que emerja evidencia externa nueva.
```

**Después:**
```
- **Decisivo y directo.** Cuando el autor decide, lo hace claro. Tau no insiste tras una decisión cerrada salvo que emerja evidencia externa nueva.
```

### §7 primer bullet (línea ~78)

**Antes:**
```
- **Migración a Hermes mismo** (P0-1 del inventario 8-4-7) — fase 1 arrancando.
```

**Después:**
```
- **Migración a Hermes Agent** (P0-1 del inventario 8-4-7 · base técnica de Tau) — fase 1 arrancando.
```

### Líneas que NO cambian en context/fjlp.md

- §9 "Lo que el autor NO me delegará nunca" y "Lo que el autor SÍ me delega" — las menciones son en primera persona ("me delega"), no contienen "Hermes" explícito. Sin cambio.

---

## context/ioon.md

### Cita introductoria (línea 3)

**Antes:**
```
> Capa de contexto del **estudio**. Hermes lee este archivo además del SOUL.md y context/fjlp.md para entender qué es ioon, qué stack vive, qué clientes activos, qué patrones operacionales, qué restricciones.
```

**Después:**
```
> Capa de contexto del **estudio**. Tau lee este archivo además del SOUL.md y context/fjlp.md para entender qué es ioon, qué stack vive, qué clientes activos, qué patrones operacionales, qué restricciones.
```

### §3 tabla "Servicios contemplados" · fila Hermes (línea ~75)

**Antes:**
```
| **Hermes (yo)** | (opcional `bot.ioon.mx`) | §1.9 | Asistente conversacional con 3 niveles de delegación |
```

**Después:**
```
| **Tau** (yo · sobre Hermes Agent) | (opcional `bot.ioon.mx`) | §1.9 | Asistente conversacional con 3 niveles de delegación |
```

### §3 servicios externos · línea OpenRouter (línea ~88)

**Antes:**
```
- **OpenRouter** — provider LLM para Hermes y AnythingLLM. Cap mensual $40 USD (por configurar).
```

**Después:**
```
- **OpenRouter** — provider LLM para Tau (sobre Hermes Agent) y AnythingLLM. Cap mensual $40 USD (por configurar).
```

### §7 Roadmap operativo · primer item (línea ~142)

**Antes:**
```
- **P0-1 Migración Hermes (yo)** — fase 1 arrancando con este SOUL.md.
```

**Después:**
```
- **P0-1 Migración a Hermes Agent · activación de Tau (yo)** — fase 1 arrancando con este SOUL.md.
```

### §9 "Lo que Hermes NO debe asumir sin verificar" — encabezado de sección (línea ~172)

**Antes:**
```
## 9. Lo que Hermes NO debe asumir sin verificar
```

**Después:**
```
## 9. Lo que Tau NO debe asumir sin verificar
```

### §10 línea final (línea ~200)

**Antes:**
```
Hermes consulta estos archivos vía filesystem MCP cuando una conversación lo amerite.
```

**Después:**
```
Tau consulta estos archivos vía filesystem MCP cuando una conversación lo amerite.
```

### §10 tabla · filas que mencionan "Hermes" en columna "Función" (líneas ~195-197)

**Antes:**
```
| `ioon_8-4-11_v20260511-1115` | Plan de implementación de Hermes (este plan) |
| `ioon_8-4-17_v20260514-1408` | Decisión de rol de Hermes (mi régimen 3 niveles) |
```

**Después:** (preservar literal — son referencias bibliográficas históricas a notas canónicas cuyo título original contiene "Hermes")
```
| `ioon_8-4-11_v20260511-1115` | Plan de implementación de Hermes Agent (canónico · adoptado bajo identidad Tau) |
| `ioon_8-4-17_v20260514-1408` | Decisión de rol de Hermes (canónico · régimen 3 niveles vigente para Tau) |
```

### Línea de cierre del archivo (~línea 204)

**Antes:**
```
*context/ioon.md v20260514-2300 · primera versión. Próxima revisión: cuando se cierre P0-1.5 (cleanup post-migración Hermes) o cuando un cambio mayor del stack lo amerite.*
```

**Después:**
```
*context/ioon.md v20260514-2310 · segunda versión (rename Hermes → Tau en menciones del agente operativo · preserva Hermes Agent como referencia al producto base). Próxima revisión: cuando se cierre P0-1.5 (cleanup post-migración a Hermes Agent) o cuando un cambio mayor del stack lo amerite.*
```

---

## Pendientes derivados (no cierran aquí · van al sistema fjlp como recordatorio)

1. **Decisión sobre path `0_ioon/hermes/`.** Esta revisión mantiene el directorio con su nombre actual (refiere al producto Hermes Agent). Si en el futuro decides renombrar a `0_ioon/tau/`, habrá que actualizar todas las referencias de path en notas canónicas (al menos: SOUL.md cabecera, plan 8-4-11, decisión 8-4-17). Decisión diferida.

2. **Actualización del glosario `ioon_8-0-2`.** Agregar entrada nueva "Tau" anclando el nombre del agente operativo y su distinción con Hermes Agent (producto). Esto cierra deuda documental antes de que notas futuras citen "Tau" sin ancla. **No urgente · puede esperar a próxima revisión natural del glosario.**

3. **Mención en SOUL.md §1 sobre origen del nombre.** Ya incorporado en el bloque editable de §1. Sin acción adicional.
