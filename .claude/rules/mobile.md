---
paths:
  - "mobile/**"
---

# Reglas de la app móvil (Flutter)

## Estructura

```
mobile/lib/
├── core/
│   ├── constants/api_constants.dart   # baseUrl y rutas de la API
│   ├── network/api_client.dart        # Dio con token
│   ├── router/app_router.dart         # go_router
│   └── theme/                         # app_colors.dart, app_theme.dart
├── data/
│   ├── models/                        # *_model.dart con fromJson/toJson
│   └── repositories/                  # un repositorio por recurso de la API
└── presentation/screens/<pantalla>/   # una carpeta por pantalla
```

- Usa Riverpod para el estado, go_router para navegar y Dio a través de `ApiClient`. No hagas llamadas HTTP desde los widgets: van en un repositorio.
- Los archivos van en `snake_case.dart`, las clases en PascalCase y cada pantalla termina en `Screen`.
- Corre `flutter analyze` sin advertencias antes de terminar.

## Contrato con la API

- Respeta `docs/desarrollo/contrato-api.md`. **Ojo:** solo las listas paginadas vienen como `{ data, meta }`; `/pets` y `/favorites` devuelven un array plano y un detalle devuelve el objeto plano. Los repositorios actuales asumen `response.data['data']` en todos los casos: cuando toques uno, corrígelo para leer la forma real.
- Los mensajes de error de la API ya vienen en español: muéstralos tal cual.

## Diseño

- La referencia visual es la web (`web/tailwind.config.ts`). Los colores de `app_colors.dart` todavía son los anteriores; cuando cambies una pantalla, alinea los tokens que use con la paleta «Cielo de Arequipa»: primary `#3352F5`, accent `#FFC531`, secondary `#0F8A5F`, rose `#F0506E`, dark `#191C33` y fondo `#F5F6F1`.
- Usa los mismos textos que la web: español de Perú, con tildes y en voz activa.
