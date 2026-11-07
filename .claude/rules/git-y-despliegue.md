# Git, PRs y despliegue

## Ramas y commits

- Parte siempre de `master` actualizado: `git switch master && git pull`.
- La rama se llama `tipo/descripcion-corta`, donde el tipo es `feat`, `fix`, `docs`, `chore`, `refactor` o `test`. Ejemplo: `feat/filtro-distrito-directorio`.
- Commits en español, en imperativo, con un primer renglón de 72 caracteres o menos: «Agregar filtro de distrito al directorio». Si hace falta, explica en el cuerpo el *porqué*.
- Un commit no mezcla formateo masivo con lógica. Si necesitas formatear, hazlo en un commit aparte.

## Pull requests

- Apuntan a `master` y usan la plantilla `.github/pull_request_template.md`.
- La CI (`.github/workflows/ci.yml`) corre lint, typecheck, tests y build del backend y de la web; tiene que pasar en verde.
- Vercel crea una vista previa por PR: pruébala y deja el enlace en el PR.
- En los cambios visibles, agrega capturas de antes y después, en móvil y en escritorio.

## Despliegue

- **Merge a `master` = producción.** Vercel publica la web (`huellago`) y la API (`huellago-api`) automáticamente.
- Si el cambio toca `schema.prisma`, aplica `db:push` a la base de datos **antes** de hacer merge, siempre que el cambio sea compatible (ver `database.md`).
- Después del merge, verifica que los dos despliegues queden en `READY` y prueba el flujo principal en https://huellago-sooty.vercel.app (skill `publicar-cambios`).
- Si algo falla en producción, vuelve al despliegue anterior desde Vercel (Instant Rollback) y después investiga.
