import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, WalkStatus } from '@prisma/client';

@Injectable()
export class WalksRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.WalkCreateInput) {
    return this.prisma.walk.create({ data });
  }

  async findById(id: string) {
    return this.prisma.walk.findUnique({
      where: { id },
      include: {
        pet: { select: { id: true, name: true, photoUrl: true, breed: true } },
        route: { select: { id: true, name: true } },
        photos: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  async findByUser(userId: string, skip = 0, take = 20) {
    const [data, total] = await Promise.all([
      this.prisma.walk.findMany({
        where: { userId, walkStatus: WalkStatus.COMPLETED },
        skip,
        take,
        orderBy: { startedAt: 'desc' },
        include: {
          pet: { select: { id: true, name: true, photoUrl: true } },
          route: { select: { id: true, name: true } },
          photos: { take: 3 },
        },
      }),
      this.prisma.walk.count({
        where: { userId, walkStatus: WalkStatus.COMPLETED },
      }),
    ]);
    return { data, total };
  }

  async update(id: string, data: Prisma.WalkUpdateInput) {
    return this.prisma.walk.update({ where: { id }, data });
  }

  async getUserStats(userId: string) {
    const result = await this.prisma.walk.aggregate({
      where: { userId, walkStatus: WalkStatus.COMPLETED },
      _count: true,
      _sum: { distance: true, duration: true },
    });
    return {
      totalWalks: result._count,
      totalDistance: result._sum.distance || 0,
      totalDuration: result._sum.duration || 0,
    };
  }
}
