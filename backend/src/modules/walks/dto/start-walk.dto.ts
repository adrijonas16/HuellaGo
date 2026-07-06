import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartWalkDto {
  @ApiProperty({ description: 'ID de la mascota' })
  @IsString()
  @IsNotEmpty()
  petId: string;

  @ApiPropertyOptional({ description: 'ID de la ruta a seguir' })
  @IsOptional()
  @IsString()
  routeId?: string;
}
