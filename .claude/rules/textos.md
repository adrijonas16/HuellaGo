---
paths:
  - "web/src/**"
  - "mobile/lib/**"
  - "backend/src/**"
  - "backend/prisma/seed.ts"
---

# Textos de la interfaz

Todo lo que lee la persona usuaria —pantallas, botones, toasts, errores de la API, validaciones, correos y datos de ejemplo— sigue estas reglas.

- **Español de Perú, con tildes, ñ y signos de apertura** (¿ ¡). Ejemplos: «contraseña», «dueños», «¿Cómo llegar?».
- **Tutea** y usa la voz activa: «Guarda tus lugares favoritos», no «Los lugares pueden ser guardados».
- **Los botones dicen exactamente lo que hacen**: «Inscribirme», «Publicar reseña», «Guardar mascota». Nada de «Enviar» ni «Aceptar» genéricos.
- **La misma acción se llama igual en todo el flujo**: si el botón dice «Publicar reseña», el aviso dice «Reseña publicada».
- **Los errores dicen qué pasó y cómo seguir**, sin disculparse: «Escribe un email válido, por ejemplo luna@correo.com», o «El evento está lleno. Guárdalo en favoritos por si se libera un cupo».
- **Un estado vacío es una invitación a actuar**: explica qué irá ahí y ofrece el botón para empezar.
- Escribe en mayúscula inicial y sin MAYÚSCULAS sostenidas en etiquetas. Evita los signos de exclamación en exceso y los emojis en los botones.
- Los números y las monedas siguen el formato peruano: `S/ 49`, `2,4 km` y `toLocaleString('es-PE')`.
- Fechas: «sábado, 10:00», «En 3 días», «Mañana». No muestres fechas ISO.
- Llama a las cosas como las entiende la persona usuaria, no como están en el código: «Servicios», no «Businesses»; «Inscribirme», no «Attend».
