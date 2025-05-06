import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';

@Entity('job_categories')
export class JobCategoryEntity extends BaseEntity {
  @Column({ name: 'name', unique: true, nullable: false })
  name: string;

  @Column({ name: 'icon_url', nullable: true })
  iconUrl: string;
}
