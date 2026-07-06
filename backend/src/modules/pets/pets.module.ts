import { Module } from '@nestjs/common';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PetsRepository } from './pets.repository';

@Module({
  controllers: [PetsController],
  providers: [PetsService, PetsRepository],
  exports: [PetsService],
})
export class PetsModule {}
