# HuellaGo - Flujos Principales de Usuario

## 7. Flujos de Navegacion

---

### Flujo 1: Registro y Perfil de Perro

```
Splash Screen
  |
  v
Onboarding (3 pantallas)
  |-- "Encuentra todo para tu perro"
  |-- "Descubre rutas y eventos"
  |-- "Crea recuerdos de cada paseo"
  |
  v
Registro / Login
  |-- Email + contrasena
  |-- Google
  |-- Apple
  |-- Facebook
  |
  v
Crear Perfil de Usuario
  |-- Nombre
  |-- Foto
  |-- Ciudad
  |-- Distrito
  |
  v
Registrar Mascota
  |-- Nombre del perro
  |-- Foto
  |-- Raza (selector con busqueda)
  |-- Fecha de nacimiento
  |-- Tamano
  |-- Nivel de energia
  |
  v
Recomendaciones Iniciales
  |-- Veterinarias cercanas
  |-- Eventos proximos compatibles
  |-- Rutas recomendadas
  |
  v
Home
```

---

### Flujo 2: Buscar Veterinaria Cercana

```
Home
  |
  v
Mapa Interactivo
  |-- Toca icono de filtros
  |
  v
Panel de Filtros
  |-- Selecciona "Veterinarias"
  |-- Activa "Abierto ahora"
  |-- Distancia: 5km
  |-- Aplica filtros
  |
  v
Mapa con marcadores filtrados
  |-- Toca un marcador de veterinaria
  |
  v
Preview Card (bottom sheet)
  |-- Nombre, calificacion, distancia
  |-- Boton "Ver mas"
  |
  v
Ficha Completa de Veterinaria
  |-- Fotos, servicios, horarios
  |-- Resenas de otros usuarios
  |-- Boton "Llamar"
  |-- Boton "Como llegar"
  |-- Boton "Guardar en favoritos" (corazon)
  |-- Boton "Reservar cita"
  |
  v
(Usuario llama o reserva)
  |
  v
Lugar guardado en Favoritos
```

---

### Flujo 3: Asistir a Evento

```
Home
  |
  v
Seccion "Eventos Cerca de Ti"
  |-- Lista horizontal de cards de eventos
  |-- Toca "Ver todos"
  |
  v
Lista de Eventos
  |-- Filtros: fecha, distancia, tipo, tamano de perro
  |-- Toca un evento
  |
  v
Detalle de Evento
  |-- Info completa
  |-- Mapa con punto de encuentro
  |-- Ruta del evento trazada
  |-- Perritos que asistiran
  |-- Boton "Inscribirme"
  |
  v
Modal de Inscripcion
  |-- Selecciona perro(s) que llevara
  |-- Confirma asistencia
  |-- Boton "Confirmar inscripcion"
  |
  v
Confirmacion
  |-- "Te inscribiste a [Evento]"
  |-- Agregar a calendario
  |-- Compartir con amigos
  |
  v
[Dia del evento]
  |
  v
Notificacion: "Tu evento empieza en 1 hora"
  |
  v
Asiste al evento
  |
  v
Notificacion post-evento: "Como estuvo el paseo?"
  |
  v
Subir Fotos del Paseo
  |-- Seleccionar fotos de galeria o tomar nuevas
  |-- Agregar comentario
  |-- Calificar el evento
  |
  v
"Huella del Paseo" generada
  |-- Resumen visual con mapa, fotos, distancia, tiempo
  |-- Boton "Compartir"
  |-- Boton "Volver a hacer esta ruta"
  |
  v
Guardado en historial
```

---

### Flujo 4: Crear Ruta

```
Home o Seccion Rutas
  |
  v
Boton flotante "+" > "Crear ruta"
  |
  v
Pantalla Crear Ruta
  |-- Mapa en pantalla completa
  |-- Toca para marcar punto de salida
  |-- Traza recorrido tocando puntos en el mapa
  |-- Marca punto de llegada
  |
  v
Formulario de Detalles
  |-- Nombre de la ruta
  |-- Nivel de dificultad (facil/moderada/dificil)
  |-- Descripcion
  |-- Agregar fotos del recorrido
  |-- Marcar zonas de descanso
  |-- Marcar puntos de agua
  |-- Marcar zonas con sombra
  |-- Visibilidad: publica o privada
  |
  v
Preview de la Ruta
  |-- Mapa con recorrido trazado
  |-- Distancia calculada
  |-- Tiempo estimado
  |-- Boton "Publicar ruta"
  |
  v
Ruta publicada
  |-- Aparece en el directorio de rutas
  |-- Otros usuarios pueden verla y hacerla
```

