# HuellaGo - Prompt para Generar Mockups

## 21. Guia para Prototipo Interactivo

### Estructura del prototipo navegable

#### Flujo principal 1: Usuario nuevo completo
```
Splash > Onboarding (3 slides) > Registro > Crear perro > Home > Mapa > Filtrar veterinaria > Ficha > Guardar favorito > Volver a Home
```

#### Flujo principal 2: Evento completo
```
Home > Eventos cercanos > Lista eventos > Detalle evento > Ver ruta > Inscribirme > Modal seleccion perro > Confirmacion > [Post-evento] > Subir fotos > Huella del paseo > Compartir
```

#### Flujo principal 3: Paseo completo
```
Home > Rutas > Detalle ruta > Iniciar paseo > Paseo en progreso > Finalizar > Subir fotos > Calificar > Huella del paseo > Compartir/Repetir/Crear evento
```

#### Flujo principal 4: Negocio (Web)
```
Landing > Registrar negocio > Formulario (6 pasos) > Enviar > Confirmacion > [Admin aprueba] > Dashboard negocio
```

### Recomendaciones para el prototipo
- Usar auto-layout en Figma para responsividad.
- Crear un frame de 390x844px para movil (iPhone 14).
- Crear frames de 1440x900px para web.
- Agrupar pantallas por flujo en paginas separadas.
- Usar componentes con variantes (estados: default, hover, active, disabled).
- Conectar pantallas con Smart Animate para transiciones suaves.
- Usar overlays para modals y bottom sheets.

---

## 22. Prompt para Generar Mockups en Pencil / Claude Design / Figma

---

**COPIAR Y PEGAR ESTE PROMPT EN LA HERRAMIENTA DE DISENO:**

---

Disena mockups de alta fidelidad para una app llamada **HuellaGo**, una plataforma peruana para duenos de perros que centraliza servicios, eventos, rutas y comunidad pet.

### Estilo visual:
- Diseno moderno, limpio, calido y profesional.
- No infantil, pero si amigable y cercano.
- Mucho espacio en blanco.
- Tarjetas con bordes redondeados (16px radius).
- Sombras suaves (0 2px 12px rgba(0,0,0,0.06)).
- Iconos outline con 1.5px stroke (estilo Phosphor o Lucide).
- Fotografias reales de perros en espacios al aire libre.
- Marcadores de mapa personalizados con iconos por categoria.

### Paleta de colores:
- Primary: #2EC4B6 (verde menta)
- Primary Dark: #1A9E93
- Secondary/CTA: #FF6B35 (naranja calido)
- Accent: #FFB627 (amarillo sol)
- Text Dark: #1B2838
- Text Secondary: #4A5568
- Text Light: #A0AEC0
- Background: #FFF8F0 (crema calido)
- Cards: #FFFFFF
- Borders: #E2E8F0
- Success: #38A169
- Error: #E53E3E

### Tipografia:
- Titulos: Nunito (Bold/ExtraBold)
- Cuerpo y UI: Inter (Regular/Medium/SemiBold/Bold)

### Pantallas moviles a disenar (390x844px, iPhone 14):

1. **Splash Screen**: Fondo degradado verde menta, logo HuellaGo centrado con animacion de huella, barra de carga sutil.

2. **Onboarding (3 slides)**: Ilustraciones de perros con duenos. Slide 1: "Todo para tu perro en un solo lugar" con ilustracion de perro y mapa. Slide 2: "Descubre rutas y eventos" con perros caminando en grupo. Slide 3: "Cada paseo deja huella" con huella formada por fotos. Dots indicadores, boton "Siguiente"/"Empezar", link "Saltar".

3. **Login/Registro**: Logo pequeno, "Bienvenido a HuellaGo", botones sociales (Google, Apple, Facebook), separador "o", campos email/contrasena, boton "Iniciar sesion", link "Crear cuenta".

4. **Home**: Saludo "Hola, [Nombre]" con avatar, buscador, seccion "Cerca de ti" con cards horizontales de negocios, seccion "Eventos proximos" con cards de eventos, seccion "Rutas populares" con cards de rutas. Bottom navigation: Inicio, Mapa, Eventos, Rutas, Perfil. FAB naranja "+" en esquina inferior derecha.

5. **Mapa interactivo**: Mapa pantalla completa con marcadores de colores por categoria. Barra de busqueda transparente arriba. Chips de filtro horizontal debajo. Boton "Mi ubicacion". Bottom sheet al tocar marcador con preview del negocio.

6. **Detalle de servicio**: Galeria de fotos carousel, nombre, categoria (chip), calificacion, estado (abierto), horario, direccion, seccion servicios con iconos, resenas. Barra inferior fija con botones: Llamar, WhatsApp, Como llegar, Reservar.

7. **Lista de eventos**: Header "Eventos", tabs (Proximos/Hoy/Esta semana), chips de filtro, cards de eventos con imagen, titulo, fecha, ubicacion, avatares de asistentes, badges de energia y tamano.

8. **Detalle de evento**: Galeria, badge estado, titulo, organizador verificado, fecha/hora, punto de encuentro con mapa, ruta trazada, descripcion, requisitos, cupos, nivel energia, asistentes con fotos de perros. Barra inferior: precio + boton "Inscribirme".

