import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators';

@ApiTags('Favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar mis favoritos' })
  findAll(@CurrentUser('id') userId: string) {
    return this.favoritesService.findByUser(userId);
  }

  @Post('business/:businessId')
  @ApiOperation({ summary: 'Guardar negocio en favoritos' })
  addBusiness(
    @CurrentUser('id') userId: string,
    @Param('businessId') businessId: string,
  ) {
    return this.favoritesService.addBusiness(userId, businessId);
  }

  @Post('event/:eventId')
  @ApiOperation({ summary: 'Guardar evento en favoritos' })
  addEvent(
    @CurrentUser('id') userId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.favoritesService.addEvent(userId, eventId);
  }

  @Post('route/:routeId')
  @ApiOperation({ summary: 'Guardar ruta en favoritos' })
  addRoute(
    @CurrentUser('id') userId: string,
    @Param('routeId') routeId: string,
  ) {
    return this.favoritesService.addRoute(userId, routeId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Quitar de favoritos' })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.favoritesService.remove(userId, id);
  }
}
