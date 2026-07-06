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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators';
import { PaginationDto } from '@common/dto/pagination.dto';

@ApiTags('Routes')
@Controller('routes')
export class RoutesController {
  constructor(private routesService: RoutesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una ruta' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateRouteDto) {
    return this.routesService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar rutas' })
  findAll(@Query() query: PaginationDto) {
    return this.routesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de una ruta' })
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar ruta' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateRouteDto,
  ) {
    return this.routesService.update(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar ruta' })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.routesService.remove(userId, id);
  }
}
