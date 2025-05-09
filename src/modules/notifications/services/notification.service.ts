import { Inject, Injectable } from '@nestjs/common';
import { NotificationEntity } from '../entities/notification.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { QuerySpecificationDto } from '@/base/api/dtos/query-specification.dto';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Injectable()
export class NotificationService extends BaseCrudService<NotificationEntity> {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @Inject(REQUEST)
    private readonly req: Request,
  ) {
    super(NotificationEntity, 'notifications', notificationRepository);
  }

  getUser() {
    return this.req.user as UserEntity;
  }

  protected async actionPreList(
    queryBuilder: SelectQueryBuilder<NotificationEntity>,
    queryDto?: QuerySpecificationDto,
  ): Promise<SelectQueryBuilder<NotificationEntity>> {
    const user = this.getUser();
    queryBuilder = queryBuilder.andWhere(`${this.alias}.userId = :userId`, {
      userId: user.id,
    });
    return super.actionPreList(queryBuilder, queryDto);
  }

  async markAsRead(id: number) {
    const notification = await this.getOneBy({ id });
    if (notification) {
      notification.isRead = true;
      return notification.save();
    }
  }
}
