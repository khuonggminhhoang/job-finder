import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ApplicationEntity } from '@/modules/applications/entities/application.entity';
import { BaseEntity } from '@/base/model/model.entity';

@Entity('notifications')
export class NotificationEntity extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'application_id' })
  applicationId: number;

  @ManyToOne(() => UserEntity, (user) => user.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ApplicationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application_id' })
  application: ApplicationEntity;
}
