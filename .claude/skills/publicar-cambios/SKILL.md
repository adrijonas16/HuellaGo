---
name: publicar-cambios
description: Llevar cambios de HuellaGo a producción de forma segura (PR, CI, vista previa, merge a master, despliegue automático en Vercel de web y API, verificación y rollback). Úsala cuando haya que publicar, desplegar o revisar por qué falló un despliegue.
---

# Publicar cambios

Producción = rama `master`. Vercel publica solo:

| Proyecto Vercel | Carpeta | URL |
|-----------------|---------|-----|
| `huellago` | `web/` | https://huellago-sooty.vercel.app |
| `huellago-api` | `backend/` | https://huellago-api.vercel.app/api |

## 1. Antes del merge

- [ ] La CI está en verde en el PR (lint, typecheck, tests y build de backend y web).
- [ ] Probaste la vista previa de Vercel del PR (skill `qa-funcional`).
- [ ] Si cambió `schema.prisma`, el esquema ya se aplicó en producción y era compatible (skill `cambio-base-de-datos`).
- [ ] Si hay variables de entorno nuevas, ya están en Vercel (Production y Preview) y en el `.env.example`.
- [ ] **La persona responsable confirmó** que se puede publicar.

## 2. Merge

Haz merge del PR a `master`, preferiblemente con «Squash and merge» y un título en imperativo. Nunca uses `push --force`.

## 3. Verifica el despliegue

1. En Vercel, los dos proyectos tienen que pasar a `READY`. Si uno queda en `ERROR`, abre los logs del build.
2. Revisa la API: `GET https://huellago-api.vercel.app/api/events?limit=1` responde 200 con datos.
3. Revisa la web: el inicio carga, el directorio muestra negocios reales y el login con la cuenta de ejemplo funciona.
4. Revisa los errores en tiempo de ejecución en Vercel durante los primeros minutos.

## 4. Si algo sale mal

- En Vercel, ve a **Deployments**, elige el anterior en `READY` y usa **Instant Rollback**. Esto devuelve el código, no la base de datos.
- Después abre un PR `fix/…` con la corrección y vuelve a empezar desde el paso 1.

## Errores conocidos del despliegue

- *La API no arranca y aparece «Cannot find module '@common/…'»*: hay un alias de ruta; cámbialo por un import relativo.
- *400 «property X should not exist»*: el cliente envía un campo que no está declarado en el DTO.
- *CORS bloqueado*: el origen tiene que estar en `FRONTEND_URL` del proyecto `huellago-api` o seguir el patrón `huellago*.vercel.app`.
- *Prisma no encuentra el motor*: revisa `binaryTargets` en `schema.prisma` y que el build ejecute `prisma generate`.
