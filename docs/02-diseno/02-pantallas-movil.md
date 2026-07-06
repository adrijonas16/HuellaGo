# HuellaGo - Pantallas Moviles

## 8. Pantallas Moviles (25 pantallas)

---

### 1. Splash Screen

**Objetivo:** Primera impresion de marca al abrir la app.

**Componentes:**
- Fondo: degradado sutil de verde menta (#2EC4B6) a verde oscuro (#1A9E93)
- Logo de HuellaGo centrado (huella estilizada + texto)
- Animacion: la huella se forma paso a paso, como si un perro caminara
- Barra de carga sutil en la parte inferior

**Acciones:** Ninguna (auto-avanza en 2s).
**Navega a:** Onboarding (primer uso) o Home (usuario logueado).

---

### 2. Onboarding (3 slides)

**Objetivo:** Presentar la propuesta de valor de HuellaGo al nuevo usuario.

**Componentes:**
- Slide 1: Ilustracion de perro con mapa
  - Titulo: "Todo para tu perro en un solo lugar"
  - Subtitulo: "Veterinarias, paseadores, tiendas y mas, cerca de ti"
- Slide 2: Ilustracion de perros caminando en grupo
  - Titulo: "Descubre rutas y eventos"
  - Subtitulo: "Paseos grupales, mascotatones y aventuras pet friendly"
- Slide 3: Ilustracion de huella con fotos
  - Titulo: "Cada paseo deja huella"
  - Subtitulo: "Guarda rutas, sube fotos y crea recuerdos con tu perro"
- Indicador de pagina (3 dots)
- Boton "Siguiente" (slides 1-2)
- Boton "Empezar" (slide 3)
- Link "Saltar" (esquina superior derecha)

**Acciones:** Deslizar slides, saltar, empezar.
**Navega a:** Registro / Login.

---

### 3. Registro / Login

**Objetivo:** Autenticar al usuario.

**Componentes:**
- Logo HuellaGo pequeno (superior)
- Titulo: "Bienvenido a HuellaGo"
- Subtitulo: "Ingresa para descubrir el mundo pet de tu ciudad"
- Boton "Continuar con Google" (icono + texto)
- Boton "Continuar con Apple" (icono + texto)
- Boton "Continuar con Facebook" (icono + texto)
- Separador "o"
- Campo Email
- Campo Contrasena
- Boton "Iniciar sesion"
- Link "Crear cuenta"
- Link "Olvide mi contrasena"
- Texto legal: "Al continuar, aceptas los Terminos y la Politica de Privacidad"

**Acciones:** Login social, login email, crear cuenta, recuperar contrasena.
**Navega a:** Crear Perfil (nuevo) o Home (existente).

---

### 4. Crear Perfil del Perro

**Objetivo:** Registrar la primera mascota para personalizar la experiencia.

**Componentes:**
- Titulo: "Registra a tu perro"
- Subtitulo: "Asi podremos recomendarte lo mejor para el"
- Foto: circulo grande con icono de camara para subir foto
- Campo "Nombre de tu perro"
- Selector "Raza" (con buscador integrado, incluye "Mestizo")
- Selector "Fecha de nacimiento" (date picker)
- Selector "Tamano" (chips: Mini, Pequeno, Mediano, Grande, Gigante)
- Selector "Nivel de energia" (chips con iconos: Tranquilo, Moderado, Energico)
- Boton "Registrar perro"
- Link "Agregar despues"

**Acciones:** Subir foto, llenar datos, registrar.
**Navega a:** Home (con recomendaciones personalizadas).
**Elementos visuales:** Ilustracion de fondo suave de huellas. Chips con colores distintos por nivel de energia.

---

### 5. Home

**Objetivo:** Pantalla principal con acceso rapido a todo.

**Componentes:**
- Header:
  - Saludo: "Hola, [Nombre]" (Inter Bold 22px)
  - Subtitulo: "Que haremos hoy con [NombrePerro]?"
  - Avatar del usuario (esquina derecha)
  - Icono de notificaciones (con badge si hay nuevas)
- Barra de busqueda:
  - "Busca veterinarias, eventos, rutas..." (placeholder)
  - Icono de busqueda
  - Icono de filtro
- Seccion "Cerca de ti" (scroll horizontal):
  - Cards pequenas de negocios cercanos (foto, nombre, categoria, distancia, calificacion)
  - Boton "Ver mapa"
- Seccion "Eventos proximos" (scroll horizontal):
  - Cards de eventos (imagen, titulo, fecha, ubicacion, badge de estado)
  - Boton "Ver todos"
- Seccion "Rutas populares" (scroll horizontal):
  - Cards de rutas (mini mapa, nombre, distancia, dificultad)
  - Boton "Ver todas"
- Seccion "Comunidad" (vertical):
  - 2-3 publicaciones recientes del feed
  - Boton "Ver mas"
- Bottom Navigation: Inicio (activo), Mapa, Eventos, Rutas, Perfil
- FAB (boton flotante): icono "+" naranja

**Acciones:** Buscar, ver mapa, ver eventos, ver rutas, ver comunidad, crear (FAB).
**Navega a:** Mapa, Eventos, Rutas, Comunidad, Detalle de negocio/evento/ruta, Notificaciones, Perfil.

---

### 6. Mapa Interactivo

**Objetivo:** Explorar servicios y puntos de interes cercanos en un mapa.

**Componentes:**
- Mapa en pantalla completa (Google Maps personalizado)
- Barra de busqueda superior (transparente sobre el mapa)
  - "Buscar en esta zona..."
  - Icono de filtros
- Chips de filtro rapido (scroll horizontal debajo de la barra):
  - "Veterinarias", "24h", "Paseadores", "Hoteles", "Tiendas", "Grooming", "Pet Friendly", "Eventos", "Rutas"
- Marcadores personalizados por categoria (iconos con colores)
- Boton "Mi ubicacion" (esquina inferior derecha)
- Al tocar un marcador: Bottom Sheet con preview
  - Foto, nombre, calificacion, distancia, estado (abierto/cerrado)
  - Boton "Ver detalle"
  - Boton "Como llegar"
- Bottom Navigation

**Acciones:** Buscar, filtrar, mover mapa, tocar marcador, ver detalle, navegar.
**Navega a:** Detalle de servicio, Filtros avanzados (modal).

---

### 7. Detalle de Veterinaria / Servicio

**Objetivo:** Ver informacion completa de un negocio.

**Componentes:**
- Galeria de fotos (carousel, 3+ fotos)
- Boton "Atras" (flecha sobre la galeria)
- Boton "Guardar" (corazon sobre la galeria)
- Boton "Compartir" (sobre la galeria)
- Nombre del negocio (Nunito Bold 24px)
- Categoria (chip con color)
- Calificacion (estrellas + numero de resenas)
- Estado: "Abierto ahora" (badge verde) o "Cerrado" (badge rojo)
- Horario de hoy
- Direccion + distancia
- Seccion "Servicios" (lista con iconos y precios)
- Seccion "Fotos" (grid de fotos)
- Seccion "Resenas" (lista de resenas con avatar, nombre, fecha, calificacion, texto)
- Boton "Escribir resena"
- Barra inferior fija:
  - Boton "Llamar" (icono telefono)
  - Boton "WhatsApp" (icono WhatsApp)
  - Boton "Como llegar" (icono mapa)
  - Boton "Reservar" (primario, verde menta)

**Acciones:** Ver fotos, leer resenas, llamar, escribir por WhatsApp, navegar, reservar, guardar, compartir.
**Navega a:** Mapa (como llegar), Escribir resena, Galeria completa.

---

### 8. Lista de Eventos

**Objetivo:** Explorar eventos pet friendly disponibles.

**Componentes:**
- Header: "Eventos" (Nunito Bold 28px)
- Tabs: "Proximos", "Hoy", "Esta semana", "Todos"
- Filtros (chips scroll horizontal):
  - Ciudad/distrito, Tipo de evento, Gratis, Tamano de perro, Nivel de energia
- Lista de Cards de Eventos (scroll vertical):
  - Cada card: imagen, titulo, fecha/hora, ubicacion, badge de estado, asistentes (avatares), nivel de energia
- Estado vacio: "No hay eventos cerca. Se el primero en crear uno."
- Bottom Navigation

**Acciones:** Filtrar, buscar, tocar evento.
**Navega a:** Detalle de evento, Crear evento (via FAB).

---

### 9. Detalle de Evento

**Objetivo:** Ver toda la informacion de un evento y decidir si inscribirse.

**Componentes:**
- Galeria de fotos del evento (carousel)
- Badge de estado (esquina: Proximo/Activo/Finalizado)
- Titulo del evento (Nunito Bold 24px)
- Organizador (avatar + nombre, verificado)
- Fecha y hora (con icono calendario)
- Punto de encuentro (con icono pin + direccion)
- Mapa pequeno mostrando punto de encuentro + ruta (si aplica)
- Boton "Ver ruta completa" (si tiene ruta)
- Seccion "Descripcion"
- Seccion "Requisitos" (lista con checks)
- Seccion "Recomendaciones" (lista con iconos)
- Seccion "Detalles":
  - Precio: "Gratis" o "S/ XX.XX"
  - Cupos: "15 de 30 disponibles"
  - Nivel de energia: badge (Bajo/Medio/Alto)
  - Tamano de perro: badge (Pequeno/Mediano/Grande/Todos)
- Seccion "Asistentes" (avatares + nombre + foto de perro, scroll horizontal)
- Seccion "Perritos que asistiran" (fotos de perros en circulo, nombres)
- Barra inferior fija:
  - Precio o "Gratis"
  - Boton "Inscribirme" (verde menta, grande)

**Acciones:** Ver fotos, ver ruta, inscribirse, compartir, ver asistentes.
**Navega a:** Inscripcion (modal), Ruta completa, Perfil de asistente.

---

### 10. Inscripcion a Evento

**Objetivo:** Confirmar inscripcion al evento.

**Componentes (Modal/Bottom Sheet):**
- Titulo: "Confirma tu inscripcion"
- Resumen del evento (nombre, fecha, hora)
- Seccion "Que perro llevas?"
  - Cards de perros del usuario (seleccionables)
  - Cada card: foto, nombre, raza
  - Checkbox para seleccionar
- Nota: "Asegurate de cumplir los requisitos del evento"
- Checkbox: "Acepto las condiciones del organizador"
- Boton "Confirmar inscripcion"
- Boton "Cancelar"

**Acciones:** Seleccionar perro(s), confirmar, cancelar.
**Navega a:** Confirmacion de exito, Detalle del evento.

---

### 11. Crear Evento

**Objetivo:** Publicar un nuevo evento.

**Componentes:**
- Header: "Crear evento"
- Subir fotos (carousel editable, min 1)
- Campo "Nombre del evento"
- Campo "Descripcion"
- Selector de fecha y hora
- Campo "Punto de encuentro" (abre selector en mapa)
- Toggle "Tiene ruta?"
  - Si: boton "Trazar ruta en mapa"
- Campo "Requisitos" (chips agregables)
- Selector "Nivel de energia" (chips)
- Selector "Tamano de perro" (chips)
- Campo "Cupos maximos" (numerico)
- Selector "Precio" (Gratis / Con costo > campo monto)
- Toggle "Evento publico" / "Evento privado"
- Boton "Vista previa"
- Boton "Publicar evento"

**Acciones:** Llenar formulario, trazar ruta, publicar.
**Navega a:** Preview, Mapa para trazar ruta, Lista de eventos.

---

### 12. Lista de Rutas

**Objetivo:** Explorar rutas de paseo disponibles.

**Componentes:**
- Header: "Rutas" (Nunito Bold 28px)
- Tabs: "Populares", "Cercanas", "Mis rutas", "Guardadas"
- Filtros (chips):
  - Dificultad, Distancia, Con sombra, Segura, Con agua
- Lista de Cards de Rutas:
  - Mini mapa con polyline
  - Nombre de la ruta
  - Distancia + tiempo estimado
  - Badge dificultad
  - Calificacion (estrellas)
  - Badges: sombra, segura, agua
  - Numero de veces realizada
- Estado vacio: "Aun no hay rutas aqui. Crea la primera."
- Bottom Navigation
- FAB "+"

**Acciones:** Filtrar, buscar, tocar ruta, crear ruta.
**Navega a:** Detalle de ruta, Crear ruta.

---

### 13. Detalle de Ruta

**Objetivo:** Ver informacion de una ruta y decidir si hacerla.

**Componentes:**
- Mapa grande con la ruta trazada (polyline verde menta)
  - Marcador de salida (verde)
  - Marcador de llegada (rojo)
  - Marcadores de descanso, sombra, agua (iconos pequenos)
- Nombre de la ruta (Nunito Bold 22px)
- Creador de la ruta (avatar + nombre)
- Stats en fila: Distancia | Tiempo | Dificultad
- Calificacion promedio (estrellas + numero)
- Seccion "Sobre esta ruta" (descripcion)
- Seccion "Caracteristicas" (badges visuales):
  - Seguridad, Sombra, Limpieza, Trafico, Agua, Descanso
- Galeria de fotos del recorrido
- Seccion "Comentarios de usuarios"
- Barra inferior fija:
  - Boton "Hacer esta ruta" (verde menta, grande)
  - Boton "Crear evento con esta ruta" (secundario)

**Acciones:** Ver mapa, leer comentarios, iniciar paseo, crear evento.
**Navega a:** Iniciar paseo, Crear evento (precargado), Comentarios.

---

### 14. Iniciar Paseo

**Objetivo:** Pantalla de confirmacion antes de empezar el tracking.

**Componentes:**
- Mapa con la ruta de referencia (si es recreacion) o vacio (nueva)
- Info de la ruta (si aplica): nombre, distancia, tiempo estimado
- Selector de perro: "Con quien paseas hoy?"
  - Cards de perros con checkbox
- Checklist rapido:
  - "Llevas bolsas?" (check)
  - "Llevas agua?" (check)
  - "Correa puesta?" (check)
- Boton grande: "Iniciar paseo" (verde menta, iconos de huella animada)
- Boton: "Cancelar"

**Acciones:** Seleccionar perro, confirmar checklist, iniciar.
**Navega a:** Paseo en progreso.

---

### 15. Paseo en Progreso

**Objetivo:** Tracking en tiempo real del paseo.

**Componentes:**
- Mapa en pantalla completa
  - Linea del recorrido actual (verde menta, animada)
  - Ruta de referencia (si aplica, linea gris punteada)
  - Posicion actual (punto azul pulsante)
- Panel inferior (mini, expandible):
  - Tiempo transcurrido (cronometro)
  - Distancia recorrida
  - Velocidad promedio
- Boton "Tomar foto" (icono camara, esquina)
- Boton "Pausar" (icono pausa, esquina)
- Al pausar: botones "Reanudar" y "Finalizar"
- Nombre del perro y foto pequena (esquina superior)

**Acciones:** Continuar caminando, tomar foto, pausar, reanudar, finalizar.
**Navega a:** Finalizar paseo, Camara.

---

### 16. Finalizar Paseo

**Objetivo:** Confirmar que el paseo termino.

**Componentes (Modal):**
- Titulo: "Finalizar paseo?"
- Mini resumen: distancia, tiempo, fecha
- Mini mapa con el recorrido
- Boton "Finalizar y guardar"
- Boton "Seguir paseando"

**Acciones:** Finalizar, continuar.
**Navega a:** Subir fotos del paseo.

---

### 17. Subir Fotos del Paseo

**Objetivo:** Agregar fotos y feedback post-paseo.

**Componentes:**
- Titulo: "Como estuvo el paseo?"
- Grid para subir fotos (tomar nueva o seleccionar de galeria, max 10)
- Calificar la ruta (estrellas, 1-5)
- Calificaciones rapidas (sliders o selectors):
  - Seguridad: Baja / Media / Alta
  - Limpieza: Sucia / Regular / Limpia
  - Sombra: Sin sombra / Algo / Mucha sombra
  - Trafico: Bajo / Medio / Alto
  - Otros perros: Si / No
  - Agua disponible: Si / No
- Campo "Comentario" (textarea)
- Boton "Publicar y ver Huella"
- Link "Saltar" (guardar sin fotos)

**Acciones:** Subir fotos, calificar, comentar, publicar.
**Navega a:** Resumen "Huella del paseo".

---

### 18. Resumen "Huella del Paseo"

**Objetivo:** Mostrar el resumen visual del paseo completado.

**Componentes:**
- Card especial (fondo degradado suave verde menta > crema):
  - Icono de huella grande (estilizado)
  - Titulo: "Tu Huella del Paseo"
  - Fecha y hora
  - Mapa con la ruta recorrida (estilizado, mini)
  - Stats en fila: Distancia | Tiempo | Calificacion
  - Foto del perro (circulo) + nombre
  - Galeria de fotos del paseo (carousel)
  - Badge de logros (si aplica): "Primera ruta!", "5 km!", "10 paseos!"
- Boton "Compartir" (genera imagen para redes)
- Boton "Volver a hacer esta ruta"
- Boton "Crear evento con esta ruta"
- Boton "Ir al inicio"

**Acciones:** Compartir, recrear ruta, crear evento, volver al home.
**Navega a:** Home, Detalle de ruta, Crear evento.
**Elementos visuales:** Animacion de confetti suave al mostrar. La huella se "dibuja" con la forma de la ruta.

---

### 19. Perfil del Perro

**Objetivo:** Ver y editar la informacion de una mascota.

**Componentes:**
- Foto grande del perro (hero image, 40% pantalla)
- Boton editar (icono lapiz, esquina)
- Nombre (Nunito Bold 28px)
- Raza + edad (subtitulo)
- Stats en fila: Peso | Tamano | Energia
- Tabs: "Info", "Paseos", "Eventos", "Amigos", "Fotos"
  - Tab Info: vacunas, alergias, veterinario frecuente
  - Tab Paseos: historial de paseos con mini mapas
  - Tab Eventos: eventos asistidos
  - Tab Amigos: perros conocidos (avatares circulares)
  - Tab Fotos: galeria de todas las fotos
- Boton "Agregar otro perro" (al final)

**Acciones:** Ver info, editar, navegar tabs, ver historial.
**Navega a:** Editar mascota, Detalle de paseo, Detalle de evento, Perfil de amigo perruno.

---

### 20. Perfil del Usuario

**Objetivo:** Ver y gestionar la cuenta del usuario.

**Componentes:**
- Foto de perfil (circulo grande)
- Nombre del usuario
- Ciudad / distrito
- Stats: Paseos realizados | Eventos asistidos | Rutas creadas
- Seccion "Mis perros" (scroll horizontal de cards de perros)
- Seccion "Actividad reciente" (timeline)
- Boton "Editar perfil"
- Boton "Configuracion" (icono engranaje)
- Bottom Navigation

**Acciones:** Ver stats, ver perros, editar perfil, ir a configuracion.
**Navega a:** Perfil del perro, Editar perfil, Configuracion.

---

### 21. Favoritos

**Objetivo:** Ver todos los elementos guardados.

**Componentes:**
- Header: "Favoritos"
- Tabs: "Lugares", "Rutas", "Eventos"
- Lista de cards guardadas segun tab activa
- Estado vacio por tab: "Aun no guardaste [elementos]. Explora el mapa para encontrar tus favoritos."
- Cada card con boton para quitar de favoritos (corazon rojo)

**Acciones:** Cambiar tab, tocar item, quitar de favoritos.
**Navega a:** Detalle de lugar/ruta/evento.

---

### 22. Notificaciones

**Objetivo:** Ver alertas y actualizaciones.

**Componentes:**
- Header: "Notificaciones"
- Lista de notificaciones (mas recientes arriba):
  - Icono segun tipo (evento, paseo, resena, sistema)
  - Titulo de la notificacion
  - Descripcion breve
  - Tiempo transcurrido
  - Indicador de no leida (punto verde)
- Tipos:
  - "Nuevo evento cerca de ti: [Nombre]"
  - "Tu evento [Nombre] empieza en 1 hora"
  - "[Usuario] califico tu ruta"
  - "Recordatorio: vacuna de [Perro] proxima"
  - "[Negocio] respondio tu resena"
- Estado vacio: "No hay notificaciones nuevas"

**Acciones:** Tocar notificacion (navega al contexto), marcar como leida.
**Navega a:** Detalle de evento/ruta/negocio segun tipo.

---

### 23. Comunidad

**Objetivo:** Ver el feed social de la comunidad pet.

**Componentes:**
- Header: "Comunidad"
- Tabs: "Feed", "Tendencias", "Mi ciudad"
- Boton "Publicar" (esquina superior derecha o FAB)
- Feed vertical de publicaciones:
  - Avatar + nombre del usuario
  - Tiempo transcurrido
  - Foto(s) del post (carousel si hay multiples)
  - Texto del post
  - Ubicacion (si la agrego)
  - Boton "Huellita" (like tematico) + contador
  - Boton "Comentar" + contador
  - Boton "Compartir"
  - Boton "Guardar"
- Bottom Navigation

**Acciones:** Scroll feed, dar huellita, comentar, compartir, guardar, publicar.
**Navega a:** Publicar foto, Detalle de publicacion, Perfil de usuario.

---

### 24. Publicacion de Foto

**Objetivo:** Crear una nueva publicacion en la comunidad.

**Componentes:**
- Header: "Nueva publicacion" + Boton "Publicar"
- Seccion de fotos: selector de galeria o camara (max 5 fotos)
- Preview de fotos seleccionadas (carousel editable)
- Campo "Escribe algo sobre tu paseo..." (textarea)
- Selector "Agregar ubicacion" (abre mapa)
- Selector "Etiquetar perro" (lista de perros del usuario)
- Selector "Agregar ruta" (rutas guardadas)
- Toggle "Compartir en comunidad" / "Solo para mi"

**Acciones:** Seleccionar fotos, escribir, agregar ubicacion, publicar.
**Navega a:** Comunidad (feed con nueva publicacion).

---

### 25. Configuracion

**Objetivo:** Gestionar preferencias de la cuenta.

**Componentes:**
- Header: "Configuracion"
- Seccion "Cuenta":
  - Editar perfil
  - Cambiar contrasena
  - Email vinculado
- Seccion "Preferencias":
  - Notificaciones push (toggle)
  - Recordatorios de vacunas (toggle)
  - Recordatorios de paseos (toggle)
  - Eventos cercanos (toggle + distancia)
  - Ciudad por defecto
- Seccion "Privacidad":
  - Perfil publico / privado
  - Mostrar paseos en comunidad
  - Permitir que otros me sigan
- Seccion "Soporte":
  - Centro de ayuda
  - Reportar un problema
  - Terminos y condiciones
  - Politica de privacidad
- Boton "Cerrar sesion" (rojo)
- Version de la app (footer)

**Acciones:** Toggle opciones, editar perfil, cerrar sesion.
**Navega a:** Editar perfil, Ayuda, Terminos.
