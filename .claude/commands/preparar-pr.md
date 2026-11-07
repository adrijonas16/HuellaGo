---
description: Verificar la rama actual y dejar listo el pull request hacia master con la plantilla de HuellaGo
argument-hint: "[título opcional del PR]"
---

Prepara el PR de la rama actual hacia `master`. Título sugerido: **$ARGUMENTS**

1. Comprueba que no estás en `master`. Si lo estás, crea una rama `tipo/descripcion` con los cambios.
2. Revisa `git status` y `git diff master...HEAD`: que no haya archivos `.env`, `dist/`, `.next/`, `node_modules/` ni secretos.
3. Ejecuta en cada carpeta tocada:
   - `backend/`: `npm run lint && npm run typecheck && npm test && npm run build`
   - `web/`: `npm run lint && npm run typecheck && npm run build`
   - `mobile/`: `flutter analyze` (si está instalado)
   Corrige lo que falle antes de seguir.
4. Pasa `/revisar` sobre la rama y resuelve todo lo bloqueante o importante.
5. Escribe commits en español e imperativo (`.claude/rules/git-y-despliegue.md`). Haz push de la rama, **nunca a `master`**.
6. Abre el PR con `gh pr create --base master` llenando `.github/pull_request_template.md`:
   - **Qué cambia y por qué**, en 2 a 4 líneas.
   - **Cómo se probó**: comandos, flujos y capturas en móvil y escritorio si es visible.
   - **Riesgos**: base de datos, contrato de la API, variables nuevas.
7. Devuelve el enlace del PR y, cuando Vercel lo genere, el de la vista previa.
