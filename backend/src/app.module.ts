import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PetsModule } from './modules/pets/pets.module';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { EventsModule } from './modules/events/events.module';
import { RoutesModule } from './modules/routes/routes.module';
import { WalksModule } from './modules/walks/walks.module';
import { PhotosModule } from './modules/photos/photos.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Límite general por IP: 120 peticiones por minuto (las rutas sensibles
    // como login, registro y contacto tienen límites más estrictos).
    ThrottlerModule.forRoot([{ name: 'default', ttl: 60_000, limit: 120 }]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PetsModule,
    BusinessesModule,
    EventsModule,
    RoutesModule,
    WalksModule,
    PhotosModule,
    ReviewsModule,
    FavoritesModule,
    NotificationsModule,
    ContactModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
