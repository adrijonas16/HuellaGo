# Instrucciones para Copilot en HuellaGo

Sigue `AGENTS.md` (raíz del repo) y la regla del área que estés tocando en `.claude/rules/` (backend, web, database, mobile, textos, seguridad, git-y-despliegue). Lo esencial:

- Los textos que ve la persona usuaria van en español de Perú, con tildes; los identificadores del código, en inglés.
- Backend: `controller → service → repository`, DTOs con `class-validator` que declaran cada campo, imports relativos (nunca `@common/*`), y comprobar en el service que el recurso pertenece al usuario.
- Web: tokens de `tailwind.config.ts` (sin hex sueltos), componentes de `components/ui`, acciones vía `lib/backend.ts` con respaldo local, y los estados de carga, vacío y error.
- Nunca leas ni escribas secretos ni archivos `.env`.
