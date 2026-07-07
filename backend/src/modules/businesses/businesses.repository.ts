import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { Prisma, BusinessStatus } from '@prisma/client';
import { QueryBusinessDto } from './dto/query-business.dto';

@Injectable()
export class BusinessesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BusinessCreateInput) {
    return this.prisma.business.create({ data });
  }

  async findById(id: string) {
    return this.prisma.business.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
        hours: { orderBy: { dayOfWeek: 'asc' } },
        services: true,
        photos: { orderBy: { createdAt: 'desc' } },
        reviews: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, avatarUrl: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: { select: { reviews: true, favorites: true } },
      },
    });
  }

  async findMany(query: QueryBusinessDto) {
    const where: Prisma.BusinessWhereInput = {
      businessStatus: BusinessStatus.APPROVED,
      ...(query.category && { category: query.category }),
      ...(query.is24Hours && { is24Hours: true }),
      ...(query.isVerified && { isVerified: true }),
    };

    const [data, total] = await Promise.all([
      this.prisma.business.findMany({
        where,
        skip: query.skip,
        take: query.limit,
        include: {
          photos: { take: 1 },
          reviews: { select: { rating: true } },
          _count: { select: { reviews: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.business.count({ where }),
    ]);

    return { data, total };
  }

  async findByOwner(ownerId: string) {
    return this.prisma.business.findMany({
      where: { ownerId },
      include: {
        _count: { select: { reviews: true, favorites: true } },
      },
    });
  }

  async update(id: string, data: Prisma.BusinessUpdateInput) {
    return this.prisma.business.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.business.delete({ where: { id } });
  }

  async getAvgRating(businessId: string): Promise<number> {
    const result = await this.prisma.review.aggregate({
      where: { businessId },
      _avg: { rating: true },
    });
    return result._avg.rating || 0;
  }
}
