import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PhotosRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PhotoCreateInput) {
    return this.prisma.photo.create({ data });
  }

  async createMany(data: Prisma.PhotoCreateManyInput[]) {
    return this.prisma.photo.createMany({ data });
  }

  async findByWalk(walkId: string) {
    return this.prisma.photo.findMany({
      where: { walkId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.photo.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByPet(petId: string) {
    return this.prisma.photo.findMany({
      where: { petId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    return this.prisma.photo.delete({ where: { id } });
  }
}
