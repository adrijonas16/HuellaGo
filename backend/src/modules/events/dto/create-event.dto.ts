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
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EnergyLevel, PetSize } from '@prisma/client';

class InlineWaypointDto {
  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}

export class InlineRouteDto {
  @ApiProperty({ example: 'Ruta del evento' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [InlineWaypointDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InlineWaypointDto)
  waypoints: InlineWaypointDto[];

  @ApiProperty({ description: 'Distancia en km' })
  @IsNumber()
  distance: number;

  @ApiProperty({ description: 'Duracion estimada en minutos' })
  @IsNumber()
  duration: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  difficulty?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasShade?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasWater?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasRestArea?: boolean;
}

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

  // Punto de partida
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

  // Punto de fin
  @ApiPropertyOptional({ example: 'Plaza de Armas, Arequipa' })
  @IsOptional()
  @IsString()
  endPoint?: string;

  @ApiPropertyOptional({ example: -16.3988 })
  @IsOptional()
  @IsNumber()
  endLat?: number;

  @ApiPropertyOptional({ example: -71.537 })
  @IsOptional()
  @IsNumber()
  endLng?: number;

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

  @ApiPropertyOptional({ description: 'ID de ruta existente (alternativa a inlineRoute)' })
  @IsOptional()
  @IsString()
  routeId?: string;

  @ApiPropertyOptional({ description: 'Ruta nueva grabada desde la app (alternativa a routeId)' })
  @IsOptional()
  @ValidateNested()
  @Type(() => InlineRouteDto)
  inlineRoute?: InlineRouteDto;
}
