/* eslint-disable @typescript-eslint/require-await,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-expressions */
import { GenericService } from '@/base/api/services/generic.service';
import { BaseEntity } from '@/base/model/model.entity';
import { Brackets, FindOptionsWhere, SelectQueryBuilder } from 'typeorm';
import * as _ from 'lodash';
import {
  ISort,
  QuerySpecificationDto,
} from '@/base/api/dtos/query-specification.dto';
import { PaginationResult } from '@/base/api/api.schema';

export class ListService<E extends BaseEntity> extends GenericService<E> {
  protected async actionPreList(
    queryBuilder: SelectQueryBuilder<E>,
    queryDto?: QuerySpecificationDto,
  ): Promise<SelectQueryBuilder<E>> {
    return queryBuilder;
  }

  protected async actionPostList(
    records: E[],
    queryDto?: QuerySpecificationDto,
  ): Promise<E[]> {
    return records;
  }

  async getTotalRows(where?: FindOptionsWhere<E>): Promise<number> {
    const { count }: { count: number } = await this.getQueryBuilder()
      .select('count(*)', 'count')
      .where(where)
      .getRawOne();
    return count;
  }

  protected setPagination(
    queryBuilder: SelectQueryBuilder<E>,
    queryDto: QuerySpecificationDto,
  ): SelectQueryBuilder<E> {
    const {
      pageSize = 20,
      pageNumber = 1,
      disablePagination = false,
    } = queryDto;
    if (disablePagination) {
      return queryBuilder;
    }
    return queryBuilder.take(pageSize).skip(pageSize * (pageNumber - 1));
  }

  protected setSearch(
    queryBuilder: SelectQueryBuilder<E>,
    queryDto: QuerySpecificationDto,
  ): SelectQueryBuilder<E> {
    const { search, searchFields } = queryDto;
    if (search && searchFields.length) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          searchFields.forEach((key) => {
            RegExp(/\.(?=[A-Za-z])/).exec(key)
              ? qb.orWhere(`LOWER(${key}) LIKE LOWER(:search)`, {
                  search: `%${search}%`,
                })
              : qb.orWhere(`LOWER(${this.alias}.${key}) LIKE LOWER(:search)`, {
                  search: `%${search}%`,
                });
          });
        }),
      );
    }
    return queryBuilder;
  }

  protected setSort(
    queryBuilder: SelectQueryBuilder<E>,
    queryDto: QuerySpecificationDto,
  ) {
    const sortObject: ISort = queryDto.sort;
    _.entries(sortObject).forEach(([sortByColumn, sortDirection]) => {
      queryBuilder.addOrderBy(`${this.alias}.${sortByColumn}`, sortDirection);
    });

    return queryBuilder;
  }

  protected async prepareFindAllQuery(
    queryDto: QuerySpecificationDto,
  ): Promise<SelectQueryBuilder<E>> {
    let queryBuilder = this.getQueryBuilder();
    queryBuilder = await this.actionPreList(queryBuilder, queryDto);
    //search
    this.setSearch(queryBuilder, queryDto);
    // pagination
    this.setPagination(queryBuilder, queryDto);
    // sort
    this.setSort(queryBuilder, queryDto);
    return queryBuilder;
  }

  async list(queryDto: QuerySpecificationDto = {}): Promise<E[]> {
    _.assign(queryDto, { disablePagination: true });
    const queryBuilder = await this.prepareFindAllQuery(queryDto);
    const records = await queryBuilder.getMany();
    return await this.actionPostList(records, queryDto);
  }

  async listWithPage(
    queryDto: QuerySpecificationDto = {},
  ): Promise<PaginationResult<E>> {
    const queryBuilder = await this.prepareFindAllQuery(queryDto);
    const [records, totalItems] = await queryBuilder.getManyAndCount();
    const data = await this.actionPostList(records, queryDto);
    return new PaginationResult(queryDto, { totalItems }, data);
  }
}
