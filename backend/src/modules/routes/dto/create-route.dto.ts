import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RouteDifficulty } from '@prisma/client';

export class WaypointDto {
  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}

export class CreateRouteDto {
  @ApiProperty({ example: 'Ruta del Parque Selva Alegre' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty()
  @IsNumber()
  startLat: number;

  @ApiProperty()
  @IsNumber()
  startLng: number;

  @ApiProperty()
  @IsNumber()
  endLat: number;

  @ApiProperty()
  @IsNumber()
  endLng: number;

  @ApiProperty({ type: [WaypointDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WaypointDto)
  waypoints: WaypointDto[];

  @ApiProperty({ description: 'Distancia en km' })
  @IsNumber()
  distance: number;

  @ApiProperty({ description: 'Duracion estimada en minutos' })
  @IsNumber()
  duration: number;

  @ApiPropertyOptional({ enum: RouteDifficulty })
  @IsOptional()
  @IsEnum(RouteDifficulty)
  difficulty?: RouteDifficulty;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

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
