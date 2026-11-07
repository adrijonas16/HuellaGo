# Contrato de la API

Base: `https://huellago-api.vercel.app/api` (local: `http://localhost:3000/api`). La documentación interactiva está en `/api/docs` (Swagger).

🔒 = requiere `Authorization: Bearer <accessToken>`.

## Formas de respuesta

| Caso | Forma |
|------|-------|
| Lista paginada (`/businesses`, `/events`, `/routes`…) | `{ data: T[], meta: { total, page, limit, totalPages } }` |
| Lista del usuario (`/pets`, `/favorites`) | `T[]` |
| Un recurso | `T` (objeto plano) |
| Login y registro | `{ accessToken, refreshToken, user }` |
| Error | `{ success: false, statusCode, message, timestamp }`. Si es de validación, `message` puede ser un array de textos |

Los parámetros de paginación son `?page=1&limit=20&search=texto`. Los mensajes de error vienen en español y se pueden mostrar tal cual.

## Rutas

| | Método | Ruta | Qué hace |
|-|--------|------|----------|
| | POST | `/auth/register` | Crear cuenta |
| | POST | `/auth/login` | Iniciar sesión |
| 🔒 | POST | `/auth/refresh` | Renovar token |
| 🔒 | GET · PATCH | `/users/me` | Ver y editar mi perfil |
| | GET | `/businesses` | Listar negocios (`category`, `city`, `district`, `search`) |
| | GET | `/businesses/:id` | Detalle con servicios, horarios y reseñas |
| 🔒 | GET | `/businesses/mine` | Mis negocios |
| 🔒 | POST · PATCH · DELETE | `/businesses[/:id]` | Crear, editar o eliminar un negocio propio |
| | GET | `/events` | Listar eventos |
| | GET | `/events/:id` | Detalle con asistentes |
| 🔒 | POST · PATCH · DELETE | `/events[/:id]` | Crear, editar o eliminar un evento propio |
| 🔒 | POST | `/events/:id/attend` | Inscribir una mascota propia (`{ petId }`) |
| 🔒 | DELETE | `/events/:id/attend` | Cancelar la inscripción (`{ petId }`) |
| | GET | `/routes` | Listar rutas (`city`, `difficulty`) |
| | GET | `/routes/:id` | Detalle de una ruta |
| 🔒 | POST | `/routes` | Crear una ruta (solo desde la app: header `X-Client-Platform: mobile`) |
| 🔒 | PATCH · DELETE | `/routes/:id` | Editar o eliminar una ruta propia |
| 🔒 | GET · POST | `/pets` | Mis mascotas y crear una (`name`, `petType`, `breed`…) |
| 🔒 | GET · PATCH · DELETE | `/pets/:id` | Ver, editar o eliminar una mascota propia |
| 🔒 | GET | `/favorites` | Mis favoritos |
| 🔒 | POST | `/favorites/{business\|event\|route}/:id` | Guardar en favoritos |
| 🔒 | DELETE | `/favorites/:id` | Quitar de favoritos (id del favorito) |
| 🔒 | POST | `/reviews` | Crear una reseña (`businessId` o `routeId`, `rating` 1–5, `comment`) |
| | GET | `/reviews/business/:id` · `/reviews/route/:id` | Reseñas |
| 🔒 | DELETE | `/reviews/:id` | Eliminar una reseña propia |
| 🔒 | POST | `/walks/start` · PATCH `/walks/:id/finish` | Registrar un paseo |
| 🔒 | GET | `/walks/history` · `/walks/stats` | Historial y estadísticas |
| 🔒 | POST · GET · DELETE | `/photos/...` | Fotos de paseos, eventos y mascotas |
| 🔒 | GET · PATCH | `/notifications...` | Notificaciones |
| | POST | `/contact` | Mensaje del formulario de contacto (`name`, `email`, `subject`, `message`, y `website` + `elapsedMs` para el filtro anti-spam). Responde `{ ok: true }` |

**Límites de uso:** 120 peticiones por minuto por IP en general; 10 por minuto en `/auth/login` y `/auth/register`; 5 por minuto y 5 por hora en `/contact`. Al superarlos, la API responde `429` con un mensaje en español.

## Quién consume qué

- **Web:** las lecturas públicas van por `web/src/lib/api.ts` (`fetchApi`), y la sesión y las acciones por `web/src/services/` y `web/src/lib/backend.ts`.
- **Mobile:** `mobile/lib/data/repositories/` con las rutas de `core/constants/api_constants.dart`.

Si cambias una forma o una ruta, actualiza esta página y los dos consumidores en el mismo PR.
