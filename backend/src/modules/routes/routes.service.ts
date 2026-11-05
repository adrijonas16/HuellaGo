import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RoutesRepository } from './routes.repository';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';

@Injectable()
export class RoutesService {
  constructor(private routesRepository: RoutesRepository) {}

  async create(creatorId: string, dto: CreateRouteDto) {
    const { waypoints, ...rest } = dto;
    return this.routesRepository.create({
      ...rest,
      waypoints: JSON.parse(JSON.stringify(waypoints)) as Prisma.InputJsonValue,
      creatorId,
    });
  }

  async findAll(
    query: PaginationDto & { city?: string; difficulty?: string },
  ) {
    const where = {
      isPublic: true,
      ...(query.city && { city: query.city }),
      ...(query.difficulty && { difficulty: query.difficulty as any }),
    };

    const { data, total } = await this.routesRepository.findMany({
      skip: query.skip,
      take: query.limit,
      where,
      orderBy: { avgRating: 'desc' },
    });

    return new PaginatedResponse(data, total, query.page, query.limit);
  }

  async findOne(id: string) {
    const route = await this.routesRepository.findById(id);
    if (!route) throw new NotFoundException('Ruta no encontrada');
    return route;
  }

  async update(creatorId: string, routeId: string, dto: UpdateRouteDto) {
    const route = await this.findOne(routeId);
    if (route.creatorId !== creatorId) {
      throw new ForbiddenException('No tienes permiso para editar esta ruta');
    }
    const { waypoints, ...rest } = dto;
    return this.routesRepository.update(routeId, {
      ...rest,
      ...(waypoints && {
        waypoints: JSON.parse(JSON.stringify(waypoints)) as Prisma.InputJsonValue,
      }),
    });
  }

  async remove(creatorId: string, routeId: string) {
    const route = await this.findOne(routeId);
    if (route.creatorId !== creatorId) {
      throw new ForbiddenException('No tienes permiso para eliminar esta ruta');
    }
    return this.routesRepository.delete(routeId);
  }
}
