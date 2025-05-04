/* eslint-disable @typescript-eslint/require-await,@typescript-eslint/no-unused-vars */
import { BaseEntity } from '@/base/model/model.entity';
import {
  DeleteQueryBuilder,
  DeleteResult,
  FindOptionsWhere,
  In,
} from 'typeorm';
import { IQueryOption } from '@/base/api/interfaces/option.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UpdateService } from '@/base/api/services/update.service';
import { EntityId } from 'typeorm/repository/EntityId';

export class DeleteService<E extends BaseEntity> extends UpdateService<E> {
  /* soft delete */
  async softDeleteBy<T>(
    where: FindOptionsWhere<E>,
    dto?: T,
    options?: IQueryOption,
  ) {
    await this.repository.update(where, {
      ...dto,
    } as QueryDeepPartialEntity<E>);
    return this.repository.softDelete(where);
  }

  async softDeleteOneBy<T>(
    where: FindOptionsWhere<E>,
    dto?: T,
    options?: IQueryOption,
  ) {
    await this.updateOneBy(where, dto, options);
    return this.repository.softDelete(where);
  }

  async softDeleteById<T>(id: EntityId, dto?: T, options?: IQueryOption) {
    return this.softDeleteOneBy({ id } as FindOptionsWhere<E>, dto, options);
  }

  /* delete */
  protected async actionPreDelete(
    queryBuilder: DeleteQueryBuilder<E>,
    where?: FindOptionsWhere<E>,
    options?: IQueryOption,
  ): Promise<DeleteQueryBuilder<E>> {
    return queryBuilder;
  }

  protected async actionPostDelete(
    deleteResult: DeleteResult,
    where?: FindOptionsWhere<E>,
    options?: IQueryOption,
  ): Promise<void> {
    /**/
  }

  async deleteBy(where: FindOptionsWhere<E>, options?: IQueryOption) {
    let queryBuilder = this.repository
      .createQueryBuilder(this.alias)
      .delete()
      .where(where);
    queryBuilder = await this.actionPreDelete(queryBuilder, where, options);
    const deleteResult = await queryBuilder.execute();

    if (options?.skipThrow === false && deleteResult.affected === 0) {
      this.getNotFound();
    }
  }

  /* bulk delete */
  async bulkDeleteBy(
    where: FindOptionsWhere<E>,
    options: IQueryOption,
  ): Promise<DeleteResult> {
    return this.repository.delete(where);
  }

  async bulkDeleteByIds(ids: EntityId[], options: IQueryOption) {
    return this.bulkDeleteBy({ id: In(ids) } as FindOptionsWhere<E>, options);
  }
}
