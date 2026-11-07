## Qué cambia y por qué

<!-- 2 a 4 líneas. Si viene de una tarea o issue, enlázala. -->

## Cómo se probó

- [ ] `lint`, `typecheck` y `build` en las carpetas tocadas
- [ ] `npm test` en el backend (si se tocó)
- [ ] Flujo probado: caso feliz, error y estado vacío
- [ ] Vista previa de Vercel revisada: <!-- enlace -->

<!-- Si es un cambio visible: capturas de antes y después, en móvil (390 px) y en escritorio -->

## Riesgos

- [ ] Cambia `schema.prisma` (¿es compatible con los datos actuales? ¿ya se aplicó `db:push`?)
- [ ] Cambia el contrato de la API (¿actualizaste web, mobile y `docs/desarrollo/contrato-api.md`?)
- [ ] Agrega variables de entorno (¿están en Vercel y en `.env.example`?)
- [ ] Ninguno de los anteriores

## Checklist

- [ ] Los textos están en español con tildes (`.claude/rules/textos.md`)
- [ ] Accesibilidad: `aria-label` en los iconos, labels en los inputs, foco visible
- [ ] No hay secretos, `.env`, `dist/` ni `.next/` en el diff
