import { HttpException } from '@nestjs/common';
import { ContactService, MAX_PER_HOUR } from './contact.service';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';

describe('ContactService.create', () => {
  const valid: CreateContactDto = {
    name: 'María García',
    email: 'Maria@Correo.com',
    subject: 'Consulta general',
    message: 'Quisiera saber cómo registrar mi veterinaria en HuellaGo.',
    website: '',
    elapsedMs: 15000,
  };

  let repo: jest.Mocked<Pick<ContactRepository, 'create' | 'countRecentByIp'>>;
  let service: ContactService;

  beforeEach(() => {
    repo = {
      create: jest.fn().mockResolvedValue({ id: 'm1', createdAt: new Date() }),
      countRecentByIp: jest.fn().mockResolvedValue(0),
    };
    service = new ContactService(repo as unknown as ContactRepository);
  });

  it('guarda el mensaje con el email en minúsculas y la IP anonimizada', async () => {
    await expect(service.create(valid, '1.2.3.4')).resolves.toEqual({
      ok: true,
    });
    const saved = repo.create.mock.calls[0][0];
    expect(saved.email).toBe('maria@correo.com');
    expect(saved.ipHash).toHaveLength(64);
    expect(saved.ipHash).not.toContain('1.2.3.4');
  });

  it('descarta en silencio si el campo trampa viene lleno', async () => {
    await expect(
      service.create({ ...valid, website: 'http://spam.com' }, '1.2.3.4'),
    ).resolves.toEqual({ ok: true });
    expect(repo.create).not.toHaveBeenCalled();
  });

  it('descarta en silencio si el formulario se llenó demasiado rápido', async () => {
    await service.create({ ...valid, elapsedMs: 800 }, '1.2.3.4');
    expect(repo.create).not.toHaveBeenCalled();
  });

  it('descarta mensajes con muchos enlaces', async () => {
    const message = 'Compra ya https://a.com https://b.com https://c.com';
    await service.create({ ...valid, message }, '1.2.3.4');
    expect(repo.create).not.toHaveBeenCalled();
  });

  it('limita los mensajes por IP en una hora', async () => {
    repo.countRecentByIp.mockResolvedValue(MAX_PER_HOUR);
    await expect(service.create(valid, '1.2.3.4')).rejects.toBeInstanceOf(
      HttpException,
    );
    expect(repo.create).not.toHaveBeenCalled();
  });
});
