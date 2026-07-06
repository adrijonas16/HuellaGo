# HuellaGo - Arquitectura de Modulos

## 5. Arquitectura General de Modulos

```
HuellaGo Platform
|
|-- Modulo de Usuarios
|   |-- Registro / Login (email, Google, Apple, Facebook)
|   |-- Perfil de usuario
|   |-- Roles (dueno, negocio, organizador, admin)
|   |-- Preferencias y configuracion
|   |-- Notificaciones push
|
|-- Modulo de Mascotas
|   |-- Registro de mascota
|   |-- Perfil de mascota
|   |-- Galeria de fotos
|   |-- Historial de actividades
|   |-- Vacunas y salud
|   |-- Amigos perrunos
|   |-- Recomendaciones por perfil
|
|-- Modulo de Mapa
|   |-- Mapa interactivo
|   |-- Marcadores personalizados por categoria
|   |-- Geolocalizacion
|   |-- Filtros avanzados
|   |-- Busqueda por zona
|   |-- Calculo de distancias
|
|-- Modulo de Negocios
|   |-- Registro de negocio
|   |-- Perfil de negocio
|   |-- Servicios ofrecidos
|   |-- Horarios
|   |-- Galeria
|   |-- Verificacion
|   |-- Promociones
|   |-- Dashboard de negocio
|   |-- Estadisticas
|
|-- Modulo de Eventos
|   |-- Crear evento
|   |-- Ficha de evento
|   |-- Inscripcion
|   |-- Lista de asistentes
|   |-- Perritos asistentes
|   |-- Estado del evento
|   |-- Ruta del evento
|   |-- Galeria post-evento
|   |-- Dashboard de organizador
|
|-- Modulo de Rutas
|   |-- Crear ruta
|   |-- Trazar recorrido en mapa
|   |-- Guardar ruta
|   |-- Recrear ruta
|   |-- Crear evento desde ruta
|   |-- Calificacion de ruta
|   |-- Feedback post-paseo
|   |-- Historial de rutas
|
|-- Modulo de Paseos (Tracking)
|   |-- Iniciar paseo
|   |-- Tracking en tiempo real
|   |-- Pausar / reanudar
|   |-- Finalizar paseo
|   |-- Generar "Huella del paseo"
|   |-- Subir fotos post-paseo
|   |-- Estadisticas del paseo
|
|-- Modulo de Fotos
|   |-- Subir fotos
|   |-- Galeria por paseo
|   |-- Galeria por evento
|   |-- Galeria por mascota
|   |-- Compresion y optimizacion
|   |-- Almacenamiento cloud
|
|-- Modulo de Resenas
|   |-- Calificar negocio (1-5 estrellas)
|   |-- Calificar ruta (multiples criterios)
|   |-- Calificar evento
|   |-- Escribir comentario
|   |-- Reportar resena
|   |-- Responder resena (negocios)
|
|-- Modulo de Favoritos
|   |-- Guardar negocios
|   |-- Guardar rutas
|   |-- Guardar eventos
|   |-- Guardar publicaciones
|   |-- Listas personalizadas
|
|-- Modulo de Comunidad
|   |-- Feed de publicaciones
|   |-- Crear publicacion
|   |-- Comentarios
|   |-- "Huellitas" (likes)
|   |-- Seguir usuarios/perros
|   |-- Tendencias
|   |-- Moderacion de contenido
|
|-- Modulo de Notificaciones
|   |-- Push notifications
|   |-- Eventos cercanos
|   |-- Recordatorios de vacunas
|   |-- Recordatorios de paseos
|   |-- Nuevos eventos en tu zona
|   |-- Respuestas a comentarios
|   |-- Confirmaciones de reserva
|
|-- Modulo de Reservas
|   |-- Solicitar reserva
|   |-- Confirmar / rechazar
|   |-- Historial de reservas
|   |-- Recordatorios
|   |-- Cancelacion
|
|-- Modulo de Administracion
|   |-- Dashboard administrativo
|   |-- Moderacion de negocios
|   |-- Moderacion de eventos
|   |-- Moderacion de contenido
|   |-- Gestion de categorias
|   |-- Reportes y metricas
|   |-- Verificacion de negocios
|   |-- Gestion de usuarios
```

---

## 6. Roles de Usuario - Permisos

### Dueno de mascota
| Accion | Permitido |
|--------|-----------|
| Buscar servicios en mapa | Si |
| Guardar favoritos | Si |
| Crear perfil de mascota | Si |
| Crear ruta | Si |
| Iniciar paseo | Si |
| Subir fotos | Si |
| Inscribirse a eventos | Si |
| Publicar en comunidad | Si |
| Calificar negocios | Si |
| Calificar rutas | Si |
| Crear eventos | Si (basicos) |
| Reservar servicios | Si |
| Seguir usuarios | Si |

### Negocio pet
| Accion | Permitido |
|--------|-----------|
| Todo lo de dueno | Si |
| Registrar negocio | Si |
| Publicar servicios | Si |
| Gestionar horarios | Si |
| Responder resenas | Si |
| Publicar promociones | Si |
| Ver estadisticas | Si |
| Gestionar reservas | Si |
| Verificar perfil | Si (con aprobacion) |

### Organizador de eventos
| Accion | Permitido |
|--------|-----------|
| Todo lo de dueno | Si |
| Crear eventos avanzados | Si |
| Definir ruta de evento | Si |
| Gestionar cupos | Si |
| Ver lista de asistentes | Si |
| Publicar galeria post-evento | Si |
| Cobrar entrada | Si (futuro) |
| Dashboard de organizador | Si |

### Administrador
| Accion | Permitido |
|--------|-----------|
| Acceso total | Si |
| Aprobar negocios | Si |
| Moderar contenido | Si |
| Gestionar categorias | Si |
| Ver reportes globales | Si |
| Suspender cuentas | Si |
| Verificar negocios | Si |
| Gestionar la plataforma | Si |
