import { BaseEntity } from '@/base/model/model.entity';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Payload } from '@/base/api/api.schema';
import * as exc from '@/base/exceptions/exception.resolve';
import { STATUS_CODE } from '@/shared/constants/satus-code.constant';
import { HttpStatus } from '@nestjs/common';
import { IQueryOption } from '@/base/api/interfaces/option.interface';
import { EntityId } from 'typeorm/repository/EntityId';

export class GenericService<E extends BaseEntity> {
  constructor(
    protected readonly model: any,
    protected readonly alias: string,
    protected readonly repository: Repository<E>,
  ) {}

  getQueryBuilder(): SelectQueryBuilder<E> {
    return this.repository.createQueryBuilder(this.alias);
  }

  // handle
  protected getName() {
    return this.alias.replace(/^\w/, (c) => c.toUpperCase());
  }

  getNotFound<TData>(payload?: Payload<TData>) {
    throw new exc.NotFoundException({
      message: this.getName() + ' not found',
      error: this.alias.toUpperCase() + '.' + STATUS_CODE[HttpStatus.NOT_FOUND],
      ...payload,
    });
  }

  recordOrNotFound<T = any>(record: T, options: IQueryOption) {
    if (!record && !options?.skipThrow) {
      return this.getNotFound();
    }
    return record;
  }

  recordsOrNotFound<T = any>(records: T[], options: IQueryOption) {
    if (!records.length && !options?.skipThrow) {
      return this.getNotFound();
    }
    return records;
  }

  /* retrieve data */
  async getById(id: EntityId, options?: IQueryOption) {
    return this.getOneBy({ id: id } as FindOptionsWhere<E>, options);
  }

  // shouldn't relation
  async findOneBy(where: FindOptionsWhere<E>) {
    return this.repository.findOneBy(where);
  }

  // shouldn't relation
  async getOneBy(where: FindOptionsWhere<E>, options?: IQueryOption) {
    const record = await this.findOneBy(where);
    return this.recordOrNotFound(record, options);
  }

  // should relation
  async getOne(where: FindOneOptions<E>, options?: IQueryOption) {
    const record = await this.repository.findOne(where);
    return this.recordOrNotFound(record, options);
  }

  async getAll(where?: FindManyOptions<E>, options?: IQueryOption) {
    const records = await this.repository.find({
      ...where,
      relations: options?.relations || [],
    });
    return this.recordsOrNotFound(records, options);
  }
}
