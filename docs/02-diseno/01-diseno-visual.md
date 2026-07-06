# HuellaGo - Diseno Visual y Branding

## 10. Propuesta de Diseno Visual

### Filosofia de Diseno
HuellaGo debe sentirse como una app premium peruana: moderna, calida, confiable y cercana. No infantil, pero si amigable. No corporativa, pero si profesional. El diseno debe transmitir que esta hecho con carino, pensado para personas que aman a sus perros.

---

## 11. Paleta de Colores

### Colores Primarios
```
Verde Menta (Primary):     #2EC4B6  - Naturaleza, rutas, frescura
Verde Oscuro (Primary Dark): #1A9E93 - Botones activos, acentos
```

### Colores Secundarios
```
Naranja Calido (Secondary):     #FF6B35  - Energia, alegria, CTAs
Naranja Oscuro (Secondary Dark): #E85D2C  - Hover states, acentos
Amarillo Sol (Accent):          #FFB627  - Destacados, badges, alertas
```

### Colores de Soporte
```
Azul Oscuro (Dark):    #1B2838  - Textos principales, headers
Gris Oscuro:           #4A5568  - Textos secundarios
Gris Medio:            #A0AEC0  - Placeholders, iconos inactivos
Gris Claro:            #E2E8F0  - Bordes, separadores
Crema (Background):    #FFF8F0  - Fondo principal calido
Blanco:                #FFFFFF  - Cards, modals
```

### Colores Semanticos
```
Exito:      #38A169  - Confirmaciones, verificado
Error:      #E53E3E  - Errores, cancelado
Advertencia: #DD6B20 - Alertas
Info:       #3182CE  - Informacion
```

### Colores de Categoria (Marcadores del mapa)
```
Veterinaria:    #E53E3E (rojo)      - Cruz medica
Clinica 24h:    #C53030 (rojo oscuro) - Emergencia
Paseador:       #38A169 (verde)     - Movimiento
Hotel:          #805AD5 (morado)    - Descanso
Guarderia:      #D69E2E (dorado)    - Cuidado
Tienda:         #3182CE (azul)      - Comercio
Grooming:       #ED64A6 (rosa)      - Belleza
Parque:         #2EC4B6 (verde menta) - Naturaleza
Pet Friendly:   #FF6B35 (naranja)   - Destacado
Evento:         #FFB627 (amarillo)  - Actividad
Ruta:           #2EC4B6 (verde menta) - Recorrido
```

---

## 12. Tipografias

### Tipografia Principal: **Inter**
- Moderna, limpia, excelente legibilidad en movil y web.
- Gratis en Google Fonts.
- Pesos: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).

### Tipografia Secundaria (Titulos destacados): **Nunito**
- Bordes redondeados, amigable pero profesional.
- Gratis en Google Fonts.
- Pesos: 600 (SemiBold), 700 (Bold), 800 (ExtraBold).

### Escala Tipografica Movil
```
H1 (Titulos principales):   Nunito Bold 28px
H2 (Subtitulos):            Nunito SemiBold 22px
H3 (Titulos de seccion):    Inter Bold 18px
Body (Texto principal):     Inter Regular 16px
Body Small:                 Inter Regular 14px
Caption:                    Inter Medium 12px
Button:                     Inter SemiBold 16px
Tab Label:                  Inter Medium 12px
```

### Escala Tipografica Web
```
H1 (Hero):                  Nunito ExtraBold 48px
H2 (Secciones):             Nunito Bold 36px
H3 (Subtitulos):            Nunito SemiBold 28px
H4 (Cards):                 Inter Bold 20px
Body:                       Inter Regular 16px
Body Small:                 Inter Regular 14px
Caption:                    Inter Medium 12px
Button:                     Inter SemiBold 16px
Nav:                        Inter Medium 14px
```

---

## 13. Estilo de Componentes

### Iconos
- Estilo: **Outline** con bordes de 1.5px, redondeados.
- Libreria recomendada: **Phosphor Icons** o **Lucide Icons**.
- Tamano movil: 24px (navegacion), 20px (inline).
- Tamano web: 24px (sidebar), 20px (inline), 16px (small).
- Color activo: Verde Menta #2EC4B6.
- Color inactivo: Gris Medio #A0AEC0.
- Iconos personalizados para: huella, perro, ruta, evento, mapa.

