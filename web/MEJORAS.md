# Mejoras de diseño y funcionalidad (web)

Auditoría hecha como QA, usuario y diseñador sobre las 26 rutas de `web/`, en escritorio (1440 px) y móvil (390 px).

## Bugs encontrados y corregidos

| # | Problema | Solución |
|---|----------|----------|
| 1 | **El build de producción fallaba** (`events/[id]`: parámetros sin tipo) | Tipado corregido; `next build` y `tsc` pasan limpios |
| 2 | La navbar mostraba siempre a "Maria Garcia" logueada y no había botón para ingresar | Navbar según la sesión: botón *Ingresar* o avatar con menú y *Cerrar sesión* real |
| 3 | Login y registro fallaban siempre si el backend no estaba encendido | Modo demo: si la API no responde, se crea una sesión local (persistida) y se avisa |
| 4 | La sesión se perdía al recargar | Sesión persistida con `zustand/persist` |
| 5 | ~60 botones sin acción (favoritos, inscribirse, unirse, llamar, WhatsApp, cómo llegar, reseñas, publicar, donar, compartir, etc.) | Todos conectados: estado persistido, enlaces `tel:` / `wa.me` / Google Maps, Web Share API con copia de respaldo |
| 6 | El directorio ignoraba `?category=` y `?petType=` (los enlaces del inicio no filtraban) | El directorio lee la URL, tiene buscador sin tildes, filtro 24 h, orden y estado vacío |
| 7 | Enlaces rotos: `/settings` (404) y `?category=SHELTER` | Redirigidos a páginas existentes |
| 8 | Todos los eventos estaban en julio de 2026 (ya pasados) y decían "Próximo" | Fechas relativas a hoy y etiqueta real: "En 12 días", "Mañana", "Finalizado" |
| 9 | Las secciones con `ScrollReveal` quedaban invisibles sin JS y el retraso se aplicaba dos veces | Contenido visible por defecto; la animación solo se activa con JS y respeta `prefers-reduced-motion` |
| 10 | Imágenes externas rotas (iconos rotos y texto alternativo desbordado) | Componente `SafeImage` con carga suave y respaldo ilustrado |
| 11 | Búsqueda (Ctrl+K), menú móvil y overlays quedaban atrapados dentro de la navbar (el `backdrop-filter` crea un contenedor para elementos `fixed`) | El desenfoque pasa a una capa de fondo y el menú móvil usa un portal |
| 12 | Desbordamiento horizontal en móvil (`/business/register` y la cuadrícula de categorías) | Progreso compacto en móvil y columnas con `minmax(0,1fr)` |
| 13 | `<button>` dentro de `<Link>` (HTML inválido) en Planes y Rutas | Reemplazados por enlaces con estilo de botón |
| 14 | Clases de Tailwind dinámicas (`text-${color}`) que no se generaban | Clases explícitas |
| 15 | Banner de la app a los 2 s y toast de evento a los 5 s en cada carga | Banner tras hacer scroll y oculto 7 días al cerrarlo; toast una vez por sesión y nunca en móvil ni en pantallas de acceso |
| 16 | Para quitar una foto en móvil hacía falta *hover* | Botón visible en pantallas táctiles |
| 17 | Textos sin tildes ni ñ ("contrasena", "duenos", "Peru"…) | Corregidos en toda la interfaz |

## Sistema visual nuevo: "Cielo de Arequipa"

