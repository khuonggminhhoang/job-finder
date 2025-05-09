import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { SKILL_LEVEL } from '@/modules/skills/enums/skill.enum';

@Entity('skills')
export class SkillEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: SKILL_LEVEL, default: SKILL_LEVEL.BEGINNER })
  level: SKILL_LEVEL;

  @ManyToOne(() => UserEntity, (user) => user.skills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
