---
paths:
  - "web/**"
---

# Reglas de la web (Next.js)

## Estructura

```
web/src/
├── app/                 # rutas (App Router). Una carpeta por pantalla.
├── components/
│   ├── ui/              # piezas base: button, input, sheet, toaster, favorite-button, safe-image…
│   ├── layout/          # navbar, footer, logo, auth-shell
│   └── <dominio>/       # events/, home/, map/, cards/… solo para ese dominio
├── lib/
│   ├── store.ts         # estado local persistido (favoritos, inscripciones, avisos)
│   ├── backend.ts       # puente con la API para acciones con sesión real
│   ├── api.ts           # fetchApi: lecturas públicas que devuelven null si fallan
│   └── mock-data.ts     # datos de respaldo cuando la API no responde
├── services/            # cliente HTTP con token (api.ts) y servicios por recurso
├── hooks/               # use-auth (sesión persistida con modo demo)
└── interfaces/          # tipos compartidos
```

## Datos y API

- **Lecturas públicas:** usa `fetchApi()` y, si devuelve `null`, cae a `mock-data`. La pantalla tiene que verse completa en los dos casos.
- **Acciones con sesión** (inscribir, reseñar, crear, borrar): `lib/backend.ts` decide con `hasRealSession()` e `isApiId()` si van al servidor o se quedan en `useAppStore`. Agrega ahí las funciones nuevas, no `fetch` sueltos en los componentes.
- Los errores de la API se muestran con `notify(errorMessage(err), { tone: 'error' })`.
- Las páginas de detalle que cargan por ID muestran un skeleton mientras llegan los datos y «no encontrado» solo cuando la respuesta ya llegó vacía.
- `NEXT_PUBLIC_API_URL` es la única variable pública. Nunca expongas secretos con el prefijo `NEXT_PUBLIC_`.

## Sistema visual

- Tokens en `tailwind.config.ts`: `primary` (cielo), `accent` (pelota), `secondary` (parque), `rose`, `dark`, `cream`, `sand` y `bark`. **No escribas hex** en los componentes. Si falta un color, agrégalo al config con su nombre y su propósito.
- Tipografías: `font-heading` (Bricolage Grotesque) para títulos y `font-body` (Figtree) para el texto. Para el título de cada sección, usa la clase `.section-title`.
- Los botones principales son `rounded-full` con `shadow-button` y `boop-btn`; las tarjetas usan `rounded-card` y `card-hover` solo si son clicables.
- Iconos de `lucide-react`. Los emoji se permiten solo para tipos de mascota.
- Antes de crear un componente nuevo, revisa `components/ui/` (Sheet, Toaster, FavoriteButton, ShareButton, SafeImage, PasswordInput, CategoryIcon, RouteSketch).

## Animación

- Hay un solo momento protagonista por página (el hero ya tiene el suyo). No agregues fade-up a cada sección.
- Anima lo que responde a una acción: abrir, confirmar, marcar favorito.
- Usa las clases de `styles/globals.css` (`animate-slide-up`, `animate-bounce-in`, `animate-heart-pop`…). Todas respetan `prefers-reduced-motion`.

## Accesibilidad y UX

- Cada botón de icono lleva `aria-label`; los toggles, `aria-pressed`; y lo que abre o cierra algo, `aria-expanded`.
- Los formularios tienen `<label>` asociado, validación en línea y un mensaje que dice cómo corregir.
- Toda lista tiene un estado vacío con una acción («Explorar servicios»). Toda acción confirma con un toast.
- Tiene que verse bien a 390 px de ancho, sin scroll horizontal. Ojo con `backdrop-filter` en contenedores de elementos `fixed`: crea un nuevo bloque contenedor.
- No anides `<button>` dentro de `<Link>`; usa `Link` con estilo de botón.

## Estado e hidratación

- Lo que dependa de `localStorage` (store, auth) se lee después de `useHydrated()`, para evitar diferencias entre el servidor y el cliente.
- Si una página usa `useSearchParams`, envuélvela en `<Suspense>`.

## Antes de terminar

`npm run lint && npm run typecheck && npm run build`, y una revisión visual en 390 px y 1440 px (skill `revision-diseno`).
