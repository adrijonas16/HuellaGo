# Despliegue

| Pieza | Dónde | URL |
|-------|-------|-----|
| Web (`web/`) | Vercel, proyecto `huellago` | https://huellago-sooty.vercel.app |
| API (`backend/`) | Vercel, proyecto `huellago-api` (preset NestJS) | https://huellago-api.vercel.app/api |
| Base de datos | Supabase, proyecto «adrijonas16's Project», schema `huellago`, usuario `huellago_app` | — |

## Cómo se publica

- **Push o merge a `master`:** Vercel publica la web y la API en producción.
- **Cualquier otra rama o PR:** Vercel crea una vista previa (protegida con el login de Vercel).
- Los dos proyectos usan Node 22 y construyen desde su carpeta (`rootDirectory`).

## Variables de entorno

**`huellago-api`:** `DATABASE_URL`, `DIRECT_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_EXPIRATION`, `JWT_REFRESH_EXPIRATION`, `FRONTEND_URL` y `APP_ENV`.
**`huellago`:** `NEXT_PUBLIC_API_URL` y, opcionales, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_TIKTOK_URL` y `NEXT_PUBLIC_LEGAL_NAME` / `_RUC` / `_ADDRESS` (ver `web/.env.example`).

HTTPS: Vercel redirige siempre HTTP a HTTPS, y la web y la API envían `Strict-Transport-Security`. En las vistas previas, `robots.txt` bloquea todo para que no se indexen.

Los valores reales solo están en Vercel. Para agregar una variable: ponla en Vercel (Production y Preview), documéntala en el `.env.example` correspondiente y vuelve a desplegar.

> No definas `NODE_ENV` en Vercel: con `NODE_ENV=production` no se instalan las devDependencies y el build falla.

## Base de datos en producción

```bash
cd backend
DATABASE_URL="<de Vercel>" DIRECT_URL="<de Vercel>" npm run db:push
```

`npm run prisma:seed` **borra y vuelve a crear** los datos de ejemplo: solo con autorización.

## Rollback

Ve a Vercel, abre **Deployments**, elige el despliegue anterior en `READY` y usa **Instant Rollback**. Esto revierte el código, no la base de datos.
