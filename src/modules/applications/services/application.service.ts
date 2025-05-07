import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ApplicationEntity } from '../entities/application.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { QuerySpecificationDto } from '@/base/api/dtos/query-specification.dto';
import { CreateApplicationDto } from '../dtos/application.dto';

@Injectable()
export class ApplicationService extends BaseCrudService<ApplicationEntity> {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
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
    return this.applicationRepository.save(application);
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
