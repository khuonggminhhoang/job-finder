import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobCategoryEntity } from '../entities/job-category.entity';
import { BaseCrudService } from '@/base/api/services/base-crud.service';

@Injectable()
export class JobCategoryService extends BaseCrudService<JobCategoryEntity> {
  constructor(
    @InjectRepository(JobCategoryEntity)
    private readonly jobCategoryRepository: Repository<JobCategoryEntity>,
  ) {
    super(JobCategoryEntity, 'job_categories', jobCategoryRepository);
  }
}
