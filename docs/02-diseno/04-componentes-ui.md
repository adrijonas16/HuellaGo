# HuellaGo - Componentes UI Reutilizables

## 13. Sistema de Componentes

### Componentes de Navegacion

#### Header Web
- Logo HuellaGo (izquierda)
- Links de navegacion: Inicio, Servicios, Eventos, Rutas, Comunidad (centro)
- Buscador (icono expandible)
- Notificaciones (campana con badge)
- Avatar de usuario con dropdown (derecha)
- Boton CTA: "Descargar app" o "Registrar negocio"
- Sticky al hacer scroll, con sombra al separarse

#### Bottom Navigation Movil
- 5 items: Inicio, Mapa, Eventos, Rutas, Perfil
- Iconos: outline inactivo, filled activo
- Label debajo de cada icono
- Color activo: #2EC4B6
- Color inactivo: #A0AEC0
- Punto indicador debajo del item activo
- Safe area para iPhone (padding inferior)

#### Sidebar Web
- Ancho: 260px (72px colapsado)
- Fondo: #1B2838
- Logo en header del sidebar
- Items: icono + label
- Separadores entre secciones
- Indicador activo: barra izquierda #2EC4B6
- Boton de colapsar/expandir
- Info de usuario en footer del sidebar

---

### Componentes de Contenido

#### Card de Evento
```
+----------------------------------+
| [Imagen 16:9]           [Badge] |
+----------------------------------+
| Titulo del Evento                |
| Icono_cal  15 de julio, 9:00 AM |
| Icono_pin  Parque Selva Alegre   |
| [Avatar][Avatar][Avatar] +12     |
| [Badge energia] [Badge tamano]   |
| [Boton: Inscribirme]            |
+----------------------------------+
Dimensiones movil: ancho completo o 280px en scroll horizontal
Dimensiones web: 320px en grid
```

#### Card de Ruta
```
+----------------------------------+
| [Mini mapa con polyline]         |
+----------------------------------+
| Nombre de la Ruta                |
| Icono_dist 3.2 km  Icono_time 45min |
| [Badge: Facil] [Estrellas: 4.5]  |
| [Badge sombra] [Badge segura]    |
| [Boton: Hacer esta ruta]        |
+----------------------------------+
```

#### Card de Negocio / Servicio
```
+----------------------------------+
| [Foto 4:3]                       |
+----------------------------------+
| Nombre del Negocio               |
| [Chip: Veterinaria]             |
| Estrellas 4.8 (124 resenas)     |
| Icono_pin 1.2 km                |
| [Badge: Abierto] o [Badge: Cerrado] |
| [Boton: Ver mas]                |
+----------------------------------+
```

#### Card de Perrito
```
+----------------------------------+
| [Foto circular 80px]            |
| Nombre                          |
| Raza - Edad                     |
| [Badge tamano] [Badge energia]  |
+----------------------------------+
Version compacta (evento/asistentes):
[Foto 48px] Nombre | Raza
```

#### Card de Estadistica (Dashboard)
```
+----------------------------------+
| Icono          Valor grande      |
| Titulo         +12% vs anterior |
+----------------------------------+
Colores: verde (positivo), rojo (negativo), gris (neutro)
```

---

### Componentes de Mapa

#### Marcadores Personalizados
- Forma: circulo 40px con icono de 20px centrado
- Borde: 3px blanco
- Sombra: drop shadow
- Colores por categoria (ver paleta de categorias en diseno visual)
- Iconos por categoria:
  - Veterinaria: cruz medica
  - Paseador: persona caminando
  - Hotel: cama/casa
  - Guarderia: huella
  - Tienda: bolsa
  - Grooming: tijeras
  - Parque: arbol
  - Pet friendly: corazon
  - Evento: estrella/bandera
  - Ruta: flecha curva
- Estado seleccionado: escala 1.2, borde verde menta
- Cluster: circulo con numero, fondo verde menta

