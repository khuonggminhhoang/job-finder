import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { QuerySpecificationDto } from '@/base/api/dtos/query-specification.dto';
import { CreateApplicationDto } from '@/modules/applications/dtos/application.dto';
import { NotificationService } from '@/modules/notifications/services/notification.service';
import { NotificationEntity } from '@/modules/notifications/entities/notification.entity';

@Injectable()
export class ApplicationService extends BaseCrudService<ApplicationEntity> {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {
    super(ApplicationEntity, 'applications', applicationRepository);
  }

  protected async actionPreList(
    queryBuilder: SelectQueryBuilder<ApplicationEntity>,
    queryDto?: QuerySpecificationDto,
  ): Promise<SelectQueryBuilder<ApplicationEntity>> {
    queryBuilder
      .leftJoinAndSelect(`${this.alias}.user`, 'users')
      .leftJoinAndSelect(`${this.alias}.job`, 'jobs')
      .leftJoinAndSelect('jobs.company', 'companies')
      .leftJoinAndSelect('jobs.category', 'categories');
    return super.actionPreList(queryBuilder, queryDto);
  }

  async createApplication(userId: number, dto: CreateApplicationDto) {
    const application = this.applicationRepository.create({
      ...dto,
      userId,
    });
    const aplc = await this.applicationRepository.save(application);
    const apply = await this.applicationRepository.findOne({
      where: { id: aplc.id },
      relations: ['job', 'job.company'],
    });
    if (apply) {
      const noti = this.notificationRepository.create({
        userId,
        applicationId: apply.id,
        title: apply.job.company.name,
        message: `Bạn đã apply vào vị trí ${apply.job.title} của công ty ${apply.job.company.name}. Vui lòng chờ phản hồi từ nhà tuyển dụng sau ít nhất 3 - 5 ngày`,
      });
      await noti.save();
    }
    return apply;
  }

  async getUserApplications(userId: number) {
    return this.applicationRepository.find({
      where: { userId },
      relations: ['job', 'job.company', 'job.category'],
      order: { createdAt: 'DESC' },
    });
  }

  async getJobApplications(jobId: number) {
    return this.applicationRepository.find({
      where: { jobId },
      relations: ['user', 'job'],
      order: { createdAt: 'DESC' },
    });
  }
}
