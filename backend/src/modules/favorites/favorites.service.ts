import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async addBusiness(userId: string, businessId: string) {
    return this.favoritesRepository.addBusiness(userId, businessId);
  }

  async addEvent(userId: string, eventId: string) {
    return this.favoritesRepository.addEvent(userId, eventId);
  }

  async addRoute(userId: string, routeId: string) {
    return this.favoritesRepository.addRoute(userId, routeId);
  }

  async findByUser(userId: string) {
    return this.favoritesRepository.findByUser(userId);
  }

  async remove(userId: string, favoriteId: string) {
    const fav = await this.favoritesRepository.findById(favoriteId);
    if (!fav) throw new NotFoundException('Favorito no encontrado');
    if (fav.userId !== userId) {
      throw new ForbiddenException('No puedes eliminar este favorito');
    }
    return this.favoritesRepository.remove(favoriteId);
  }
}
