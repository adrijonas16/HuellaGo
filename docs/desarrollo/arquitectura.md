# Arquitectura técnica

```
            ┌──────────────┐        ┌──────────────┐
 Navegador ─┤  web/        │  HTTPS │  backend/    │  Prisma   ┌──────────────────────┐
            │  Next.js 14  ├───────►│  NestJS 10   ├──────────►│ PostgreSQL (Supabase)│
 App móvil ─┤  (Vercel)    │        │  (Vercel)    │           │ schema "huellago"    │
   Flutter ─┴──────────────┘        └──────────────┘           └──────────────────────┘
        └──────────────── también consume la API ───────┘
```

## Backend (`backend/`)

- `src/main.ts`: prefijo `/api`, Helmet, CORS configurable (`FRONTEND_URL` más `huellago*.vercel.app`), validación global (`whitelist`, `forbidNonWhitelisted`, `transform`), filtro global de errores y Swagger en `/api/docs`.
- `src/modules/<recurso>`: cada módulo tiene controller (HTTP), service (reglas), repository (Prisma) y DTOs.
- `src/common`: decoradores (`@CurrentUser`, `@Roles`), DTO de paginación, filtro de errores, guards e interceptores.
- `src/database`: `PrismaService` global.
- Autenticación: JWT (access + refresh) con Passport y `JwtAuthGuard`; las contraseñas se guardan con `bcryptjs`.

## Web (`web/`)

- App Router de Next.js 14. Las páginas públicas se renderizan en el servidor cuando es posible (el inicio usa ISR de 60 s).
- **Datos con respaldo:** cada lectura intenta la API y, si falla, usa `lib/mock-data.ts`. El login entra en modo demo si la API no responde.
- **Estado del cliente:** `lib/store.ts` (Zustand persistido) guarda favoritos, inscripciones, mascotas locales y avisos; `hooks/use-auth.ts` guarda la sesión.
- **Acciones con sesión real:** `lib/backend.ts` las envía a la API y, si no hay sesión real o el recurso es de ejemplo, quedan locales.
- **Sistema visual «Cielo de Arequipa»:** tokens en `tailwind.config.ts`, estilos y animaciones en `styles/globals.css`, y fuentes propias con `@fontsource`.

## Mobile (`mobile/`)

App Flutter en construcción: Riverpod, go_router y Dio. La estructura es `core/` (red, rutas, tema), `data/` (modelos y repositorios) y `presentation/screens/`.

## Decisiones importantes

| Decisión | Por qué |
|----------|---------|
| Imports relativos en el backend | Los alias de TypeScript no se resuelven en `dist/` y la API no arrancaba |
| `bcryptjs` en lugar de `bcrypt` | El binario nativo falla en las funciones serverless de Vercel |
| Un schema propio en una base compartida | El proyecto de Supabase aloja otras apps; `huellago` las aísla |
| Respaldo con datos de ejemplo en la web | La web se puede mostrar y probar aunque la API esté caída |
| Fechas del seed relativas | Los eventos de ejemplo siempre son futuros |
