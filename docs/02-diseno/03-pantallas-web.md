# HuellaGo - Pantallas Web

## 9. Pantallas Web (19 pantallas)

---

### 1. Landing Page

**Objetivo:** Captar usuarios y negocios. Primera impresion de HuellaGo en la web.

**Componentes:**
- **Navbar:** Logo HuellaGo | Inicio | Servicios | Eventos | Rutas | Para Negocios | Iniciar sesion | Boton "Descargar app"
- **Hero Section:**
  - Titulo: "Haz que cada paseo deje huella" (Nunito ExtraBold 48px)
  - Subtitulo: "Veterinarias, eventos, rutas y comunidad pet friendly. Todo en un solo lugar."
  - Boton primario: "Descargar HuellaGo" (verde menta)
  - Boton secundario: "Explorar servicios" (outline)
  - Imagen hero: mockup del telefono con la app + perro feliz
- **Seccion "Como funciona"** (3 columnas con iconos):
  - 1. "Registra a tu perro" - icono huella
  - 2. "Encuentra servicios cerca" - icono mapa
  - 3. "Pasea, explora y comparte" - icono camara/ruta
- **Seccion "Servicios":**
  - Grid de 6 cards: Veterinarias, Paseadores, Hoteles, Grooming, Tiendas, Emergencias
  - Cada card con icono, titulo y descripcion corta
  - Boton "Ver todos los servicios"
- **Seccion "Eventos pet friendly":**
  - Carousel de 3 cards de eventos proximos
  - Boton "Ver todos los eventos"
- **Seccion "Rutas de paseo":**
  - 3 cards de rutas populares con mini mapa
  - Boton "Explorar rutas"
- **Seccion "Para negocios":**
  - Titulo: "Lleva tu negocio pet al siguiente nivel"
  - Subtitulo: "Registra tu veterinaria, hotel o servicio y conecta con miles de duenos de mascotas"
  - Boton: "Registrar mi negocio"
  - Imagen: dashboard mockup
- **Seccion "Comunidad":**
  - Grid de fotos de la comunidad (estilo Instagram)
  - Titulo: "Miles de duenos ya comparten sus paseos"
- **Seccion "Ciudades":**
  - "Disponible en Arequipa, Lima y pronto en mas ciudades"
  - Iconos de ciudades
- **Footer:**
  - Logo + slogan
  - Links: Sobre nosotros, Blog, Contacto, Terminos, Privacidad
  - Redes sociales
  - App Store + Google Play badges
  - "Hecho con amor en Peru"

**Acciones:** Descargar app, explorar servicios, registrar negocio, iniciar sesion.
**Navega a:** App stores, Pagina principal, Registro negocio, Login.

---

### 2. Pagina Principal (Dashboard usuario logueado)

**Objetivo:** Vista principal para usuarios logueados en la web.

**Componentes:**
- Navbar con avatar de usuario, notificaciones, buscador
- Sidebar izquierdo (colapsable):
  - Inicio, Mapa, Eventos, Rutas, Comunidad, Favoritos, Mis perros, Configuracion
- Area principal:
  - Saludo: "Hola, [Nombre]. Que haremos hoy con [Perro]?"
  - Cards de stats rapidos: Paseos este mes | Proximos eventos | Rutas guardadas
  - Seccion "Eventos cerca de ti" (cards horizontales)
  - Seccion "Rutas recomendadas" (cards horizontales)
  - Seccion "Negocios destacados" (cards horizontales)
  - Seccion "Actividad de la comunidad" (feed compacto)

**Acciones:** Navegar secciones, explorar contenido.
**Navega a:** Todas las secciones via sidebar.

---

### 3. Pagina de Exploracion

**Objetivo:** Buscar y descubrir servicios, eventos y rutas.

**Componentes:**
- Barra de busqueda grande centrada
- Filtros avanzados (chips + panel lateral)
- Tabs: "Servicios", "Eventos", "Rutas", "Comunidad"
- Grid de resultados (cards)
- Ordenar por: Relevancia, Distancia, Calificacion, Mas recientes
- Paginacion o scroll infinito
- Mapa mini en esquina (click para expandir)

**Acciones:** Buscar, filtrar, ordenar, ver resultados.
**Navega a:** Detalle de servicio/evento/ruta.