#### Bottom Sheet de Mapa (Movil)
```
Estado mini (peek):
+----------------------------------+
| [Foto 60px] Nombre del Lugar    |
|             4.8 estrellas | 1.2km|
|             [Abierto]           |
| [Ver detalle]  [Como llegar]    |
+----------------------------------+

Estado expandido:
Se expande a pantalla completa con toda la info
```

#### Ruta en Mapa (Polyline)
- Color: #2EC4B6 (verde menta)
- Ancho: 4px
- Estilo: linea solida
- Puntos de inicio/fin: marcadores especiales
- Ruta de referencia (recrear): linea gris punteada
- Ruta actual (tracking): linea verde animada
- Puntos de interes en ruta: marcadores pequenos (descanso, agua, sombra)

---

### Componentes de Interaccion

#### Filtros por Categoria
```
Scroll horizontal de chips:
[Todas] [Veterinarias] [Paseadores] [Hoteles] [Grooming] [Tiendas] [24h] [Pet Friendly]

Chip inactivo: fondo #F7FAFC, texto #4A5568, borde #E2E8F0
Chip activo: fondo #2EC4B6, texto #FFFFFF
Border-radius: 20px
Padding: 8px 16px
Gap: 8px
```

#### Chips de Etiquetas
```
Badge de estado: fondo color/15, texto color, border-radius 8px
Badge de dificultad: icono + texto
Badge de seguridad: escudo + texto
Badge de nivel de energia: rayo + texto
Tamanos: small (24px height), medium (32px height)
```

#### Buscador
```
+------------------------------------------+
| Icono_buscar  Buscar veterinarias...  Icono_filtro |
+------------------------------------------+
Border-radius: 16px
Fondo: #FFFFFF
Borde: 1.5px #E2E8F0
Sombra: 0 2px 8px rgba(0,0,0,0.04)
Focus: borde #2EC4B6

Sugerencias: dropdown con resultados agrupados por tipo
```

#### Rating con Estrellas
```
[Estrella][Estrella][Estrella][Estrella][Estrella_media] 4.5
Estrellas llenas: #FFB627 (amarillo)
Estrellas vacias: #E2E8F0
Tamano: 16px (inline), 24px (input), 32px (detalle)
Animacion al calificar: llenado secuencial con delay
```

#### Galeria de Fotos
```
Movil: carousel horizontal con dots indicadores
Web: grid con foto principal grande + 4 pequenas
Click para abrir lightbox
Lightbox: fondo oscuro, flechas, zoom, cerrar
```

---

### Componentes de Formulario

#### Modal de Inscripcion
```
+----------------------------------+
| X                                |
| Confirma tu inscripcion          |
|                                  |
| [Card evento mini]               |
|                                  |
| Con quien vas?                   |
| [x] [Foto] Firulais - Labrador  |
| [ ] [Foto] Luna - Schnauzer     |
|                                  |
| [x] Acepto las condiciones       |
|                                  |
| [Confirmar inscripcion]          |
| [Cancelar]                       |
+----------------------------------+
Border-radius: 24px (movil bottom sheet), 16px (web modal)
Overlay: rgba(0,0,0,0.5)
Animacion: slide up (movil), fade + scale (web)
```

#### Modal de Confirmacion
```
+----------------------------------+
|        [Icono check verde]       |
|     Te inscribiste al evento!    |
|                                  |
|  "Mascotatones Arequipa 2026"    |
|  15 de julio, 9:00 AM           |
|                                  |
| [Agregar al calendario]          |
| [Compartir con amigos]           |
| [Volver a eventos]               |
+----------------------------------+
Confetti animado al aparecer
Auto-dismiss despues de 5s o interaccion
```

#### Formulario Crear Evento
- Campos agrupados en secciones con separadores
- Upload de fotos: drag & drop (web), boton (movil)
- Selector de mapa: mapa inline para seleccionar punto
- Herramienta de dibujo de ruta (solo web, version completa)
- Vista previa en tiempo real (web, panel lateral)
- Validacion inline (bordes rojos + mensaje)
- Progress indicator (si es multi-paso)

