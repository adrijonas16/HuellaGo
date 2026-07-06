import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  businessId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  eventId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  routeId?: string;
}

@Injectable()
export class ReviewsService {
  constructor(private reviewsRepository: ReviewsRepository) {}

  async create(userId: string, dto: CreateReviewDto) {
    return this.reviewsRepository.create({
      rating: dto.rating,
      comment: dto.comment,
      user: { connect: { id: userId } },
      ...(dto.businessId && { business: { connect: { id: dto.businessId } } }),
      ...(dto.eventId && { event: { connect: { id: dto.eventId } } }),
      ...(dto.routeId && { route: { connect: { id: dto.routeId } } }),
    });
  }

  async findByBusiness(businessId: string, page = 1, limit = 20) {
    return this.reviewsRepository.findByBusiness(
      businessId,
      (page - 1) * limit,
      limit,
    );
  }

  async findByRoute(routeId: string, page = 1, limit = 20) {
    return this.reviewsRepository.findByRoute(
      routeId,
      (page - 1) * limit,
      limit,
    );
  }

  async remove(userId: string, reviewId: string) {
    const review = await this.reviewsRepository.findById(reviewId);
    if (!review) throw new NotFoundException('Resena no encontrada');
    if (review.userId !== userId) {
      throw new ForbiddenException('No puedes eliminar esta resena');
    }
    return this.reviewsRepository.delete(reviewId);
  }
}