- **Paleta**: azul cielo `#3352F5` (acción), amarillo pelota `#FFC531` (destacados), verde parque `#0F8A5F` (rutas y confirmaciones), coral `#F0506E` (adopción y favoritos), tinta basalto `#191C33` sobre fondo sillar `#F5F6F1`. Reemplaza la combinación crema + terracota + serif, que se veía genérica.
- **Tipografía**: Bricolage Grotesque (titulares) + Figtree (texto), alojadas en el propio proyecto con `@fontsource` (sin depender de Google Fonts).
- **Logo**: huella propia en SVG (antes era un emoji) y favicon.
- **Momento firma**: el hero muestra un mini mapa de Arequipa donde la ruta se dibuja y las huellas aparecen pisada a pisada, de la Plaza de Armas a Selva Alegre; después caen los pines. Es solo CSS y SVG, sin librerías.
- **Microinteracciones**: el corazón de favoritos hace "pop" y suelta partículas, avisos (toasts) con resorte, hojas modales que suben desde abajo en móvil, botones con sombra que se hunde al pulsarlos y menú móvil a pantalla completa con entrada escalonada.
- **Accesibilidad**: enlace "Saltar al contenido", foco visible en todo el sitio, `aria-pressed` y `aria-expanded`, etiquetas en los botones de icono, `prefers-reduced-motion` y contraste revisado (los colores de energía "Moderado" y "Enérgico" no llegaban al mínimo).

## Funciones nuevas

- `src/lib/store.ts`: favoritos, inscripciones a eventos, comunidades, mascotas nuevas y avisos, persistidos en `localStorage`.
- Inscripción a eventos eligiendo la mascota, con el contador de cupos actualizado.
- Reseñas con estrellas, publicaciones con foto, comentarios y "huellas" en la comunidad.
- Agregar mascota (`/pets?nueva=1`), editar perfil, cambiar contraseña y eliminar cuenta con confirmación.
- Login y registro rediseñados: validación en línea, mostrar u ocultar contraseña, medidor de seguridad y registro en 2 pasos.

## Cómo verificar

```bash
cd web
npm install
npm run build && npm start   # http://localhost:3001
```

Se probaron 21 flujos de punta a punta con Playwright, todos aprobados: búsqueda, filtros, favoritos con recarga, inscripción, login demo, agregar mascota, publicar, unirse, reseña, cerrar sesión, menú móvil y ausencia de errores de JS.

## Despliegue

| Pieza | Dónde | URL |
|-------|-------|-----|
| Web (Next.js, carpeta `web/`) | Vercel, proyecto `huellago` | https://huellago-sooty.vercel.app |
| API (NestJS, carpeta `backend/`) | Vercel, proyecto `huellago-api` | https://huellago-api.vercel.app/api |
| Base de datos (PostgreSQL) | Supabase, proyecto "adrijonas16's Project", esquema aislado `huellago` con usuario propio `huellago_app` | — |

- Cuenta de ejemplo: `maria.garcia@gmail.com` / `HuellaGo2026!` (en la pantalla de ingreso hay un botón que la rellena).
- Variables de la API en Vercel: `DATABASE_URL` (pooler 6543 con `pgbouncer=true`), `DIRECT_URL` (pooler 5432), `JWT_SECRET`, `JWT_REFRESH_SECRET`, `JWT_EXPIRATION`, `JWT_REFRESH_EXPIRATION`, `FRONTEND_URL`.
- Variable de la web en Vercel: `NEXT_PUBLIC_API_URL=https://huellago-api.vercel.app/api`.
- Cambios de esquema: `cd backend && DATABASE_URL=... DIRECT_URL=... npm run db:push`; datos de ejemplo: `npm run prisma:seed` (borra y vuelve a crear los datos del esquema `huellago`).
- Las fechas del seed son relativas al día en que se ejecuta, así que los eventos siempre son futuros.

### Correcciones del backend para que funcione en producción

- Los alias `@common/...` no se resolvían al ejecutar `dist/` (el servidor no arrancaba con `npm run start:prod`): ahora son rutas relativas.
- El build incluía `prisma/seed.ts` y dejaba la salida en `dist/src/`: se agregó `tsconfig.build.json`.
- Se quitó la extensión PostGIS (no se usaba y bloqueaba la creación del esquema).
- `bcrypt` (nativo) → `bcryptjs`, compatible con funciones serverless.
- `CreatePetDto` no aceptaba `petType`: crear un gato o conejo devolvía error 400.
- CORS acepta varios orígenes y los despliegues de Vercel del front; filtro global de errores activado.