### Botones
```
Primary Button:
  - Background: #2EC4B6 (verde menta)
  - Texto: #FFFFFF
  - Border-radius: 12px
  - Padding: 16px 24px
  - Font: Inter SemiBold 16px
  - Sombra: 0 2px 8px rgba(46, 196, 182, 0.3)
  - Hover: #1A9E93
  - Active: scale(0.98)

Secondary Button:
  - Background: transparent
  - Borde: 2px solid #2EC4B6
  - Texto: #2EC4B6
  - Border-radius: 12px
  - Hover: background #2EC4B6/10

CTA Button (Naranja):
  - Background: #FF6B35
  - Texto: #FFFFFF
  - Border-radius: 12px
  - Sombra: 0 2px 8px rgba(255, 107, 53, 0.3)
  - Hover: #E85D2C

Ghost Button:
  - Background: transparent
  - Texto: #4A5568
  - Sin borde
  - Hover: background #F7FAFC

Floating Action Button (FAB):
  - Background: #FF6B35
  - Icono: blanco
  - Tamano: 56px
  - Border-radius: 16px
  - Sombra: 0 4px 16px rgba(255, 107, 53, 0.4)
  - Posicion: bottom-right, 16px del borde
```

### Tarjetas (Cards)
```
Card Base:
  - Background: #FFFFFF
  - Border-radius: 16px
  - Sombra: 0 2px 12px rgba(0, 0, 0, 0.06)
  - Padding: 16px
  - Borde: ninguno (la sombra es suficiente)

Card de Evento:
  - Imagen superior (aspect ratio 16:9, border-radius top 16px)
  - Badge de estado (esquina superior derecha)
  - Titulo (Inter Bold 16px)
  - Fecha e icono de calendario
  - Ubicacion e icono de pin
  - Avatares de asistentes (stack circular, max 5 + "+12")
  - Nivel de energia (badge con color)
  - Boton "Inscribirme" o estado

Card de Ruta:
  - Mini mapa con polyline (aspect ratio 16:9)
  - Titulo de la ruta
  - Distancia y tiempo estimado (con iconos)
  - Nivel de dificultad (badge)
  - Calificacion (estrellas)
  - Badges: sombra, segura, agua disponible
  - Boton "Hacer esta ruta"

Card de Negocio/Servicio:
  - Foto principal (aspect ratio 4:3)
  - Nombre del negocio
  - Categoria (chip con color)
  - Calificacion y numero de resenas
  - Distancia
  - Estado (abierto/cerrado - badge)
  - Boton "Ver mas"

Card de Perrito:
  - Foto circular del perro (80px)
  - Nombre
  - Raza
  - Edad
  - Nivel de energia (icono animado)
  - Badge de tamano
```

### Estilo de Mapas
```
Mapa:
  - Estilo: Google Maps estilo personalizado (tonos suaves)
  - Colores del mapa: reducir saturacion, tonos cremosos
  - Parques en verde menta suave
  - Calles en gris claro
  - Agua en azul suave

Marcadores personalizados:
  - Forma: circulo con icono de categoria
  - Tamano: 40px
  - Borde: 3px blanco
  - Sombra: 0 2px 8px rgba(0,0,0,0.2)
  - Color segun categoria (ver paleta de categorias)
  - Al seleccionar: escala 1.2 + bottom sheet

Cluster de marcadores:
  - Circulo con numero
  - Color: Verde Menta
  - Texto: blanco bold
```

### Badges y Etiquetas
```
Badge de Estado de Evento:
  - Proximo: fondo #FFB627/15, texto #FFB627, borde #FFB627
  - Activo: fondo #38A169/15, texto #38A169, borde #38A169
  - Finalizado: fondo #A0AEC0/15, texto #A0AEC0
  - Cancelado: fondo #E53E3E/15, texto #E53E3E

Badge de Dificultad:
  - Facil: verde #38A169
  - Moderada: naranja #FF6B35
  - Dificil: rojo #E53E3E

Badge de Seguridad:
  - Segura: escudo verde
  - Precaucion: escudo amarillo
  - No verificada: escudo gris

Chips de Filtro:
  - Inactivo: fondo #F7FAFC, texto #4A5568, borde #E2E8F0
  - Activo: fondo #2EC4B6, texto #FFFFFF
  - Border-radius: 20px
  - Padding: 8px 16px
  - Font: Inter Medium 14px
```

