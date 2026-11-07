---
name: nuevo-endpoint-api
description: Crear o modificar un endpoint o módulo de la API NestJS de HuellaGo siguiendo la arquitectura controller → service → repository, con DTOs validados, Swagger, tests y el contrato con web y mobile. Úsala cuando haya que agregar una ruta, un recurso o una regla de negocio en backend/.
---

# Nuevo endpoint en la API

Lee antes `.claude/rules/backend.md`. Toma como modelo el módulo `events`, que tiene validaciones de pertenencia y su test.

## 1. Diseña el contrato primero

Escribe en el PR o en tu plan, antes de programar:
- Método y ruta (`POST /api/events/:id/attend`), y si es pública o privada.
- El body y la query, campo por campo, con el tipo y si es obligatorio.
- La respuesta: un objeto plano, un array plano o `{ data, meta }`.
- Los errores posibles, con su mensaje en español.

Si cambia algo que ya consumen la web o la app, mira quién lo usa con `grep -rn "<ruta>" web/src mobile/lib`.

## 2. Si el recurso es nuevo, crea el módulo

```
backend/src/modules/<recursos>/
  <recursos>.module.ts       # controllers, providers [Service, Repository], exports [Service]
  <recursos>.controller.ts
  <recursos>.service.ts
  <recursos>.repository.ts
  dto/create-<recurso>.dto.ts, update-<recurso>.dto.ts (PartialType), query-<recurso>.dto.ts
```

Regístralo en `src/app.module.ts`. Usa siempre imports relativos.

## 3. Implementa capa por capa

1. **DTO**: `class-validator` + `@ApiProperty`. Declara cada campo que mande el cliente (`forbidNonWhitelisted` rechaza los que no estén). Los enums vienen de `@prisma/client`.
2. **Repository**: consultas Prisma con `select` o `include` explícitos. Nunca devuelvas `passwordHash`. Si el service necesita comprobar pertenencia, agrega un método como `isPetOwnedBy(petId, userId)`.
3. **Service**: las reglas de negocio, en este orden: que exista (404), que pertenezca al usuario (403), que el estado sea válido (400) y que no esté duplicado (400 o 409). Los mensajes van en español, son accionables y llevan tildes.
4. **Controller**: `@ApiTags`, `@ApiOperation({ summary })`, y en las privadas `@UseGuards(JwtAuthGuard)` + `@ApiBearerAuth()`. El usuario sale de `@CurrentUser('id')`. Sin lógica.

## 4. Tests

Crea o amplía `<recursos>.service.spec.ts` siguiendo `events.service.spec.ts`, con un `it` por regla: el caso feliz, 404, 403 y cada 400.

```bash
cd backend && npm test && npm run lint && npm run typecheck && npm run build
```

## 5. Conecta a los consumidores

- Web: agrega la función en `web/src/lib/backend.ts` (si es una acción con sesión) o usa `fetchApi` (si es una lectura pública), y mantén el respaldo con mocks.
- Mobile: agrega la ruta en `api_constants.dart` y el método en el repositorio que corresponda.
- Documenta la ruta en `docs/desarrollo/contrato-api.md`.

## 6. Prueba de punta a punta

Levanta la API (`npm run start:dev`) y prueba con curl o Swagger (`/api/docs`): el caso feliz, sin token (401), con el recurso de otro usuario (403) y con datos inválidos (400, con el mensaje legible).
