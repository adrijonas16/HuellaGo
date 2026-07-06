import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        pets: { orderBy: { createdAt: 'asc' } },
        _count: {
          select: {
            walks: true,
            eventAttendances: true,
            followedBy: true,
            following: true,
          },
        },
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
  }) {
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        ...params,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          city: true,
          _count: { select: { pets: true, walks: true } },
        },
      }),
      this.prisma.user.count({ where: params.where }),
    ]);
    return { data, total };
  }
}
