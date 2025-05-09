import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';
import { Exclude } from 'class-transformer';
import bcrypt from 'bcryptjs';
import { config } from '@/config/config.service';
import { AUTH_VERSION_CONST } from '@/modules/users/constants/user.constant';
import { JobEntity } from '@/modules/jobs/entities/job.entity';
import { NotificationEntity } from '@/modules/notifications/entities/notification.entity';
import { SkillEntity } from '@/modules/skills/entities/skill.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'username', unique: true, nullable: false })
  username: string;

  @Column({ name: 'password', nullable: false })
  @Exclude()
  password: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'headline', nullable: true })
  headline: string;

  @Column({ name: 'location', type: 'text', nullable: true })
  location: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ name: 'about_me', type: 'text', nullable: true })
  aboutMe: string;

  @Column({ name: 'auth_version', type: 'bigint', nullable: true, default: 0 })
  @Exclude()
  authVersion: number;

  @ManyToMany(() => JobEntity, (job) => job.users, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  jobs: JobEntity[];

  @OneToMany(() => NotificationEntity, (noti) => noti.user, {
    cascade: ['insert', 'update'],
  })
  notifications: NotificationEntity[];

  @OneToMany(() => SkillEntity, (skill) => skill.user, {
    cascade: ['insert', 'update'],
  })
  skills: SkillEntity[];

  refreshAuthVersion(isSave: boolean = false): Promise<this> {
    this.authVersion = Date.now() % AUTH_VERSION_CONST;
    return isSave ? this.save() : Promise.resolve(this);
  }

  setPassword(rawPassword: string): void {
    this.password = bcrypt.hashSync(rawPassword, config.PASSWORD_SALT);
    void this.refreshAuthVersion();
  }

  comparePassword(rawPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, this.password);
  }
}
