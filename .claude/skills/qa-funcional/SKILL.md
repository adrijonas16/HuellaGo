---
name: qa-funcional
description: Probar HuellaGo como QA y como usuario real, recorriendo flujos completos con Playwright o a mano (búsqueda, favoritos, login, inscripción a eventos, mascotas, reseñas, comunidad) contra local, una vista previa o producción, y reportar fallos con pasos para reproducirlos. Úsala después de cualquier cambio funcional o antes de publicar.
---

# QA funcional

## Dónde probar

| Entorno | Web | API |
|---------|-----|-----|
| Local | http://localhost:3001 | http://localhost:3000/api |
| Vista previa de un PR | el enlace que deja Vercel en el PR | producción |
| Producción | https://huellago-sooty.vercel.app | https://huellago-api.vercel.app/api |

Cuenta de ejemplo: `maria.garcia@gmail.com` / `HuellaGo2026!` (tiene a Luna y a Michi). Sin API, el login entra en modo demo.

## Flujos que siempre se prueban

1. **Inicio**: carga sin errores de consola; el buscador del hero lleva a `/directory?q=…`.
2. **Directorio**: el filtro por categoría desde la URL, la búsqueda sin tildes, «Abierto 24h», el orden y el estado vacío.
3. **Favoritos**: marcar un favorito muestra un toast, el contador de la navbar sube, aparece en `/favorites` y sigue ahí al recargar.
4. **Login**: la validación en línea, la cuenta de ejemplo, el panel con el nombre real y cerrar sesión.
5. **Evento**: inscribirse eligiendo una mascota, ver que el contador sube +1 (una sola vez), recargar y que siga inscrito, y cancelar.
6. **Mascotas**: agregar una mascota, recargar y que siga, y borrarla. Recargar `/pets?nueva=1` no debe reabrir el formulario.
7. **Reseña**: publicar una reseña con 10 caracteres o más y que siga al recargar.
8. **Móvil (390 px)**: el menú abre y cierra (también con Escape), la búsqueda abre a pantalla completa y no hay scroll horizontal.

## Además, por cada cambio

- El caso feliz, un error (API caída o datos inválidos) y el estado vacío.
- Lo hecho con el teclado: Tab llega a todo, Escape cierra los modales y el foco es visible.
- La consola, sin errores de JS (se ignoran solo los recursos externos bloqueados: mapas e imágenes).

## Con Playwright

Escribe un script `.mjs` fuera del repo con `chromium.launch()`, y registra los errores con `page.on('pageerror')` y `page.on('console')`. Imprime una línea `PASS/FAIL nombre` por comprobación. Para encontrar los elementos, usa roles y textos visibles (`getByRole('button', { name: 'Inscribirme' })`), no clases CSS.

## Reporte

Por cada fallo: **dónde** (URL y viewport), **pasos**, **qué esperabas**, **qué pasó** y una captura. Clasifícalo como bloqueante, importante o menor.

## Limpieza

Si probaste en producción, borra al terminar lo que creaste (reseñas, mascotas, inscripciones), desde la propia interfaz o la API con la cuenta que lo creó.
