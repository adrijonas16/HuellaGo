---
description: Probar HuellaGo como QA, usuario y diseñador en local, en una vista previa o en producción, y reportar fallos priorizados
argument-hint: "[local | preview <url> | prod] [flujo o pantalla opcional]"
---

Haz QA de HuellaGo: **$ARGUMENTS** (si está vacío, local y todos los flujos).

1. Sigue la skill `qa-funcional`: los flujos obligatorios más lo que pida el argumento. Usa Playwright si está disponible; si no, recorre a mano.
2. Sigue la skill `revision-diseno` en las pantallas que recorriste (390 px y 1440 px).
3. Ponte en el lugar de una persona que entra por primera vez: ¿entiende qué hacer? ¿Algo la confunde o la deja sin salida?

Entrega:
- Una tabla `PASS/FAIL` por flujo.
- Los fallos ordenados como bloqueante, importante y menor, cada uno con URL, viewport, pasos, qué esperabas y qué pasó, y una captura.
- Las sugerencias de UX, aparte y breves.

Si probaste en producción, borra al terminar los datos de prueba que creaste.
