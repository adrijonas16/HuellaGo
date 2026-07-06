import { Injectable } from '@nestjs/common';
import { PhotosRepository } from './photos.repository';

@Injectable()
export class PhotosService {
  constructor(private photosRepository: PhotosRepository) {}

  async uploadToWalk(walkId: string, urls: string[]) {
    const data = urls.map((url) => ({ url, walkId }));
    return this.photosRepository.createMany(data);
  }

  async uploadToEvent(eventId: string, urls: string[]) {
    const data = urls.map((url) => ({ url, eventId }));
    return this.photosRepository.createMany(data);
  }

  async uploadToPet(petId: string, urls: string[]) {
    const data = urls.map((url) => ({ url, petId }));
    return this.photosRepository.createMany(data);
  }

  async findByWalk(walkId: string) {
    return this.photosRepository.findByWalk(walkId);
  }

  async findByEvent(eventId: string) {
    return this.photosRepository.findByEvent(eventId);
  }

  async findByPet(petId: string) {
    return this.photosRepository.findByPet(petId);
  }

  async remove(id: string) {
    return this.photosRepository.delete(id);
  }
}
