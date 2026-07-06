import { Module } from '@nestjs/common';
import { WalksController } from './walks.controller';
import { WalksService } from './walks.service';
import { WalksRepository } from './walks.repository';
import { RoutesModule } from '../routes/routes.module';

@Module({
  imports: [RoutesModule],
  controllers: [WalksController],
  providers: [WalksService, WalksRepository],
  exports: [WalksService],
})
export class WalksModule {}
