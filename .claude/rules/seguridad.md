# Seguridad y datos

- **No subas secretos.** Las variables `.env*` están en `.gitignore`. Las credenciales de producción viven solo en Vercel, en los proyectos `huellago` y `huellago-api`.
- No leas, copies ni muestres el contenido de archivos `.env`, ni pegues cadenas de conexión o tokens en commits, PRs, issues o logs. Si necesitas una variable, documenta su nombre en `.env.example` con un valor de ejemplo.
- La web solo puede exponer `NEXT_PUBLIC_API_URL`. Cualquier otra clave va en el backend.
- La base de datos de producción es compartida: el usuario `huellago_app` solo debe tener permisos sobre el schema `huellago`. No le des permisos sobre `public` ni sobre otros schemas.
- Toda acción sobre un recurso comprueba en el service del backend que pertenece al usuario autenticado. Nunca confíes en un `userId` que llegue en el body o en la URL.
- Los datos de prueba que crees en producción (cuentas, reseñas, mascotas) se borran al terminar.
- Nada de `push --force` a `master`, y no cambies la protección de despliegues de Vercel sin preguntar.
