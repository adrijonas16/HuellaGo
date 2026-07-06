import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AttendEventDto {
  @ApiProperty({ description: 'ID de la mascota que asistira' })
  @IsString()
  @IsNotEmpty()
  petId: string;
}
