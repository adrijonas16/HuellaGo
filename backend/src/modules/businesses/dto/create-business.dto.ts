import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessCategory } from '@prisma/client';

export class CreateBusinessDto {
  @ApiProperty({ example: 'Veterinaria Patitas' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ enum: BusinessCategory })
  @IsEnum(BusinessCategory)
  category: BusinessCategory;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiProperty({ example: 'Av. Ejercito 100, Yanahuara' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Arequipa' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiPropertyOptional({ example: 'Yanahuara' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ example: -16.3989 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -71.535 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is24Hours?: boolean;
}
