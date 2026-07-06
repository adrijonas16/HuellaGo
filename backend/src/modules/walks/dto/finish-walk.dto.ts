import {
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  SecurityLevel,
  CleanlinessLevel,
  ShadeLevel,
  TrafficLevel,
} from '@prisma/client';

class TrackPointDto {
  lat: number;
  lng: number;
  timestamp: string;
}

export class FinishWalkDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  distance?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackPointDto)
  trackPoints?: TrackPointDto[];

  @ApiPropertyOptional({ minimum: 1, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ enum: SecurityLevel })
  @IsOptional()
  @IsEnum(SecurityLevel)
  security?: SecurityLevel;

  @ApiPropertyOptional({ enum: CleanlinessLevel })
  @IsOptional()
  @IsEnum(CleanlinessLevel)
  cleanliness?: CleanlinessLevel;

  @ApiPropertyOptional({ enum: ShadeLevel })
  @IsOptional()
  @IsEnum(ShadeLevel)
  shade?: ShadeLevel;

  @ApiPropertyOptional({ enum: TrafficLevel })
  @IsOptional()
  @IsEnum(TrafficLevel)
  traffic?: TrafficLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasWater?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  hasDogs?: boolean;
}
