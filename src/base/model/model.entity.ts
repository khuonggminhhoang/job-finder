import {
  BaseEntity as OrmBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends OrmBaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id entity' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: 'Ngày khởi tạo',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: true,
    comment: 'Ngày cập nhật',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
    comment: 'Ngày xóa',
  })
  deletedAt: Date;
}
