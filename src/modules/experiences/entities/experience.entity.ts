import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Entity('experiences')
export class ExperienceEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  title: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.experiences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
