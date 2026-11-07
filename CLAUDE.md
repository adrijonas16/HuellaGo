@AGENTS.md

## Notas para Claude Code

- Las reglas de `.claude/rules/` se cargan según la carpeta que toques; léelas antes de editar si no aparecieron en el contexto.
- Para las tareas habituales hay skills en `.claude/skills/`: `nuevo-endpoint-api`, `nueva-pantalla-web`, `cambio-base-de-datos`, `qa-funcional`, `revision-diseno` y `publicar-cambios`. Úsalas en vez de improvisar el procedimiento.
- Comandos disponibles: `/revisar`, `/nueva-funcionalidad`, `/qa` y `/preparar-pr`.
- No leas ni muestres archivos `.env`. Si necesitas un valor, pregúntalo o usa el `.env.example`.
- Antes de hacer push a `master`, recuerda que se publica en producción: confirma con la persona.
