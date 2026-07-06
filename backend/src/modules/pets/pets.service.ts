import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PetsRepository } from './pets.repository';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(private petsRepository: PetsRepository) {}

  async create(userId: string, dto: CreatePetDto) {
    return this.petsRepository.create({
      ...dto,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      user: { connect: { id: userId } },
    });
  }

  async findByUser(userId: string) {
    return this.petsRepository.findByUserId(userId);
  }

  async findOne(id: string) {
    const pet = await this.petsRepository.findById(id);
    if (!pet) throw new NotFoundException('Mascota no encontrada');
    return pet;
  }

  async update(userId: string, petId: string, dto: UpdatePetDto) {
    const pet = await this.findOne(petId);
    if (pet.userId !== userId) {
      throw new ForbiddenException('No tienes permiso para editar esta mascota');
    }
    return this.petsRepository.update(petId, {
      ...dto,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
    });
  }

  async remove(userId: string, petId: string) {
    const pet = await this.findOne(petId);
    if (pet.userId !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar esta mascota',
      );
    }
    return this.petsRepository.delete(petId);
  }
}
