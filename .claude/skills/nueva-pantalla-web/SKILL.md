---
name: nueva-pantalla-web
description: Crear o rediseñar una página o componente de la web de HuellaGo (Next.js) con el sistema visual "Cielo de Arequipa", datos de la API con respaldo, estados de carga, vacío y error, accesibilidad y animaciones medidas. Úsala para cualquier pantalla o componente nuevo en web/.
---

# Nueva pantalla en la web

Lee antes `.claude/rules/web.md` y `.claude/rules/textos.md`. Las pantallas de referencia son `app/directory/page.tsx` (una lista con filtros por URL) y `app/events/[id]/page.tsx` (un detalle con una acción).

## 1. Define el trabajo de la pantalla

En una frase: qué viene a hacer la persona y cuál es la acción principal. Revisa si `docs/02-diseno/03-pantallas-web.md` ya la describe.

## 2. Estructura del archivo

```tsx
// web/src/app/<ruta>/page.tsx
'use client'; // solo si usa estado, efectos o el store
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function XPage() {
  return (
    <>
      <Navbar />
      <main id="contenido" className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">…</div>
      </main>
      <Footer />
    </>
  );
}
```

- `id="contenido"` en `<main>`, porque el enlace «Saltar al contenido» apunta ahí.
- Título: `font-heading font-extrabold` con `clamp()`, como en las otras páginas, o `.section-title` en las secciones.
- Si usa `useSearchParams`, envuelve el contenido en `<Suspense>`.

## 3. Datos

- Las lecturas públicas van con `fetchApi(...)`, empezando con los datos de `mock-data` y reemplazándolos cuando llega la respuesta.
- Las acciones con sesión van por funciones de `lib/backend.ts`, con un respaldo local en `useAppStore`.
- Un detalle por ID muestra un skeleton mientras `!loaded`, y «no encontrado» solo cuando la carga ya terminó.

## 4. Los cuatro estados obligatorios

| Estado | Qué mostrar |
|--------|-------------|
| Cargando | `.skeleton` con la forma del contenido |
| Vacío | Qué irá aquí y un botón para empezar |
| Error | Un toast `tone: 'error'` con el mensaje de la API; la pantalla se sigue usando |
| Éxito | Un toast que confirma con el mismo verbo del botón |

## 5. Componentes y estilo

- Reutiliza `components/ui`: `Sheet` (modales), `FavoriteButton`, `ShareButton`, `SafeImage` (imágenes externas), `PasswordInput`, `CategoryIcon` y `RouteSketch`.
- Usa solo los colores del config: `bg-primary`, `text-bark`, `border-sand`… Sin hex.
- Movimiento: la entrada de listas puede usar `animate-slide-up` con un retraso escalonado de 8 elementos como máximo. Nada de animaciones en bucle salvo en el hero.

## 6. Accesibilidad

`aria-label` en los botones de icono, `aria-pressed` en los toggles, `<label>` en cada input, el foco visible (ya es global) y el orden lógico al tabular.

## 7. Verifica

```bash
cd web && npm run lint && npm run typecheck && npm run build
```

Después usa la skill `revision-diseno` (capturas a 390 y 1440 px, sin desbordamiento horizontal) y `qa-funcional` para el flujo.
