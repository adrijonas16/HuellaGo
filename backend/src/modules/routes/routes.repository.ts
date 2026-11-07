import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoutesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RouteCreateInput) {
    return this.prisma.route.create({ data });
  }

  async findById(id: string) {
    return this.prisma.route.findUnique({
      where: { id },
      include: {
        photos: { orderBy: { createdAt: 'desc' } },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        _count: { select: { walks: true, reviews: true, favorites: true } },
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.RouteWhereInput;
    orderBy?: Prisma.RouteOrderByWithRelationInput;
  }) {
    const [data, total] = await Promise.all([
      this.prisma.route.findMany({
        ...params,
        include: {
          photos: { take: 1 },
          _count: { select: { walks: true, reviews: true } },
        },
      }),
      this.prisma.route.count({ where: params.where }),
    ]);
    return { data, total };
  }

  async update(id: string, data: Prisma.RouteUpdateInput) {
    return this.prisma.route.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.route.delete({ where: { id } });
  }

  async incrementWalkCount(id: string) {
    return this.prisma.route.update({
      where: { id },
      data: { timesWalked: { increment: 1 } },
    });
  }
}
