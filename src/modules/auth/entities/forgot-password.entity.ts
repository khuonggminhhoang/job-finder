// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { BaseEntity } from '@/base/model/model.entity';
// import { UserEntity } from '@/modules/users/entities/user.entity';

// @Entity('forgot-password')
// export class ForgotPasswordEntity extends BaseEntity {
//   @Column()
//   token: string;

//   @Column({ type: 'timestamp' })
//   expireAt: Date;

//   @Column({ type: 'boolean', name: 'is_expired', default: false })
//   isExpired: boolean;

//   @Column({ name: 'user_id' })
//   userId: number;

//   @ManyToOne(() => UserEntity, (user) => user.forgotPasswords, {
//     cascade: ['insert', 'update'],
//   })
//   @JoinColumn({ name: 'user_id' })
//   user: UserEntity;

//   async setToken(token: string) {
//     this.token = token;
//     await this.save();
//   }
// }
