import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WalksService } from './walks.service';
import { StartWalkDto } from './dto/start-walk.dto';
import { FinishWalkDto } from './dto/finish-walk.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';

@ApiTags('Walks')
@Controller('walks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WalksController {
  constructor(private walksService: WalksService) {}

  @Post('start')
  @ApiOperation({ summary: 'Iniciar un paseo' })
  start(@CurrentUser('id') userId: string, @Body() dto: StartWalkDto) {
    return this.walksService.start(userId, dto);
  }

  @Patch(':id/finish')
  @ApiOperation({ summary: 'Finalizar un paseo' })
  finish(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: FinishWalkDto,
  ) {
    return this.walksService.finish(userId, id, dto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Historial de paseos' })
  history(
    @CurrentUser('id') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.walksService.findByUser(userId, page, limit);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estadisticas de paseos' })
  stats(@CurrentUser('id') userId: string) {
    return this.walksService.getStats(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de un paseo (Huella)' })
  findOne(@Param('id') id: string) {
    return this.walksService.findOne(id);
  }
}