### Formularios
```
Input Field:
  - Background: #FFFFFF
  - Borde: 1.5px solid #E2E8F0
  - Border-radius: 12px
  - Padding: 14px 16px
  - Font: Inter Regular 16px
  - Placeholder: #A0AEC0
  - Focus: borde #2EC4B6, sombra 0 0 0 3px #2EC4B6/20
  - Error: borde #E53E3E, mensaje en rojo debajo
  - Label: Inter Medium 14px, color #4A5568, margen inferior 6px

Textarea:
  - Igual que input pero min-height 100px
  - Contador de caracteres en esquina inferior derecha

Select/Dropdown:
  - Mismo estilo que input
  - Icono chevron a la derecha
  - Dropdown con sombra y border-radius 12px

Toggle:
  - Tamano: 48x28px
  - Inactivo: #E2E8F0
  - Activo: #2EC4B6
  - Animacion: spring suave
```

### Navegacion Movil (Bottom Tab Bar)
```
Bottom Navigation:
  - Background: #FFFFFF
  - Altura: 64px + safe area
  - Sombra superior: 0 -2px 12px rgba(0,0,0,0.06)
  - 5 items: Inicio, Mapa, Eventos, Rutas, Perfil
  - Icono inactivo: #A0AEC0 (24px)
  - Icono activo: #2EC4B6 (24px)
  - Label inactivo: #A0AEC0 (Inter Medium 10px)
  - Label activo: #2EC4B6 (Inter SemiBold 10px)
  - Indicador activo: punto verde debajo del icono
```

### Dashboard Web (Sidebar)
```
Sidebar:
  - Ancho: 260px (colapsable a 72px)
  - Background: #1B2838 (azul oscuro)
  - Logo HuellaGo en la parte superior
  - Items de menu:
    - Icono + Texto (Inter Medium 14px)
    - Color inactivo: #A0AEC0
    - Color activo: #FFFFFF con fondo #2EC4B6/20
    - Indicador izquierdo: barra de 3px #2EC4B6
  - Seccion inferior: perfil de usuario mini
  - Hover: fondo rgba(255,255,255,0.05)
```

---

## 14. Estados de Interfaz

### Estado Vacio
- Ilustracion suave (perro buscando, huella con lupa)
- Titulo: "Aun no hay [elementos]"
- Subtitulo: mensaje motivador
- CTA: boton para crear/explorar

### Estado de Carga
- Skeleton screens (no spinners)
- Cards placeholder con animacion shimmer
- Color: #F7FAFC pulsando a #E2E8F0

### Estado de Error
- Ilustracion de perro confundido
- Titulo: "Algo salio mal"
- Subtitulo: descripcion del error
- Boton: "Reintentar"

### Estado de Exito
- Icono de check animado (verde menta)
- Titulo de confirmacion
- Confetti sutil (para inscripciones o hitos)
- Auto-dismiss despues de 3 segundos o boton continuar

---

## 15. Microinteracciones

- **Huellita (like)**: Al tocar, la huella se llena con animacion de escala + rebote.
- **Guardar favorito**: Corazon se llena con animacion de latido.
- **Inscripcion exitosa**: Confetti suave + animacion de check.
- **Iniciar paseo**: Boton pulsa y cambia a modo tracking.
- **Finalizar paseo**: Animacion de huella que se forma con la ruta.
- **Cambio de filtro**: Chip cambia de color con transicion suave.
- **Abrir ficha**: Bottom sheet sube con spring animation.
- **Scroll de cards**: Efecto parallax suave en imagenes.
- **Pull to refresh**: Animacion de huella girando.
- **Carga de mapa**: Marcadores aparecen con efecto bounce.
- **Transicion entre pantallas**: Shared element transition para fotos.
- **Rating**: Estrellas se llenan secuencialmente con delay.
