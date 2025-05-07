import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';
import { JobEntity } from '@/modules/jobs/entities/job.entity';

@Entity('job_categories')
export class JobCategoryEntity extends BaseEntity {
  @Column({ name: 'name', unique: true, nullable: false })
  name: string;

  @Column({ name: 'icon_url', nullable: true })
  iconUrl: string;

  @OneToMany(() => JobEntity, (job) => job.category)
  jobs: JobEntity[];
}
