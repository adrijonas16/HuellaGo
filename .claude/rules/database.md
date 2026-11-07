---
paths:
  - "backend/prisma/**"
---

# Reglas de base de datos (Prisma + PostgreSQL)

- **La única fuente del esquema es `backend/prisma/schema.prisma`.** No crees tablas a mano en Supabase.
- En producción, el esquema vive en Supabase, en el schema `huellago`, con su propio usuario `huellago_app`. Las demás tablas de ese proyecto de Supabase no son de HuellaGo: no las toques.
- Se conecta por dos URLs: `DATABASE_URL` (pooler 6543 con `pgbouncer=true&connection_limit=1`), que usa la app, y `DIRECT_URL` (pooler 5432), que usan `db push` y las migraciones.

## Cambios compatibles

Para no romper la producción, sigue estos pasos en orden:

1. **Agregar**: los campos nuevos van como opcionales (`?`) o con `@default(...)`.
2. **Renombrar o cambiar un tipo**: crea el campo nuevo, copia los datos y elimina el viejo en un cambio posterior. No renombres de una sola vez.
3. **Eliminar**: primero quita el uso en el código (web, backend y mobile), publica, y recién después elimina el campo del esquema.
4. Si un cambio puede perder datos, **pregunta antes de aplicarlo** y explica qué datos se pierden.

## Convenciones

- Los modelos van en PascalCase singular (`EventAttendance`) y las tablas en snake_case plural con `@@map("event_attendances")`.
- Los campos van en camelCase y se mapean con `@map("snake_case")`.
- Usa `id String @id @default(uuid())`, `createdAt`, `updatedAt` y, si aplica, el borrado lógico con `status RecordStatus`.
- Los enums van en inglés y en MAYÚSCULAS (`DOG`, `UPCOMING`); los textos visibles que les corresponden se traducen en la web y en la app.
- Crea índices (`@@index`) para cada campo que se filtre en listas: `city`, `category`, `date`…

## Seed

- `prisma/seed.ts` **borra y vuelve a crear** los datos del esquema. Nunca lo corras en producción sin avisar.
- Las fechas son relativas al día de ejecución (`daysFromNow(n, 'HH:MM')`, en hora de Perú) para que los eventos siempre sean futuros.
- Los textos del seed van en español con tildes. La cuenta de ejemplo `maria.garcia@gmail.com` / `HuellaGo2026!` tiene que seguir existiendo, porque la pantalla de ingreso la ofrece.

## Aplicar cambios

```bash
cd backend
DATABASE_URL=... DIRECT_URL=... npm run db:push      # sincroniza el esquema
DATABASE_URL=... DIRECT_URL=... npm run prisma:seed  # solo si hace falta
```

Después de cambiar el esquema, ejecuta `npm run build` en el backend; también regenera el cliente.
