---
name: revision-diseno
description: Revisar visualmente una pantalla de HuellaGo como diseñador (capturas en móvil y escritorio, sistema visual, jerarquía, textos, accesibilidad y movimiento) y corregir lo que no cumpla el estándar. Úsala al terminar cualquier cambio visible en la web o al pedir una revisión de diseño.
---

# Revisión de diseño

## 1. Captura

Toma capturas de la pantalla en **390×844** y en **1440×900**. Si la página usa revelado al hacer scroll, recórrela antes de la captura de página completa. Mide además el desbordamiento con `document.documentElement.scrollWidth - innerWidth`, que debe dar 0.

## 2. Lista de revisión

**Sistema visual «Cielo de Arequipa»**
- [ ] Usa solo los tokens de `tailwind.config.ts`: el azul `primary` para la acción, el amarillo `accent` para destacar, el verde `secondary` para lo positivo o las rutas, `rose` para adopción y favoritos, y `dark`, `cream`, `sand` y `bark` para los neutros.
- [ ] Los títulos van en Bricolage (`font-heading`) con un tracking negativo, y el texto en Figtree.
- [ ] Hay una sola acción principal por vista, en azul y con `shadow-button`.
- [ ] El radio sigue la jerarquía: tarjetas con `rounded-card`, botones y chips con `rounded-full`, e inputs con `rounded-2xl`.

**Jerarquía y contenido**
- [ ] Se entiende en 3 segundos para qué es la pantalla.
- [ ] No hay decoración que no informe: ni etiquetas en MAYÚSCULAS sobre cada título, ni números 01/02/03 si el contenido no es una secuencia.
- [ ] Los textos cumplen `.claude/rules/textos.md`: tildes, verbos concretos y errores útiles.
- [ ] Las líneas de texto no pasan de unos 75 caracteres.

**Estados**
- [ ] La pantalla tiene sus estados de carga (skeleton), vacío (con acción) y error.
- [ ] Las imágenes externas usan `SafeImage` y no se ven iconos rotos.

**Accesibilidad**
- [ ] El contraste del texto es de 4.5:1 o más (ojo con el amarillo sobre blanco: úsalo solo de fondo, con texto `dark`).
- [ ] El foco es visible, los botones de icono tienen nombre y las zonas táctiles miden 40 px o más en móvil.

**Movimiento**
- [ ] Hay un solo momento protagonista por página. Las animaciones responden a acciones y se apagan con `prefers-reduced-motion`.

## 3. Corrige y repite

Corrige lo que falle, vuelve a capturar y compara antes y después. Deja las capturas en el PR.
