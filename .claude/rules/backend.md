---
paths:
  - "backend/src/**"
  - "backend/test/**"
---

# Reglas del backend (NestJS)

## Estructura de un módulo

```
backend/src/modules/<recurso>/          # nombre en plural e inglés: pets, events…
├── <recurso>.module.ts
├── <recurso>.controller.ts             # HTTP: rutas, guards, DTOs, Swagger. Sin lógica.
├── <recurso>.service.ts                # reglas de negocio y errores
├── <recurso>.repository.ts             # único lugar que usa PrismaService
├── <recurso>.service.spec.ts           # tests de las reglas de negocio
└── dto/create-…dto.ts, update-…dto.ts, query-…dto.ts
```

- El controller llama solo al service, y el service llama solo a repositories (el suyo o el de otro módulo exportado). Nada fuera del repository importa `PrismaService`.
- El código compartido va en `src/common/` (decorators, dto, filters, guards, interceptors).
- Registra cada módulo nuevo en `src/app.module.ts`.
- **Usa imports relativos.** Los alias `@common/*` están prohibidos por ESLint porque rompen `dist/`.

## Endpoints

- El prefijo global es `/api`. Las rutas son sustantivos en plural (`/events/:id/attend`) y no llevan verbos, salvo acciones puntuales.
- Toda ruta privada lleva `@UseGuards(JwtAuthGuard)` y `@ApiBearerAuth()`. El usuario se obtiene con `@CurrentUser('id')`, **nunca** del body.
- Antes de modificar un recurso, comprueba en el service que pertenece al usuario (ver `EventsService.attend`). Si no le pertenece, responde `ForbiddenException`.
- Documenta cada ruta con `@ApiTags` y `@ApiOperation({ summary: '…' })` en español.

## DTOs y validación

- Cada body y cada query tiene su DTO con `class-validator` y `@ApiProperty`. Como la validación global es `whitelist + forbidNonWhitelisted`, **todo campo que mande un cliente debe estar declarado en el DTO**; si no, la petición falla con 400.
- Para editar, usa `PartialType(CreateXDto)`.
- Pagina las listas con `PaginationDto` (`page`, `limit`, `search`).

## Respuestas (contrato con web y mobile)

- Listas paginadas: `{ data: T[], meta: { total, page, limit, totalPages } }` con `PaginatedResponse`.
- Listas pequeñas propias del usuario (como `/pets` o `/favorites`): un array plano.
- Un solo recurso: el objeto plano.
- Errores: de eso se encarga `GlobalExceptionFilter`, que responde `{ success: false, statusCode, message, timestamp }`. Lanza excepciones de Nest con un mensaje **en español, con tildes, que diga qué pasó y qué hacer**: «El evento está lleno», no «Error 400».
- Si cambias una forma de respuesta, actualiza `docs/desarrollo/contrato-api.md`, `web/src/lib/backend.ts` o `web/src/services/` y `mobile/lib/data/repositories/`.

## Seguridad

- Las contraseñas se hashean con `bcryptjs` (no con `bcrypt` nativo, que falla en Vercel).
- Nunca devuelvas `passwordHash` ni tokens de otro usuario: usa `select` o `omit` en el repository.
- Las variables de entorno se leen con `ConfigService`. Cada variable nueva va a `backend/.env.example` y a Vercel.

## Tests

- Usa Jest con `*.spec.ts` junto al archivo que prueba. Testea el service con los repositories mockeados con `jest.fn()`.
- Escribe un `it` por regla de negocio y verifica también el mensaje de error.
- Ejecuta `npm test`; la CI lo corre en cada PR.

## Estilo

- Prettier (comillas simples, comas finales, 80 columnas) y ESLint: `npm run lint:fix`.
- Evita `any`. Si es inevitable, deja un comentario explicando por qué.
