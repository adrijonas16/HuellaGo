import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { createHash } from 'crypto';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';

/** Menos de este tiempo entre mostrar y enviar el formulario = bot. */
export const MIN_FILL_MS = 3000;
/** Máximo de mensajes por IP en una hora. */
export const MAX_PER_HOUR = 5;

const LINK_RE = /(https?:\/\/|www\.)/gi;

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private repo: ContactRepository) {}

  async create(dto: CreateContactDto, ip: string, userAgent?: string) {
    // Los bots reciben una respuesta de éxito para que no reintenten,
    // pero el mensaje no se guarda.
    if (this.looksLikeSpam(dto)) {
      this.logger.warn('Mensaje de contacto descartado como spam');
      return { ok: true };
    }

    const ipHash = createHash('sha256')
      .update(ip || 'unknown')
      .digest('hex');
    const since = new Date(Date.now() - 60 * 60 * 1000);
    const recent = await this.repo.countRecentByIp(ipHash, since);
    if (recent >= MAX_PER_HOUR) {
      throw new HttpException(
        'Ya recibimos varios mensajes tuyos. Te responderemos pronto; si es urgente, inténtalo en una hora.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    await this.repo.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      subject: dto.subject,
      message: dto.message,
      ipHash,
      userAgent: userAgent?.slice(0, 300),
    });
    return { ok: true };
  }

  looksLikeSpam(dto: CreateContactDto) {
    if (dto.website && dto.website.trim() !== '') return true;
    if (dto.elapsedMs !== undefined && dto.elapsedMs < MIN_FILL_MS) return true;
    const links = dto.message.match(LINK_RE)?.length ?? 0;
    return links > 2;
  }
}
