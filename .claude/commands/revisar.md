---
description: Revisar los cambios actuales (o una rama o PR) contra los estándares de HuellaGo y reportar problemas priorizados
argument-hint: "[rama, PR o carpeta — por defecto, los cambios sin commitear y la rama actual frente a master]"
---

Revisa como revisor senior de HuellaGo: **$ARGUMENTS** (si está vacío, `git diff master...HEAD` más los cambios sin commitear).

Comprueba, en este orden:

1. **Correctitud:** errores de lógica, casos borde (vacío, null, API caída, doble clic), condiciones de carrera y diferencias de hidratación en la web.
2. **Seguridad:** que se compruebe la pertenencia en el service (el `userId` nunca sale del body), que no se filtren campos sensibles, que no haya secretos y que no se lean `.env` (ver `.claude/rules/seguridad.md`).
3. **Arquitectura:** las capas `controller → service → repository`, imports relativos en el backend, los DTOs declarando todos los campos, y en la web las acciones por `lib/backend.ts` con su respaldo local.
4. **Contrato de la API:** si cambió la forma de una respuesta, que estén actualizados la web, la app y `docs/desarrollo/contrato-api.md`.
5. **Base de datos:** que el cambio sea compatible con los datos existentes (`.claude/rules/database.md`).
6. **Interfaz:** los tokens del sistema visual (sin hex sueltos), los cuatro estados, la accesibilidad (`aria-*`, labels, foco) y el diseño a 390 px.
7. **Textos:** español con tildes, verbos concretos y errores que dicen cómo seguir (`.claude/rules/textos.md`).
8. **Tests:** que las reglas de negocio nuevas tengan su `*.spec.ts`.

Después ejecuta lint, typecheck, test y build en las carpetas afectadas.

**Formato de salida:** una lista ordenada de más a menos grave. Cada punto lleva `archivo:línea`, qué falla, un escenario concreto que lo dispara y la corrección sugerida. Si algo está bien, no lo enumeres. Termina con un veredicto: «listo para merge» o «requiere cambios».
