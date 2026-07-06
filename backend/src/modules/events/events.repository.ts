import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({ data });
  }

  async findById(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: { id: true, firstName: true, lastName: true, avatarUrl: true },
        },
        route: true,
        attendances: {
          include: {
            user: {
              select: { id: true, firstName: true, lastName: true, avatarUrl: true },
            },
            pet: {
              select: { id: true, name: true, photoUrl: true, breed: true, size: true },
            },
          },
        },
        photos: { orderBy: { createdAt: 'desc' } },
        _count: { select: { attendances: true, reviews: true } },
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }) {
    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        ...params,
        include: {
          organizer: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
          photos: { take: 1 },
          _count: { select: { attendances: true } },
        },
      }),
      this.prisma.event.count({ where: params.where }),
    ]);
    return { data, total };
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return this.prisma.event.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }

  async addAttendance(eventId: string, userId: string, petId: string) {
    return this.prisma.eventAttendance.create({
      data: { eventId, userId, petId },
    });
  }

  async removeAttendance(eventId: string, userId: string, petId: string) {
    return this.prisma.eventAttendance.deleteMany({
      where: { eventId, userId, petId },
    });
  }

  async findAttendance(eventId: string, userId: string, petId: string) {
    return this.prisma.eventAttendance.findFirst({
      where: { eventId, userId, petId },
    });
  }

  async countAttendances(eventId: string) {
    return this.prisma.eventAttendance.count({ where: { eventId } });
  }
}
