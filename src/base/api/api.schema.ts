/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';

export const defaultPayload = {
  success: true,
  statusCode: HttpStatus.OK,
  message: '',
  error: '',
  data: null,
  meta: null,
};

export abstract class Payload<T> {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: T | null;
  error?: string;
  meta?: null;

  protected constructor(payload: Payload<T>) {
    _.assign({}, payload);
  }
}

export class PaginationMeta {
  @ApiProperty()
  currentPage?: number;

  @ApiProperty()
  totalItems?: number;

  @ApiProperty()
  totalPages?: number;

  [s: string]: any;

  constructor(query: Record<string, any>, partial: PaginationMeta) {
    _.assign(this, {
      ...partial,
      currentPage: query.pageNumber,
      pageSize: query.pageSize,
      totalPages: _.ceil(partial.totalItems / query.pageSize),
    });
  }
}

export class PaginationResult<TData> {
  @ApiProperty()
  data: TData[];

  @ApiProperty()
  meta: PaginationMeta;

  constructor(
    query: Record<string, any>,
    partial: PaginationMeta,
    data: TData[],
  ) {
    this.data = data;
    this.meta = new PaginationMeta(query, partial);
  }
}
