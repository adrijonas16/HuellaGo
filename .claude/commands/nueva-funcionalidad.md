---
description: Planificar e implementar una funcionalidad de punta a punta (API, web y mobile) siguiendo los estándares de HuellaGo
argument-hint: <qué funcionalidad quieres>
---

Vas a implementar esta funcionalidad en HuellaGo: **$ARGUMENTS**

Trabaja en este orden y no te saltes pasos:

1. **Entiende y acota.** Lee `AGENTS.md` y busca en `docs/01-producto` y `docs/02-diseno` si la funcionalidad ya está descrita. Resume en 3 a 5 líneas qué hará la persona usuaria, qué pantallas toca y qué datos necesita. Si algo es ambiguo y equivocarse cuesta caro (cambia la base de datos o una pantalla principal), pregunta antes de seguir.
2. **Plan.** Lista los archivos que vas a crear o tocar en `backend/`, `web/` y `mobile/`, y el contrato de la API (rutas, DTOs, respuestas y errores). Crea una rama `feat/<nombre-corto>`.
3. **Base de datos**, si hace falta: sigue la skill `cambio-base-de-datos`.
4. **API:** sigue la skill `nuevo-endpoint-api`, con los tests incluidos.
5. **Web:** sigue la skill `nueva-pantalla-web`, con los cuatro estados (cargando, vacío, error y éxito) y el respaldo sin API.
6. **Mobile:** si la funcionalidad aplica a la app, agrega el modelo, el repositorio y la pantalla según `.claude/rules/mobile.md`.
7. **Verifica:** lint, typecheck, test y build en cada carpeta tocada; después las skills `qa-funcional` y `revision-diseno`.
8. **Cierra:** actualiza `docs/desarrollo/contrato-api.md` si cambió la API y prepara el PR con `/preparar-pr`.

Al terminar, resume en pocas líneas qué hiciste, cómo se prueba y qué quedó pendiente.
