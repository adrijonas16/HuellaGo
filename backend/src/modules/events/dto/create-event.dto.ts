import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsArray,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnergyLevel, PetSize } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty({ example: 'Mascotatone Arequipa 2026' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'Parque Selva Alegre, Arequipa' })
  @IsString()
  @IsNotEmpty()
  meetingPoint: string;

  @ApiProperty({ example: -16.3989 })
  @IsNumber()
  meetingLat: number;

  @ApiProperty({ example: -71.535 })
  @IsNumber()
  meetingLng: number;

  @ApiProperty({ example: 'Arequipa' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  maxAttendees?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiPropertyOptional({ enum: EnergyLevel })
  @IsOptional()
  @IsEnum(EnergyLevel)
  energyLevel?: EnergyLevel;

  @ApiPropertyOptional({ enum: PetSize, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(PetSize, { each: true })
  recommendedSize?: PetSize[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @ApiPropertyOptional({ description: 'ID de ruta existente' })
  @IsOptional()
  @IsString()
  routeId?: string;
}