#### Formulario Crear Ruta
- Mapa en pantalla completa con toolbar de dibujo
- Toolbar: punto de inicio, trazar, punto de interes, borrar, deshacer
- Panel lateral con datos de la ruta (nombre, dificultad, descripcion)
- Calculo automatico de distancia y tiempo estimado
- Boton flotante "Guardar ruta"

---

### Componentes de Estado

#### Estado de Paseo Activo
```
Mini panel (movil, sobre mapa):
+----------------------------------+
| [Foto perro] Paseando con Firulais |
| 00:32:15  |  2.1 km  |  3.8 km/h |
| [Foto]  [Pausa]                    |
+----------------------------------+
Expandible a pantalla completa
Persistente mientras el paseo esta activo
```

#### Resumen "Huella del Paseo"
```
+----------------------------------+
|        Tu Huella del Paseo       |
|                                  |
| [Mapa con ruta estilizada]       |
|                                  |
| [Foto perro] Firulais            |
| 15 de julio, 2026               |
|                                  |
| 3.2 km  |  45 min  |  4.5 estrellas |
|                                  |
| [Foto] [Foto] [Foto] +3         |
|                                  |
| [Badge: Primera ruta!]           |
|                                  |
| [Compartir]  [Repetir ruta]      |
| [Crear evento]                   |
+----------------------------------+
Fondo: degradado verde menta suave
Bordes: redondeados 24px
Sombra: prominente
```

---

### Componentes de Datos

#### Comentarios y Resenas
```
+----------------------------------+
| [Avatar] NombreUsuario  | Hace 2d |
| [Estrellas: 4.5]                 |
| Texto del comentario que puede   |
| ocupar varias lineas...          |
| [Fotos adjuntas si hay]          |
| [Icono_like] 12  [Icono_reply] Responder |
+----------------------------------+
```

#### Notificaciones
```
+----------------------------------+
| [Icono tipo] Titulo notificacion |
|              Descripcion breve   |
|              Hace 2 horas    [.] |
+----------------------------------+
Punto verde: no leida
Sin punto: leida
Swipe para eliminar (movil)
```

#### Selector de Ciudad
```
Dropdown con busqueda:
- Arequipa (default si es MVP)
- Lima
- Cusco
- Trujillo
- Chiclayo
- Piura
- Tacna
- Otras ciudades

Icono de pin + nombre de ciudad
Subtext: numero de servicios disponibles
```

#### Selector de Nivel de Energia
```
3 chips visuales con icono:
[Icono_relax] Tranquilo  |  [Icono_walk] Moderado  |  [Icono_run] Energico
Colores: verde suave / amarillo / naranja
```

#### Tabs
```
Movil: tabs con scroll horizontal, indicador inferior animado
Web: tabs con fondo, tab activa con fondo blanco y sombra
Font: Inter SemiBold 14px
Color activo: #2EC4B6
Color inactivo: #A0AEC0
Indicador: linea 3px #2EC4B6 debajo (movil), fondo blanco (web)
```

#### Tabla de Reservas (Dashboard Negocio)
```
| Cliente | Mascota | Servicio | Fecha | Hora | Estado | Acciones |
|---------|---------|----------|-------|------|--------|----------|
Columna Estado: badges de color (pendiente/confirmada/cancelada)
Acciones: Confirmar, Rechazar, Ver detalle
Responsive: en movil se convierte en cards
```

#### Panel de Asistentes (Dashboard Eventos)
```
Grid de cards de asistentes:
+------------------+
| [Avatar usuario] |
| Nombre           |
| [Foto perro] NombrePerro |
| Raza - Tamano    |
| Estado: Confirmado |
+------------------+
Filtros: Confirmados, Pendientes, Cancelados
Export a CSV
Enviar mensaje grupal
```