---

### Flujo 5: Recrear Ruta

```
Perfil > Historial de Paseos
  |-- o --
Seccion Rutas > Mis Rutas
  |
  v
Selecciona una ruta anterior
  |
  v
Detalle de Ruta
  |-- Mapa con recorrido
  |-- Estadisticas anteriores
  |-- Boton "Volver a hacer esta ruta"
  |
  v
Iniciar Paseo
  |-- GPS activo
  |-- Ruta de referencia visible en mapa
  |-- Tracking en tiempo real
  |-- Boton pausa
  |-- Boton foto rapida
  |
  v
Paseo en Progreso
  |-- Distancia recorrida
  |-- Tiempo transcurrido
  |-- Posicion actual vs ruta
  |
  v
Finalizar Paseo
  |-- Boton "Finalizar"
  |
  v
Subir Fotos
  |
  v
"Huella del Paseo" generada
  |-- Comparacion con paseo anterior (si aplica)
```

---

### Flujo 6: Crear Evento desde Ruta

```
Detalle de Ruta (propia o publica)
  |
  v
Boton "Crear evento con esta ruta"
  |
  v
Formulario Crear Evento
  |-- Ruta ya precargada en el mapa
  |-- Nombre del evento
  |-- Fecha y hora
  |-- Punto de encuentro (precargado del punto de salida)
  |-- Descripcion
  |-- Requisitos
  |-- Precio (gratis o con costo)
  |-- Cupos maximos
  |-- Nivel de energia recomendado
  |-- Tamano de perro recomendado
  |-- Agregar fotos
  |-- Visibilidad: publico o privado
  |
  v
Preview del Evento
  |-- Vista previa tipo ficha
  |-- Boton "Publicar evento"
  |
  v
Evento publicado
  |-- Aparece en seccion de eventos
  |-- Aparece en el mapa
  |-- Notificacion a usuarios de la zona
```

---

### Flujo 7: Negocio Registra Servicio (Web)

```
Landing Page de HuellaGo
  |
  v
Seccion "Registra tu negocio"
  |-- Boton "Empezar gratis"
  |
  v
Registro como Negocio
  |-- Datos del responsable
  |-- Datos del negocio
  |
  v
Dashboard de Negocio (primer uso)
  |
  v
Completar Perfil de Negocio
  |-- Nombre del negocio
  |-- Categoria (veterinaria, hotel, groomer, etc.)
  |-- Descripcion
  |-- Direccion (con mapa)
  |-- Telefono / WhatsApp
  |-- Horarios de atencion
  |-- Servicios ofrecidos (checkboxes + precios)
  |-- Galeria de fotos (min 3)
  |-- Certificaciones
  |-- Zonas de atencion
  |
  v
Enviar para Revision
  |-- Estado: "En revision"
  |-- Notificacion a equipo admin
  |
  v
[Admin revisa y aprueba]
  |
  v
Negocio Activo
  |-- Aparece en el mapa
  |-- Puede recibir contactos
  |-- Puede recibir resenas
  |-- Puede publicar promociones
  |-- Ve estadisticas de visitas
```

---

### Flujo 8: Organizador Crea Evento (Web)

```
Login como Organizador
  |
  v
Dashboard de Organizador
  |-- Boton "Crear nuevo evento"
  |
  v
Formulario Crear Evento (version web completa)
  |-- Datos basicos (nombre, fecha, hora, descripcion)
  |-- Ubicacion (punto de encuentro en mapa)
  |-- Trazar ruta del evento en mapa
  |-- Subir fotos del lugar
  |-- Definir requisitos
  |-- Definir precio y metodo de pago
  |-- Definir cupos maximos
  |-- Nivel de energia y tamano recomendado
  |-- Recomendaciones para asistentes
  |-- Patrocinadores (si aplica)
  |
  v
Preview del Evento
  |-- Vista previa desktop y movil
  |
  v
Publicar Evento
  |
  v
Gestionar Evento
  |-- Ver inscritos
  |-- Ver perritos asistentes
  |-- Enviar mensaje a inscritos
  |-- Editar evento
  |-- Cancelar evento
  |-- Subir fotos post-evento
  |-- Ver estadisticas del evento
```
