import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { BusinessesRepository } from './businesses.repository';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { QueryBusinessDto } from './dto/query-business.dto';
import { PaginatedResponse } from '../../common/dto/pagination.dto';

@Injectable()
export class BusinessesService {
  constructor(private businessesRepository: BusinessesRepository) {}

  async create(ownerId: string, dto: CreateBusinessDto) {
    return this.businessesRepository.create({
      ...dto,
      owner: { connect: { id: ownerId } },
    });
  }

  async findAll(query: QueryBusinessDto) {
    const { data, total } = await this.businessesRepository.findMany(query);
    const enriched = data.map((biz: any) => {
      const reviews = biz.reviews || [];
      const avgRating = reviews.length > 0
        ? Math.round((reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length) * 10) / 10
        : 0;
      const { reviews: _, ...rest } = biz;
      return { ...rest, avgRating };
    });
    return new PaginatedResponse(enriched, total, query.page, query.limit);
  }

  async findOne(id: string) {
    const business = await this.businessesRepository.findById(id);
    if (!business) throw new NotFoundException('Negocio no encontrado');

    const avgRating = await this.businessesRepository.getAvgRating(id);
    return { ...business, avgRating };
  }

  async findByOwner(ownerId: string) {
    return this.businessesRepository.findByOwner(ownerId);
  }

  async update(ownerId: string, businessId: string, dto: UpdateBusinessDto) {
    const business = await this.findOne(businessId);
    if (business.ownerId !== ownerId) {
      throw new ForbiddenException('No tienes permiso para editar este negocio');
    }
    return this.businessesRepository.update(businessId, dto);
  }

  async remove(ownerId: string, businessId: string) {
    const business = await this.findOne(businessId);
    if (business.ownerId !== ownerId) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este negocio',
      );
    }
    return this.businessesRepository.delete(businessId);
  }
}
