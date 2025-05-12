/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, MoreThanOrEqual } from 'typeorm';
import { JobEntity } from '../entities/job.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { subDays } from 'date-fns';
import { JOB_STATUS } from '@/modules/jobs/enums/job.enum';
import { FilterJobDto } from '@/modules/jobs/dtos/job.dto';

@Injectable()
export class JobService extends BaseCrudService<JobEntity> {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {
    super(JobEntity, 'jobs', jobRepository);
  }

  protected async actionPreList(
    queryBuilder: SelectQueryBuilder<JobEntity>,
    queryDto?: FilterJobDto,
  ): Promise<SelectQueryBuilder<JobEntity>> {
    queryBuilder
      .leftJoinAndSelect(`${this.alias}.company`, 'companies')
      .leftJoinAndSelect(`${this.alias}.category`, 'categories');

    queryDto.location &&
      queryBuilder.andWhere(
        `LOWER(${this.alias}.location) LIKE LOWER(:location)`,
        {
          location: `%${queryDto.location.trim()}%`,
        },
      );

    queryDto.jobCategoryId &&
      queryBuilder.andWhere(`${this.alias}.categoryId = :categoryId`, {
        categoryId: queryDto.jobCategoryId,
      });

    queryDto.salaryGte &&
      queryBuilder.andWhere(`${this.alias}.salaryMax >= :salaryGte`, {
        salaryGte: queryDto.salaryGte,
      });

    queryDto.salaryLte &&
      queryBuilder.andWhere(`${this.alias}.salaryMax <= :salaryLte`, {
        salaryLte: queryDto.salaryLte,
      });

    return super.actionPreList(queryBuilder, queryDto);
  }

  async getNewJobs() {
    const threeDaysAgo = subDays(new Date(), 3);

    return this.jobRepository.find({
      where: {
        createdAt: MoreThanOrEqual(threeDaysAgo),
        status: JOB_STATUS.OPEN,
      },
      relations: ['company', 'category'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
