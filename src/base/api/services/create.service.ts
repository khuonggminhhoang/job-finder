/* eslint-disable @typescript-eslint/require-await,@typescript-eslint/no-unused-vars */
import { DeepPartial } from 'typeorm';
import { IQueryOption } from '@/base/api/interfaces/option.interface';
import { BaseEntity } from '@/base/model/model.entity';
import { ListService } from '@/base/api/services/list.service';

export class CreateService<E extends BaseEntity> extends ListService<E> {
  protected async actionPreCreate<T>(
    dto: T,
    options?: IQueryOption,
  ): Promise<T> {
    return dto;
  }

  protected async actionPostCreate(
    record: E,
    options?: IQueryOption,
  ): Promise<E> {
    return record;
  }

  async create<T extends DeepPartial<E>>(
    dto: T,
    options?: IQueryOption,
  ): Promise<E> {
    const createDto: DeepPartial<E> = await this.actionPreCreate<T>(
      dto,
      options,
    );
    let record = await this.repository.create(createDto).save();
    record = await this.actionPostCreate(record, options);
    return record;
  }
}
