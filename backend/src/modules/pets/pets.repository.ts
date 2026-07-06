import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PetCreateInput) {
    return this.prisma.pet.create({ data });
  }

  async findById(id: string) {
    return this.prisma.pet.findUnique({
      where: { id },
      include: {
        vaccines: { orderBy: { date: 'desc' } },
        photos: { orderBy: { createdAt: 'desc' }, take: 20 },
        _count: {
          select: { walks: true, eventAttendances: true },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.pet.findMany({
      where: { userId },
      include: {
        _count: { select: { walks: true, eventAttendances: true } },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: string, data: Prisma.PetUpdateInput) {
    return this.prisma.pet.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.pet.delete({ where: { id } });
  }
}
