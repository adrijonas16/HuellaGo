# HuellaGo · guía para quien cambie el código

Esta es la fuente única de convenciones del proyecto, tanto para personas como para asistentes de IA (Claude, Cursor, Copilot, Codex…). Las reglas detalladas por área están en `.claude/rules/` y se cargan solas al tocar esos archivos. Si algo de aquí choca con lo que ves en el código, gana este documento: corrige el código o actualiza este archivo en el mismo cambio.

## Qué es

Plataforma para dueños de mascotas en Arequipa, Perú: directorio de servicios pet, eventos, rutas de paseo, comunidad y adopción. Todo el producto está en español de Perú.

| Carpeta | Qué hay | Stack |
|---------|---------|-------|
| `web/` | Sitio web | Next.js 14 (App Router), React 18, Tailwind, Zustand |
| `backend/` | API REST en `/api` | NestJS 10, Prisma 5, PostgreSQL |
| `mobile/` | App móvil (en construcción) | Flutter 3, Riverpod, go_router, Dio |
| `docs/` | Producto, diseño, estrategia y documentación técnica | Markdown |

Producción: la web en Vercel (proyecto `huellago`), la API en Vercel (proyecto `huellago-api`) y la base de datos en Supabase, en el esquema `huellago`. **Todo push a `master` se publica en producción.** Más detalle en `docs/desarrollo/`.

## Comandos

```bash
# Backend (desde backend/)
npm run start:dev      # API en http://localhost:3000/api, con Swagger en /api/docs
npm run lint           # ESLint + Prettier
npm run typecheck
npm test               # Jest
npm run build          # prisma generate + nest build
npm run db:push        # aplica schema.prisma a la base de datos
npm run prisma:seed    # datos de ejemplo (borra los del esquema)

# Web (desde web/)
npm run dev            # http://localhost:3001
npm run lint
npm run typecheck
npm run build

# Mobile (desde mobile/)
flutter pub get && flutter analyze && flutter run
```

## Reglas de oro

1. **Español de Perú, con tildes y ñ**, en todo lo que ve la persona usuaria: textos, errores de la API, toasts y mensajes de validación. Los identificadores del código van en inglés.
2. **Un cambio, un propósito.** No mezcles refactors ni formateo masivo con una funcionalidad.
3. **Respeta las capas.** Backend: `controller → service → repository → Prisma`. Web: `page → components → lib/backend.ts / services → API`. No te saltes capas.
4. **Nada de secretos en el repo.** Las variables van en `.env` (ignorado) o en Vercel. Si agregas una variable nueva, actualiza el `.env.example` correspondiente.
5. **Sin alias de rutas en el backend** (`@common/...`): usa imports relativos, porque en `dist/` los alias no se resuelven y la API no arranca.
6. **La web debe funcionar aunque la API falle.** Si la API no responde, se usan los datos de `lib/mock-data.ts` y la sesión de demostración. Nunca dejes una pantalla en blanco ni un error sin explicar.
7. **Usa el sistema visual.** Los colores, las tipografías y los radios están en `web/tailwind.config.ts`; no escribas hex sueltos. Usa los componentes de `web/src/components/ui` antes de crear otros nuevos.
8. **Accesibilidad mínima:** cada botón de icono lleva `aria-label`, los toggles llevan `aria-pressed`, el foco se ve, y las animaciones respetan `prefers-reduced-motion`.
9. **Cambios de base de datos solo en `backend/prisma/schema.prisma`**, y siempre compatibles con los datos que ya existen (ver `.claude/rules/database.md`).
10. **Antes de dar algo por terminado**, pasa la *definición de terminado* de abajo.

## Definición de terminado

- [ ] `lint`, `typecheck` y `build` pasan en cada carpeta que tocaste (la CI lo comprueba en cada PR).
- [ ] Las reglas de negocio nuevas del backend tienen su test en `*.spec.ts` (el modelo a seguir es `events.service.spec.ts`).
- [ ] Probaste el flujo a mano o con Playwright: el caso feliz, un error y el estado vacío.
- [ ] Revisaste la web en móvil (390 px) y en escritorio, sin desbordamiento horizontal.
- [ ] Los textos están en español, con tildes, y en voz activa.
- [ ] Si cambió el contrato de la API, actualizaste `docs/desarrollo/contrato-api.md` y a sus consumidores (web y mobile).
- [ ] El PR usa la plantilla y explica qué cambió y cómo se probó.

## Flujo de trabajo

- Crea una rama desde `master`: `feat/…`, `fix/…`, `docs/…` o `chore/…`.
- Escribe commits en español, en imperativo y descriptivos: «Agregar filtro de distrito al directorio».
- Abre un PR hacia `master`. Cada PR genera una vista previa en Vercel; al hacer merge se publica en producción.
- Nunca hagas `push --force` a `master`.

## Dónde está cada cosa

- Reglas por área: `.claude/rules/` (backend, web, database, mobile, textos, seguridad, git).
- Procedimientos paso a paso (skills): `.claude/skills/`.
- Prompts reutilizables (comandos): `.claude/commands/`.
- Arquitectura, contrato de la API y despliegue: `docs/desarrollo/`.
- Producto, pantallas y marca: `docs/01-producto` … `docs/05-prototipo`.
