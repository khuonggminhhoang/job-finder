import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';
import { CompanyEntity } from '@/modules/companies/entities/company.entity';
import { JobCategoryEntity } from '@/modules/job-categories/entities/job-category.entity';
import {
  JOB_STATUS,
  JOB_TYPE,
  SALARY_PERIOD,
} from '@/modules/jobs/enums/job.enum';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @Column({ name: 'company_id', nullable: false })
  @Index()
  companyId: number;

  @Column({ name: 'category_id', nullable: true })
  @Index()
  categoryId: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'location', nullable: false })
  @Index()
  location: string;

  @Column({
    name: 'salary_min',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  salaryMin: number;

  @Column({
    name: 'salary_max',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  salaryMax: number;

  @Column({
    name: 'salary_period',
    type: 'enum',
    enum: SALARY_PERIOD,
    nullable: true,
  })
  salaryPeriod: SALARY_PERIOD;

  @Column({
    name: 'job_type',
    type: 'enum',
    enum: JOB_TYPE,
    nullable: false,
  })
  jobType: JOB_TYPE;

  @Column({ name: 'is_top_job', type: 'boolean', default: false })
  isTopJob: boolean;

  @Column({
    name: 'status',
    type: 'enum',
    enum: JOB_STATUS,
    default: JOB_STATUS.OPEN,
  })
  @Index()
  status: JOB_STATUS;

  @ManyToOne(() => CompanyEntity)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => JobCategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: JobCategoryEntity;

  @ManyToMany(() => UserEntity, (user) => user.jobs)
  @JoinTable({ name: 'saved_jobs' })
  users: UserEntity[];
}
