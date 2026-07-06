import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async create(userId: string, type: string, title: string, body: string, data?: object) {
    return this.notificationsRepository.create({
      type,
      title,
      body,
      data: data ?? undefined,
      user: { connect: { id: userId } },
    });
  }

  async findByUser(userId: string, page = 1, limit = 20) {
    return this.notificationsRepository.findByUser(
      userId,
      (page - 1) * limit,
      limit,
    );
  }

  async markAsRead(id: string) {
    return this.notificationsRepository.markAsRead(id);
  }

  async markAllAsRead(userId: string) {
    return this.notificationsRepository.markAllAsRead(userId);
  }

  async countUnread(userId: string) {
    return this.notificationsRepository.countUnread(userId);
  }
}
