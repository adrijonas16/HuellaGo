import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { EventStatus } from '@prisma/client';
import { EventsRepository } from './events.repository';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginationDto, PaginatedResponse } from '@common/dto/pagination.dto';

@Injectable()
export class EventsService {
  constructor(private eventsRepository: EventsRepository) {}

  async create(organizerId: string, dto: CreateEventDto) {
    const { routeId, ...rest } = dto;
    return this.eventsRepository.create({
      ...rest,
      date: new Date(dto.date),
      endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      organizer: { connect: { id: organizerId } },
      ...(routeId && { route: { connect: { id: routeId } } }),
    });
  }

  async findAll(query: PaginationDto & { city?: string; status?: EventStatus }) {
    const where = {
      ...(query.city && { city: query.city }),
      ...(query.status && { status: query.status }),
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

    if (event.status !== EventStatus.UPCOMING) {
      throw new BadRequestException('Solo puedes inscribirte a eventos proximos');
    }

    if (event.maxAttendees) {
      const count = await this.eventsRepository.countAttendances(eventId);
      if (count >= event.maxAttendees) {
        throw new BadRequestException('El evento esta lleno');
      }
    }

    const existing = await this.eventsRepository.findAttendance(
      eventId,
      userId,
      petId,
    );
    if (existing) {
      throw new BadRequestException('Ya estas inscrito con esta mascota');
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