---

### 4. Mapa de Servicios

**Objetivo:** Vista de mapa amplia para explorar servicios.

**Componentes:**
- Layout 60/40: Mapa (60% izquierda) | Lista de resultados (40% derecha)
- Mapa grande con todos los marcadores
- Panel de filtros superior (chips + filtros avanzados)
- Lista de resultados:
  - Cards de negocios/servicios con: foto, nombre, categoria, calificacion, distancia, estado
  - Al hover en card: marcador del mapa se resalta
  - Al click en marcador: card se resalta en la lista
- Buscador de direccion/zona
- Boton "Buscar en esta zona"

**Acciones:** Mover mapa, filtrar, buscar, click en marcador/card.
**Navega a:** Detalle de servicio.

---

### 5. Directorio de Servicios

**Objetivo:** Directorio organizado por categorias.

**Componentes:**
- Header: "Directorio de Servicios Pet"
- Tabs de categoria: Veterinarias | Paseadores | Hoteles | Guarderias | Grooming | Tiendas | Emergencias | Entrenadores
- Filtros: Ciudad, Distrito, Calificacion, Abierto ahora
- Grid de cards de negocios (3 columnas)
- Cada card: foto, nombre, calificacion, distancia, servicios principales, boton "Ver perfil"
- Paginacion

**Acciones:** Filtrar por categoria, buscar, ver perfil.
**Navega a:** Detalle de negocio.

---

### 6. Pagina de Eventos

**Objetivo:** Explorar todos los eventos pet friendly.

**Componentes:**
- Header: "Eventos Pet Friendly"
- Mapa mini con marcadores de eventos
- Tabs: "Proximos", "Esta semana", "Este mes", "Pasados"
- Filtros: Ciudad, Tipo, Gratis, Tamano de perro, Nivel de energia
- Grid de cards de eventos (2-3 columnas)
- Calendario lateral (version desktop)
- Boton "Crear evento"

**Acciones:** Filtrar, buscar, ver evento, crear evento.
**Navega a:** Detalle de evento, Crear evento.

---

### 7. Detalle de Evento (Web)

**Objetivo:** Ver informacion completa del evento en formato amplio.

**Componentes:**
- Layout 2 columnas:
  - Columna principal (65%):
    - Galeria de fotos grande (hero)
    - Titulo, organizador, badge estado
    - Descripcion completa
    - Mapa con punto de encuentro y ruta
    - Requisitos y recomendaciones
    - Seccion "Asistentes" (grid de avatares + perros)
    - Comentarios
  - Sidebar (35%):
    - Card fija con:
      - Fecha y hora
      - Precio
      - Cupos disponibles
      - Nivel de energia
      - Tamano recomendado
      - Boton "Inscribirme" (grande)
      - Boton "Compartir"
      - Boton "Guardar"
    - Info del organizador
    - Eventos similares

**Acciones:** Inscribirse, compartir, guardar, ver ruta, ver asistentes.
**Navega a:** Inscripcion (modal), Ruta, Perfil organizador.

---

### 8. Pagina de Rutas

**Objetivo:** Explorar rutas de paseo.

**Componentes:**
- Header: "Rutas de Paseo"
- Mapa grande con rutas trazadas (toggle mostrar/ocultar)
- Filtros: Dificultad, Distancia, Ciudad, Segura, Con sombra, Con agua
- Tabs: "Populares", "Nuevas", "Cercanas", "Mis rutas"
- Grid/lista de cards de rutas
- Cada card: mini mapa, nombre, distancia, tiempo, dificultad, calificacion, badges
- Boton "Crear ruta"

**Acciones:** Filtrar, buscar, ver ruta, crear ruta.
**Navega a:** Detalle de ruta, Crear ruta.

---

### 9. Detalle de Ruta (Web)

**Objetivo:** Ver ruta completa con mapa amplio.

**Componentes:**
- Layout 60/40:
  - Mapa grande (60%) con ruta trazada, marcadores de descanso/agua/sombra
  - Panel lateral (40%):
    - Nombre de la ruta
    - Creador
    - Stats: distancia, tiempo, dificultad
    - Calificacion
    - Badges de seguridad, sombra, limpieza, trafico, agua
    - Descripcion
    - Galeria de fotos
    - Boton "Hacer esta ruta" (descarga app)
    - Boton "Crear evento con esta ruta"
    - Comentarios de usuarios

