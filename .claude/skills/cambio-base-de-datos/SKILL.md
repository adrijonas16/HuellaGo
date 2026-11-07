---
name: cambio-base-de-datos
description: Modificar el esquema Prisma de HuellaGo (modelos, campos, enums, índices) o el seed de forma segura y compatible con producción en Supabase (schema huellago). Úsala siempre que se toque backend/prisma/schema.prisma o backend/prisma/seed.ts.
---

# Cambio en la base de datos

Lee antes `.claude/rules/database.md`. La producción comparte el proyecto de Supabase con otras apps: trabaja solo en el schema `huellago`.

## 1. Clasifica el cambio

| Tipo | ¿Seguro de una vez? | Cómo hacerlo |
|------|---------------------|--------------|
| Modelo, campo opcional, campo con `@default`, índice o valor de enum nuevo | Sí | Se aplica directo |
| Campo obligatorio sin default | No | Agrégalo como opcional, completa los datos y después hazlo obligatorio |
| Renombrar un campo o una tabla | No | Crea el nuevo, copia los datos, cambia el código y elimina el viejo en otro PR |
| Eliminar un campo, una tabla o un valor de enum | No | Quita su uso en web, backend y mobile, publica, y recién después elimínalo |

Si hay pérdida de datos posible, **detente y pregunta** antes de aplicar.

## 2. Edita el esquema

- Modelos en PascalCase singular con `@@map("snake_plural")`, y campos en camelCase con `@map("snake_case")`.
- `id String @id @default(uuid())`, más `createdAt @default(now())` y `updatedAt @updatedAt`.
- Agrega un `@@index([...])` para cada campo que se filtre en listas.

## 3. Actualiza el código que lo usa

- El repository y el DTO del backend (si un cliente lo envía, el DTO tiene que declararlo).
- `web/src/interfaces/` y, si aplica, `web/src/lib/mock-data.ts`, para que el respaldo tenga la misma forma.
- `mobile/lib/data/models/`.
- `prisma/seed.ts`, si hace falta: con fechas `daysFromNow()` y textos con tildes.

## 4. Verifica localmente

```bash
cd backend
npm run build          # regenera el cliente de Prisma y compila
npm test
DATABASE_URL=<local> DIRECT_URL=<local> npm run db:push
DATABASE_URL=<local> DIRECT_URL=<local> npm run prisma:seed
```

## 5. Aplica en producción

1. Hazlo **antes** del merge, solo si el cambio es compatible.
2. Pide a la persona responsable las URLs de producción; están en las variables de Vercel del proyecto `huellago-api` y nunca se copian al repo.
3. `npm run db:push` con esas URLs. **No** corras el seed en producción sin avisar: borra los datos.
4. Después del merge, verifica la API (skill `publicar-cambios`).
