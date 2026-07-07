import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { WalkStatus, Prisma } from '@prisma/client';
import { WalksRepository } from './walks.repository';
import { RoutesRepository } from '../routes/routes.repository';
import { StartWalkDto } from './dto/start-walk.dto';
import { FinishWalkDto } from './dto/finish-walk.dto';

@Injectable()
export class WalksService {
  constructor(
    private walksRepository: WalksRepository,
    private routesRepository: RoutesRepository,
  ) {}

  async start(userId: string, dto: StartWalkDto) {
    return this.walksRepository.create({
      user: { connect: { id: userId } },
      pet: { connect: { id: dto.petId } },
      ...(dto.routeId && { route: { connect: { id: dto.routeId } } }),
    });
  }

  async finish(userId: string, walkId: string, dto: FinishWalkDto) {
    const walk = await this.walksRepository.findById(walkId);
    if (!walk) throw new NotFoundException('Paseo no encontrado');
    if (walk.userId !== userId) {
      throw new ForbiddenException('No tienes permiso');
    }
    if (walk.walkStatus !== WalkStatus.IN_PROGRESS && walk.walkStatus !== WalkStatus.PAUSED) {
      throw new BadRequestException('Este paseo ya fue finalizado');
    }

    const updated = await this.walksRepository.update(walkId, {
      walkStatus: WalkStatus.COMPLETED,
      finishedAt: new Date(),
      distance: dto.distance,
      duration: dto.duration,
      trackPoints: dto.trackPoints as unknown as Prisma.InputJsonValue,
      rating: dto.rating,
      comment: dto.comment,
      security: dto.security,
      cleanliness: dto.cleanliness,
      shade: dto.shade,
      traffic: dto.traffic,
      hasWater: dto.hasWater,
      hasDogs: dto.hasDogs,
    });

    if (walk.routeId) {
      await this.routesRepository.incrementWalkCount(walk.routeId);
    }

    return updated;
  }

  async findOne(id: string) {
    const walk = await this.walksRepository.findById(id);
    if (!walk) throw new NotFoundException('Paseo no encontrado');
    return walk;
  }

  async findByUser(userId: string, page = 1, limit = 20) {
    return this.walksRepository.findByUser(userId, (page - 1) * limit, limit);
  }

  async getStats(userId: string) {
    return this.walksRepository.getUserStats(userId);
  }
}