**Acciones:** Ver ruta en mapa, ver fotos, crear evento, leer comentarios.
**Navega a:** Crear evento, App stores.

---

### 10. Pagina de Comunidad

**Objetivo:** Ver el feed social en formato web.

**Componentes:**
- Layout 3 columnas:
  - Sidebar izquierdo: menu de navegacion
  - Feed central: publicaciones con fotos, comentarios, huellitas
  - Sidebar derecho: tendencias, eventos proximos, sugerencias de seguir
- Boton "Nueva publicacion"
- Tabs: "Feed", "Tendencias", "Mi ciudad"
- Publicaciones con: avatar, nombre, fotos, texto, ubicacion, huellitas, comentarios, compartir

**Acciones:** Publicar, comentar, dar huellita, compartir, seguir.
**Navega a:** Perfil de usuario, Detalle de publicacion.

---

### 11. Dashboard del Usuario

**Objetivo:** Panel personal con estadisticas y gestion.

**Componentes:**
- Sidebar con menu
- Header con nombre y avatar
- Cards de estadisticas: Total paseos | Distancia total | Eventos asistidos | Rutas creadas
- Seccion "Mis perros" (cards editables)
- Seccion "Proximos eventos" (inscritos)
- Seccion "Historial de paseos" (timeline con mini mapas)
- Seccion "Mis rutas guardadas"
- Seccion "Mis favoritos"
- Seccion "Mis resenas"

**Acciones:** Gestionar perros, ver historial, gestionar favoritos.
**Navega a:** Perfil de perro, Detalle de paseo/evento/ruta.

---

### 12. Dashboard del Negocio

**Objetivo:** Panel para gestionar el negocio registrado.

**Componentes:**
- Sidebar: Inicio | Mi perfil | Servicios | Resenas | Reservas | Promociones | Estadisticas | Configuracion
- Cards de metricas: Visitas al perfil | Llamadas | Reservas | Calificacion promedio
- Grafico de visitas (ultimos 30 dias)
- Resenas recientes (con opcion de responder)
- Reservas pendientes (tabla)
- Seccion "Mis promociones activas"
- Boton "Editar perfil de negocio"
- Boton "Crear promocion"

**Acciones:** Ver metricas, responder resenas, gestionar reservas, crear promociones.
**Navega a:** Editar perfil, Detalle de reserva, Crear promocion.

---

### 13. Dashboard del Organizador de Eventos

**Objetivo:** Panel para gestionar eventos creados.

**Componentes:**
- Sidebar: Inicio | Mis eventos | Crear evento | Asistentes | Estadisticas | Configuracion
- Cards de metricas: Eventos activos | Total inscritos | Proximos eventos | Eventos pasados
- Lista de eventos creados (tabla con: nombre, fecha, cupos, inscritos, estado, acciones)
- Evento seleccionado: detalle expandido con lista de asistentes y perritos
- Boton "Crear nuevo evento" (prominente)
- Grafico de inscripciones por evento

**Acciones:** Crear evento, gestionar asistentes, ver estadisticas.
**Navega a:** Crear evento, Detalle de evento, Lista de asistentes.

---

### 14. Formulario para Crear Evento (Web)

**Objetivo:** Crear un evento con todas las opciones en version web.

**Componentes:**
- Layout 2 columnas:
  - Formulario (60%):
    - Datos basicos: nombre, fecha, hora, descripcion
    - Subir fotos (drag & drop, hasta 10)
    - Punto de encuentro (selector de mapa)
    - Trazar ruta (herramienta de dibujo en mapa)
    - Requisitos (input + chips)
    - Nivel de energia (radio buttons visuales)
    - Tamano de perro (checkboxes)
    - Cupos maximos
    - Precio (gratis o con costo)
    - Recomendaciones para asistentes (textarea)
    - Visibilidad (publico/privado)
  - Preview en tiempo real (40%):
    - Mockup de como se vera el evento en la app y en la web
    - Se actualiza mientras el organizador llena el formulario
- Boton "Guardar borrador"
- Boton "Publicar evento"

