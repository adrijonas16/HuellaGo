import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReviewCreateInput) {
    return this.prisma.review.create({
      data,
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
      },
    });
  }

  async findByBusiness(businessId: string, skip = 0, take = 20) {
    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { businessId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      }),
      this.prisma.review.count({ where: { businessId } }),
    ]);
    return { data, total };
  }

  async findByRoute(routeId: string, skip = 0, take = 20) {
    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { routeId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      }),
      this.prisma.review.count({ where: { routeId } }),
    ]);
    return { data, total };
  }

  async update(id: string, data: Prisma.ReviewUpdateInput) {
    return this.prisma.review.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }

  async findById(id: string) {
    return this.prisma.review.findUnique({ where: { id } });
  }
}
