import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AttendEventDto } from './dto/attend-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un evento' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateEventDto) {
    return this.eventsService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar eventos' })
  findAll(@Query() query: PaginationDto) {
    return this.eventsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de un evento' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar evento' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ) {
    return this.eventsService.update(userId, id, dto);
  }

  @Post(':id/attend')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Inscribirse a un evento' })
  attend(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: AttendEventDto,
  ) {
    return this.eventsService.attend(id, userId, dto.petId);
  }

  @Delete(':id/attend')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancelar inscripcion' })
  cancelAttendance(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: AttendEventDto,
  ) {
    return this.eventsService.cancelAttendance(id, userId, dto.petId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar evento' })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.eventsService.remove(userId, id);
  }
}
