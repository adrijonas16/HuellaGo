import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { RoutesRepository } from './routes.repository';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, RoutesRepository],
  exports: [RoutesService, RoutesRepository],
})
export class RoutesModule {}
