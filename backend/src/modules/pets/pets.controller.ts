import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators';

@ApiTags('Pets')
@Controller('pets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PetsController {
  constructor(private petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una mascota' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreatePetDto) {
    return this.petsService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar mis mascotas' })
  findMyPets(@CurrentUser('id') userId: string) {
    return this.petsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de una mascota' })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar mascota' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePetDto,
  ) {
    return this.petsService.update(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar mascota' })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.petsService.remove(userId, id);
  }
}
