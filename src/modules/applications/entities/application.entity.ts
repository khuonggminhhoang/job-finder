import { Column, Entity, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { JobEntity } from '@/modules/jobs/entities/job.entity';
import { APPLICATION_STATUS } from '@/modules/applications/enums/application.enum';

@Entity('applications')
export class ApplicationEntity extends BaseEntity {
  @Column({ name: 'user_id', nullable: false })
  @Index()
  userId: number;

  @Column({ name: 'job_id', nullable: false })
  @Index()
  jobId: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: APPLICATION_STATUS,
    default: APPLICATION_STATUS.SUBMITTED,
    nullable: false,
  })
  @Index()
  status: APPLICATION_STATUS;

  @Column({ name: 'resume_url', nullable: true })
  resumeUrl: string;

  @Column({ name: 'cover_letter', type: 'text', nullable: true })
  coverLetter: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => JobEntity)
  @JoinColumn({ name: 'job_id' })
  job: JobEntity;
}
