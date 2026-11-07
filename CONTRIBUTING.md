# Cómo contribuir

1. Lee **`AGENTS.md`**: ahí están la estructura, los comandos, las reglas de oro y la definición de terminado. Vale igual para personas y para asistentes de IA.
2. Antes de tocar un área, lee su regla:

   | Si tocas… | Lee |
   |-----------|-----|
   | `backend/src` | `.claude/rules/backend.md` |
   | `backend/prisma` | `.claude/rules/database.md` |
   | `web/` | `.claude/rules/web.md` |
   | `mobile/` | `.claude/rules/mobile.md` |
   | cualquier texto visible | `.claude/rules/textos.md` |
   | siempre | `.claude/rules/seguridad.md`, `.claude/rules/git-y-despliegue.md` |

3. Para tareas habituales, sigue el paso a paso de `.claude/skills/`:
   `nuevo-endpoint-api`, `nueva-pantalla-web`, `cambio-base-de-datos`, `qa-funcional`, `revision-diseno` y `publicar-cambios`.
4. Crea una rama `tipo/descripcion` desde `master`, abre un PR con la plantilla y espera a que la CI esté en verde.
5. **Hacer merge a `master` lo publica en producción.** Revisa la vista previa de Vercel antes.

## Si usas un asistente de IA

| Herramienta | Lo que lee |
|-------------|------------|
| Claude Code | `CLAUDE.md`, que importa `AGENTS.md`, más `.claude/rules`, `.claude/skills`, los comandos de `.claude/commands` y los permisos de `.claude/settings.json` |
| Cursor | `.cursor/rules/huellago.mdc`, que apunta a `AGENTS.md` y a las reglas |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Codex y otros | `AGENTS.md` |

Comandos de Claude Code listos para usar:

- `/nueva-funcionalidad <descripción>`: planifica e implementa de punta a punta.
- `/revisar [rama o carpeta]`: revisa los cambios contra los estándares.
- `/qa [local | preview <url> | prod]`: prueba como QA, como usuario y como diseñador.
- `/preparar-pr [título]`: verifica todo y abre el PR.

Si cambias una convención, actualiza `AGENTS.md` o la regla correspondiente en el mismo PR, para que la documentación y el código no se separen.
