import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class FavoritesRepository {
  constructor(private prisma: PrismaService) {}

  async addBusiness(userId: string, businessId: string) {
    return this.prisma.favorite.create({ data: { userId, businessId } });
  }

  async addEvent(userId: string, eventId: string) {
    return this.prisma.favorite.create({ data: { userId, eventId } });
  }

  async addRoute(userId: string, routeId: string) {
    return this.prisma.favorite.create({ data: { userId, routeId } });
  }

  async remove(id: string) {
    return this.prisma.favorite.delete({ where: { id } });
  }

  async findByUser(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        business: {
          select: { id: true, name: true, category: true, city: true },
        },
        event: {
          select: { id: true, title: true, date: true, status: true },
        },
        route: {
          select: { id: true, name: true, distance: true, difficulty: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.favorite.findUnique({ where: { id } });
  }
}
