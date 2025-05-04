import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/base/model/model.entity';
import { ImageEntity } from '@/modules/images/entities/image.entity';
import { SavingEntity } from '@/modules/saving/entities/saving.entity';
import { OneToMany } from 'typeorm';
import { CurrencyEntity } from '@/modules/currencies/entities/currency.entity';
import { AccountEntity } from '@/modules/accounts/entities/account.entity';
import { TransactionEntity } from '@/modules/transactions/entities/transaction.entity';
import { BudgetEntity } from '@/modules/budgets/entities/budget.entity';
import bcrypt from 'bcryptjs';
import { config } from '@/config/config.service';
import { Exclude } from 'class-transformer';
import { AUTH_VERSION_CONST } from '@/modules/users/constants/user.constant';
import { ForgotPasswordEntity } from '@/modules/auth/entities/forgot-password.entity';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'first_name', comment: 'Tên', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', comment: 'Họ đệm', nullable: true })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password?: string;

  @Column({ name: 'image_id', nullable: true })
  imageId?: number;

  @Column({ name: 'google_id', nullable: true })
  googleId?: string;

  @Column({ name: 'currency_id', nullable: true })
  currencyId: number;

  @Column({ name: 'auth_version', type: 'bigint', nullable: true, default: 0 })
  @Exclude()
  authVersion: number;

  // relations
  @OneToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.user, {
    nullable: true,
  })
  category?: CategoryEntity[];

  @ManyToOne(() => ImageEntity, {
    nullable: true,
    eager: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'image_id' })
  image?: ImageEntity;

  @ManyToOne(() => CurrencyEntity, { nullable: true })
  @JoinColumn({ name: 'currency_id' })
  currency?: CurrencyEntity;

  @OneToMany(() => SavingEntity, (savingEntity) => savingEntity.user, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  savings?: SavingEntity[];

  @OneToMany(() => AccountEntity, (accountEntity) => accountEntity.user, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  accounts?: AccountEntity[];

  @OneToMany(
    () => TransactionEntity,
    (transactionEntity) => transactionEntity.user,
    { cascade: ['insert', 'update'], nullable: true },
  )
  transactions?: TransactionEntity[];

  @OneToMany(() => BudgetEntity, (budgetEntity) => budgetEntity.user, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  budgets?: BudgetEntity[];

  @OneToMany(
    () => ForgotPasswordEntity,
    (forgotPassword) => forgotPassword.user,
    {
      cascade: ['insert', 'update'],
      nullable: true,
    },
  )
  forgotPasswords?: ForgotPasswordEntity[];

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
