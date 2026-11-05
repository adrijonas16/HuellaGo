import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { EventStatus, Prisma } from '@prisma/client';
import { EventsRepository } from './events.repository';
import { RoutesRepository } from '../routes/routes.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto, PaginatedResponse } from '../../common/dto/pagination.dto';

@Injectable()
export class EventsService {
  constructor(
    private eventsRepository: EventsRepository,
    private routesRepository: RoutesRepository,
  ) {}

  async create(organizerId: string, dto: CreateEventDto) {
    const { routeId, inlineRoute, ...rest } = dto;

    if (routeId && inlineRoute) {
      throw new BadRequestException(
        'Envia routeId o inlineRoute, no ambos',
      );
    }

    let finalRouteId = routeId;

    // Si viene una ruta grabada desde la app, crearla primero
    if (inlineRoute) {
      const newRoute = await this.routesRepository.create({
        name: inlineRoute.name,
        description: inlineRoute.description,
        startLat: dto.meetingLat,
        startLng: dto.meetingLng,
        endLat: dto.endLat ?? dto.meetingLat,
        endLng: dto.endLng ?? dto.meetingLng,
        waypoints: JSON.parse(
          JSON.stringify(inlineRoute.waypoints),
        ) as Prisma.InputJsonValue,
        distance: inlineRoute.distance,
        duration: inlineRoute.duration,
        difficulty: (inlineRoute.difficulty as any) ?? 'EASY',
        city: dto.city,
        district: dto.district,
        isPublic: true,
        hasShade: inlineRoute.hasShade ?? false,
        hasWater: inlineRoute.hasWater ?? false,
        hasRestArea: inlineRoute.hasRestArea ?? false,
        creatorId: organizerId,
      });
      finalRouteId = newRoute.id;
    }

    return this.eventsRepository.create({
      ...rest,
      date: new Date(dto.date),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      organizer: { connect: { id: organizerId } },
      ...(finalRouteId && { route: { connect: { id: finalRouteId } } }),
    });
  }

  async findAll(query: PaginationDto & { city?: string; status?: EventStatus }) {
    const where = {
      ...(query.city && { city: query.city }),
      ...(query.status && { eventStatus: query.status }),
    };

    const { data, total } = await this.eventsRepository.findMany({
      skip: query.skip,
      take: query.limit,
      where,
      orderBy: { date: 'asc' },
    });

    return new PaginatedResponse(data, total, query.page, query.limit);
  }

  async findOne(id: string) {
    const event = await this.eventsRepository.findById(id);
    if (!event) throw new NotFoundException('Evento no encontrado');
    return event;
  }

  async update(organizerId: string, eventId: string, dto: UpdateEventDto) {
    const event = await this.findOne(eventId);
    if (event.organizerId !== organizerId) {
      throw new ForbiddenException('No tienes permiso para editar este evento');
    }
    return this.eventsRepository.update(eventId, {
      ...dto,
      date: dto.date ? new Date(dto.date) : undefined,
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
    });
  }

  async attend(eventId: string, userId: string, petId: string) {
    const event = await this.findOne(eventId);

    if (event.eventStatus !== EventStatus.UPCOMING) {
      throw new BadRequestException('Solo puedes inscribirte a eventos próximos');
    }

    if (event.maxAttendees) {
      const count = await this.eventsRepository.countAttendances(eventId);
      if (count >= event.maxAttendees) {
        throw new BadRequestException('El evento está lleno');
      }
    }

    const existing = await this.eventsRepository.findAttendance(
      eventId,
      userId,
      petId,
    );
    if (existing) {
      throw new BadRequestException('Ya estás inscrito con esta mascota');
    }

    return this.eventsRepository.addAttendance(eventId, userId, petId);
  }

  async cancelAttendance(eventId: string, userId: string, petId: string) {
    return this.eventsRepository.removeAttendance(eventId, userId, petId);
  }

  async remove(organizerId: string, eventId: string) {
    const event = await this.findOne(eventId);
    if (event.organizerId !== organizerId) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este evento',
      );
    }
    return this.eventsRepository.delete(eventId);
  }
}
