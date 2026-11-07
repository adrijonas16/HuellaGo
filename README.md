# HuellaGo

**Cada paseo deja huella.** HuellaGo es una plataforma para dueños de mascotas en Arequipa, Perú. Reúne en un solo lugar veterinarias y servicios pet, eventos, rutas de paseo, comunidad y adopción.

El repositorio tiene tres aplicaciones:

- `web/`: sitio web (Next.js)
- `backend/`: API REST (NestJS + Prisma + PostgreSQL)
- `mobile/`: app móvil (Flutter, en construcción)

## Usarlo

- Web: https://huellago-sooty.vercel.app
- API: https://huellago-api.vercel.app/api (documentación en `/api/docs`)
- Cuenta de ejemplo: `maria.garcia@gmail.com` / `HuellaGo2026!`

## Instalarlo en local

Requisitos: Node.js 20 o superior, PostgreSQL 14 o superior y, para la app, Flutter 3.19 o superior.

**1. Base de datos y API**

```bash
cd backend
cp .env.example .env          # ajusta DATABASE_URL y DIRECT_URL a tu PostgreSQL
npm install
npm run db:push               # crea las tablas
npm run prisma:seed           # carga datos de ejemplo (incluye la cuenta de ejemplo)
npm run start:dev             # http://localhost:3000/api
```

**2. Web**

```bash
cd web
cp .env.example .env.local    # NEXT_PUBLIC_API_URL=http://localhost:3000/api
npm install
npm run dev                   # http://localhost:3001
```

La web también funciona sin la API: usa datos de ejemplo y un modo de demostración.

**3. App móvil (opcional)**

```bash
cd mobile
flutter pub get
flutter run                   # la URL de la API está en lib/core/constants/api_constants.dart
```

## Probarlo

```bash
# API
cd backend && npm run lint && npm run typecheck && npm test && npm run build

# Web
cd web && npm run lint && npm run typecheck && npm run build

# App
cd mobile && flutter analyze
```

Para una prueba manual rápida: entra a la web, toca «Ingresar», usa «Usar cuenta de ejemplo», inscribe a Luna en un evento, guarda un negocio en favoritos y publica una reseña.
