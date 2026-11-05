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
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { QueryBusinessDto } from './dto/query-business.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';

@ApiTags('Businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private businessesService: BusinessesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar un negocio' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateBusinessDto) {
    return this.businessesService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar negocios con filtros' })
  findAll(@Query() query: QueryBusinessDto) {
    return this.businessesService.findAll(query);
  }

  @Get('mine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar mis negocios' })
  findMine(@CurrentUser('id') userId: string) {
    return this.businessesService.findByOwner(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalle de un negocio' })
  findOne(@Param('id') id: string) {
    return this.businessesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar negocio' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateBusinessDto,
  ) {
    return this.businessesService.update(userId, id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar negocio' })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.businessesService.remove(userId, id);
  }
}
