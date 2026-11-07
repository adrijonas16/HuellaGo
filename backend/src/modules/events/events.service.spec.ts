import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { EventStatus } from '@prisma/client';
import { EventsService } from './events.service';
import { EventsRepository } from './events.repository';
import { RoutesRepository } from '../routes/routes.repository';

/**
 * Patrón de test unitario del backend:
 * - El service se prueba aislado; el repository se reemplaza por mocks (jest.fn()).
 * - Un describe por método público y un it por regla de negocio.
 * - Los mensajes de error se verifican porque llegan tal cual al usuario.
 */
describe('EventsService.attend', () => {
  const upcoming = {
    id: 'evt-1',
    organizerId: 'org-1',
    eventStatus: EventStatus.UPCOMING,
    maxAttendees: 10,
  };

  let repo: jest.Mocked<
    Pick<
      EventsRepository,
      | 'findById'
      | 'isPetOwnedBy'
      | 'countAttendances'
      | 'findAttendance'
      | 'addAttendance'
    >
  >;
  let service: EventsService;

  beforeEach(() => {
    repo = {
      findById: jest.fn().mockResolvedValue(upcoming),
      isPetOwnedBy: jest.fn().mockResolvedValue(true),
      countAttendances: jest.fn().mockResolvedValue(3),
      findAttendance: jest.fn().mockResolvedValue(null),
      addAttendance: jest.fn().mockResolvedValue({ id: 'att-1' }),
    };
    service = new EventsService(
      repo as unknown as EventsRepository,
      {} as RoutesRepository,
    );
  });

  it('inscribe a la mascota del usuario cuando hay cupo', async () => {
    await expect(service.attend('evt-1', 'user-1', 'pet-1')).resolves.toEqual({
      id: 'att-1',
    });
    expect(repo.addAttendance).toHaveBeenCalledWith('evt-1', 'user-1', 'pet-1');
  });

  it('responde 404 si el evento no existe', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(service.attend('x', 'user-1', 'pet-1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('rechaza eventos que ya no están próximos', async () => {
    repo.findById.mockResolvedValue({
      ...upcoming,
      eventStatus: EventStatus.FINISHED,
    } as never);
    await expect(service.attend('evt-1', 'user-1', 'pet-1')).rejects.toThrow(
      'Solo puedes inscribirte a eventos próximos',
    );
  });

  it('no permite inscribir mascotas de otra persona', async () => {
    repo.isPetOwnedBy.mockResolvedValue(false);
    await expect(
      service.attend('evt-1', 'user-1', 'pet-ajena'),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(repo.addAttendance).not.toHaveBeenCalled();
  });

  it('rechaza la inscripción si el evento está lleno', async () => {
    repo.countAttendances.mockResolvedValue(10);
    await expect(service.attend('evt-1', 'user-1', 'pet-1')).rejects.toThrow(
      'El evento está lleno',
    );
  });

  it('no duplica la inscripción de la misma mascota', async () => {
    repo.findAttendance.mockResolvedValue({ id: 'att-0' } as never);
    await expect(
      service.attend('evt-1', 'user-1', 'pet-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
