import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export const CONTACT_SUBJECTS = [
  'Consulta general',
  'Soporte técnico',
  'Registrar negocio',
  'Reportar problema',
  'Alianzas comerciales',
  'Prensa',
  'Privacidad y datos personales',
  'Otro',
] as const;

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateContactDto {
  @ApiProperty({ example: 'María García' })
  @Transform(trim)
  @IsString()
  @MinLength(2, { message: 'Escribe tu nombre (mínimo 2 letras)' })
  @MaxLength(80, { message: 'El nombre puede tener hasta 80 caracteres' })
  name: string;

  @ApiProperty({ example: 'maria@correo.com' })
  @Transform(trim)
  @IsEmail(
    {},
    { message: 'Escribe un email válido, por ejemplo luna@correo.com' },
  )
  @MaxLength(120)
  email: string;

  @ApiProperty({ enum: CONTACT_SUBJECTS })
  @IsIn(CONTACT_SUBJECTS, { message: 'Elige un asunto de la lista' })
  subject: string;

  @ApiProperty({ example: 'Quisiera registrar mi veterinaria.' })
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'Escribe tu mensaje' })
  @MinLength(20, { message: 'Cuéntanos un poco más (mínimo 20 caracteres)' })
  @MaxLength(2000, { message: 'El mensaje puede tener hasta 2000 caracteres' })
  message: string;

  /** Trampa para bots: un campo oculto que las personas dejan vacío. */
  @ApiPropertyOptional({ description: 'Debe quedar vacío' })
  @IsOptional()
  @IsString()
  website?: string;

  /** Milisegundos entre que se mostró el formulario y el envío. */
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  elapsedMs?: number;
}