9. **Inscripcion (modal/bottom sheet)**: "Confirma tu inscripcion", resumen evento, selector de perro con foto y nombre, checkbox condiciones, boton "Confirmar inscripcion".

10. **Lista de rutas**: Header "Rutas", tabs, filtros, cards con mini mapa + polyline, nombre, distancia, tiempo, dificultad, calificacion, badges (sombra, segura, agua).

11. **Detalle de ruta**: Mapa grande con ruta trazada (polyline verde menta), marcadores de inicio/fin, puntos de descanso/agua/sombra. Nombre, creador, stats, calificacion, badges, fotos, comentarios. Botones: "Hacer esta ruta", "Crear evento con esta ruta".

12. **Paseo en progreso**: Mapa pantalla completa con linea del recorrido actual (verde menta animada), posicion actual (punto azul), ruta de referencia (gris punteada si aplica). Panel inferior mini: cronometro, distancia, velocidad. Botones: foto, pausa.

13. **Huella del paseo**: Card especial con fondo degradado. Huella estilizada, titulo "Tu Huella del Paseo", fecha, mini mapa con ruta, stats (distancia, tiempo, calificacion), foto del perro, galeria de fotos, badges de logros. Botones: Compartir, Repetir ruta, Crear evento.

14. **Perfil del perro**: Foto hero grande, nombre, raza, edad. Stats: peso, tamano, energia. Tabs: Info (vacunas, alergias), Paseos (historial), Eventos, Amigos, Fotos.

15. **Perfil de usuario**: Avatar, nombre, ciudad, stats (paseos, eventos, rutas). Seccion "Mis perros" horizontal. Actividad reciente.

16. **Notificaciones**: Lista con icono tipo, titulo, descripcion, tiempo, indicador no leida (punto verde).

### Pantallas web a disenar (1440x900px):

1. **Landing page**: Navbar con logo y links. Hero con titulo "Haz que cada paseo deje huella", subtitulo, 2 botones, mockup del telefono con perro. Secciones: Como funciona (3 pasos), Servicios (6 cards), Eventos (carousel), Rutas (3 cards), Para negocios (CTA), Comunidad (grid fotos), Ciudades, CTA final, Footer.

2. **Mapa de servicios**: Layout 60/40. Mapa grande izquierda con marcadores. Lista de resultados derecha con cards. Filtros superiores. Interaccion: hover en card resalta marcador.

3. **Detalle de evento (web)**: 2 columnas. Izquierda: galeria, titulo, descripcion, mapa con ruta, asistentes. Sidebar derecha: card fija con fecha, precio, cupos, boton inscribirse.

4. **Dashboard de negocio**: Sidebar oscuro (#1B2838). Cards de metricas (visitas, llamadas, reservas, calificacion). Grafico de visitas. Resenas recientes. Tabla de reservas.

5. **Dashboard organizador**: Sidebar. Cards metricas. Tabla de eventos con estado. Lista de asistentes expandible.

6. **Panel administrativo**: Sidebar oscuro. Dashboard con stats globales. Tablas de negocios pendientes de aprobacion. Seccion de moderacion.

### Componentes reutilizables a crear:
- Bottom navigation (movil, 5 items)
- Card de evento (con variantes: proximo, activo, finalizado)
- Card de ruta (con mini mapa)
- Card de negocio
- Card de perrito (grande y compacta)
- Marcadores de mapa por categoria (10 tipos con colores e iconos)
- Chips de filtro (activo/inactivo)
- Botones (primary, secondary, CTA, ghost, FAB)
- Buscador
- Rating estrellas
- Modal de inscripcion
- Bottom sheet de mapa
- Badge de estado (proximo, activo, finalizado, cancelado)
- Badge de dificultad (facil, moderada, dificil)
- Badge de seguridad
- Input field
- Resumen "Huella del paseo"

### Estados de interfaz:
- Default / Normal
- Hover (web)
- Active / Pressed
- Loading (skeleton con shimmer)
- Empty (ilustracion + mensaje + CTA)
- Error (ilustracion de perro confundido + mensaje + reintentar)
- Success (check animado + confetti sutil)
- Disabled

### Microinteracciones:
- Huellita (like): la huella se llena con animacion bounce
- Guardar favorito: corazon con animacion de latido
- Inscripcion exitosa: confetti suave + check animado
- Cambio de filtro: transicion de color suave
- Bottom sheet: spring animation al abrir
- Rating: estrellas se llenan secuencialmente
- Pull to refresh: huella girando

### Navegacion del prototipo:
Conecta las pantallas para crear un flujo clickeable:
- Splash > Onboarding > Login > Home
- Home > Mapa > Detalle servicio
- Home > Eventos > Detalle evento > Inscripcion > Confirmacion
- Home > Rutas > Detalle ruta > Paseo en progreso > Huella del paseo
- Bottom nav conecta: Home, Mapa, Eventos, Rutas, Perfil
- FAB "+" abre menu: Crear ruta, Crear evento, Iniciar paseo

El diseno debe sentirse como una app real, no una maqueta generica. Debe transmitir confianza, comunidad y carino por los perros. Inspiracion visual: mezcla entre Google Maps, Instagram y Strava, pero para perritos peruanos.

---

**FIN DEL PROMPT PARA HERRAMIENTA DE DISENO**
