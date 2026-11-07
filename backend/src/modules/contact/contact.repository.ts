import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ContactRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ContactMessageCreateInput) {
    return this.prisma.contactMessage.create({
      data,
      select: { id: true, createdAt: true },
    });
  }

  countRecentByIp(ipHash: string, since: Date) {
    return this.prisma.contactMessage.count({
      where: { ipHash, createdAt: { gte: since } },
    });
  }
}
