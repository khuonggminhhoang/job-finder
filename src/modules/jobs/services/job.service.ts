/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, MoreThanOrEqual } from 'typeorm';
import { JobEntity } from '../entities/job.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';
import { QuerySpecificationDto } from '@/base/api/dtos/query-specification.dto';
import { subDays } from 'date-fns';
import { JOB_STATUS } from '@/modules/jobs/enums/job.enum';

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
    queryDto?: QuerySpecificationDto,
  ): Promise<SelectQueryBuilder<JobEntity>> {
    queryBuilder
      .leftJoinAndSelect(`${this.alias}.company`, 'companies')
      .leftJoinAndSelect(`${this.alias}.category`, 'categories');
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
