import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UploadPhotosDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  urls: string[];
}

@ApiTags('Photos')
@Controller('photos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post('walk/:walkId')
  @ApiOperation({ summary: 'Subir fotos a un paseo' })
  uploadToWalk(@Param('walkId') walkId: string, @Body() dto: UploadPhotosDto) {
    return this.photosService.uploadToWalk(walkId, dto.urls);
  }

  @Post('event/:eventId')
  @ApiOperation({ summary: 'Subir fotos a un evento' })
  uploadToEvent(
    @Param('eventId') eventId: string,
    @Body() dto: UploadPhotosDto,
  ) {
    return this.photosService.uploadToEvent(eventId, dto.urls);
  }

  @Post('pet/:petId')
  @ApiOperation({ summary: 'Subir fotos a una mascota' })
  uploadToPet(@Param('petId') petId: string, @Body() dto: UploadPhotosDto) {
    return this.photosService.uploadToPet(petId, dto.urls);
  }

  @Get('walk/:walkId')
  @ApiOperation({ summary: 'Fotos de un paseo' })
  findByWalk(@Param('walkId') walkId: string) {
    return this.photosService.findByWalk(walkId);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Fotos de un evento' })
  findByEvent(@Param('eventId') eventId: string) {
    return this.photosService.findByEvent(eventId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar foto' })
  remove(@Param('id') id: string) {
    return this.photosService.remove(id);
  }
}