**Acciones:** Llenar formulario, trazar ruta, previsualizar, publicar.
**Navega a:** Dashboard de organizador, Detalle de evento publicado.

---

### 15. Formulario para Registrar Negocio

**Objetivo:** Registro de nuevo negocio en la plataforma.

**Componentes:**
- Pasos (stepper):
  - Paso 1: Datos del responsable (nombre, email, telefono)
  - Paso 2: Datos del negocio (nombre, categoria, descripcion, RUC)
  - Paso 3: Ubicacion (direccion + mapa para confirmar pin)
  - Paso 4: Servicios y horarios (checkboxes de servicios, horarios por dia)
  - Paso 5: Fotos (upload, min 3 fotos)
  - Paso 6: Resumen y envio
- Progress bar en la parte superior
- Boton "Anterior" y "Siguiente"
- Boton "Enviar para revision" (ultimo paso)
- Mensaje: "Revisaremos tu negocio en 24-48 horas"

**Acciones:** Completar pasos, subir fotos, enviar.
**Navega a:** Confirmacion, Dashboard del negocio (tras aprobacion).

---

### 16. Panel Administrativo

**Objetivo:** Gestion interna de la plataforma HuellaGo.

**Componentes:**
- Sidebar oscuro: Dashboard | Usuarios | Negocios | Eventos | Rutas | Contenido | Categorias | Reportes | Configuracion
- Dashboard principal:
  - Cards: Total usuarios | Negocios activos | Eventos este mes | Rutas creadas | Nuevos registros hoy
  - Graficos: Crecimiento de usuarios, Eventos por ciudad, Categorias mas buscadas
- Seccion Negocios:
  - Tabla: nombre, categoria, ciudad, estado (pendiente/aprobado/rechazado), acciones
  - Boton aprobar/rechazar
  - Ver detalle de negocio
- Seccion Eventos:
  - Tabla de eventos con moderacion
- Seccion Reportes:
  - Lista de reportes de usuarios con estado
- Seccion Contenido:
  - Publicaciones reportadas
  - Moderacion de fotos

**Acciones:** Aprobar/rechazar negocios, moderar contenido, ver reportes, gestionar categorias.
**Navega a:** Detalle de negocio/evento/reporte.

---

### 17. Pagina de Precios / Planes

**Objetivo:** Mostrar planes para negocios.

**Componentes:**
- Header: "Planes para tu negocio pet"
- 3 columnas de planes:
  - **Gratis**: Perfil basico, ubicacion en mapa, hasta 5 fotos, resenas
  - **Pro** (S/ 49/mes): Todo gratis + promociones, estadisticas, badge verificado, prioridad en busqueda, hasta 20 fotos
  - **Premium** (S/ 99/mes): Todo Pro + reservas online, destacado en mapa, soporte prioritario, fotos ilimitadas, multiples sucursales
- Tabla comparativa de features
- FAQ
- Boton "Empezar gratis" (cada plan)
- Boton "Contactar ventas" (Premium)

**Acciones:** Seleccionar plan, contactar ventas.
**Navega a:** Registro de negocio, Contacto.

---

### 18. Pagina de Contacto

**Objetivo:** Permitir contacto con el equipo HuellaGo.

**Componentes:**
- Titulo: "Hablemos"
- Subtitulo: "Estamos aqui para ayudarte"
- Formulario: Nombre, Email, Asunto (dropdown), Mensaje
- Boton "Enviar mensaje"
- Info de contacto: email, telefono, redes sociales
- Mapa con ubicacion de oficina (si aplica)
- FAQ rapido

**Acciones:** Enviar formulario de contacto.
**Navega a:** Confirmacion de envio.

---

### 19. Pagina de Ayuda

**Objetivo:** Centro de ayuda y soporte.

**Componentes:**
- Buscador: "Como podemos ayudarte?"
- Categorias de ayuda:
  - Cuenta y perfil
  - Mis mascotas
  - Mapa y servicios
  - Eventos
  - Rutas y paseos
  - Negocios
  - Pagos y planes
  - Reportar problema
- Articulos populares (lista)
- Boton "Contactar soporte"
- Chat en vivo (futuro)

**Acciones:** Buscar, navegar categorias, leer articulos, contactar soporte.
**Navega a:** Articulo de ayuda, Contacto.
