/* eslint-disable @typescript-eslint/require-await,@typescript-eslint/no-unused-vars */
import { CreateService } from '@/base/api/services/create.service';
import { BaseEntity } from '@/base/model/model.entity';
import { FindOptionsWhere } from 'typeorm';
import { IQueryOption } from '@/base/api/interfaces/option.interface';

export class UpdateService<E extends BaseEntity> extends CreateService<E> {
  protected async actionPreUpdateOne<T>(
    dto: T,
    options: IQueryOption,
  ): Promise<T> {
    return dto;
  }

  protected async actionPostUpdateOne(
    record: E,
    options: IQueryOption,
  ): Promise<E> {
    return record;
  }

  async updateOneBy<T>(
    where: FindOptionsWhere<E>,
    dto: T,
    options?: IQueryOption,
  ) {
    const record = await this.getOneBy(where, options);
    if (!record) return;
    const updateDto = await this.actionPreUpdateOne(dto, options);
    Object.assign(record, updateDto);
    const ret = await record.save();
    return this.actionPostUpdateOne(ret, options);
  }
}
