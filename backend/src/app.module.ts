import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
  ],
})
export class AppModule {}
