import {
  IsArray,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';
import { config } from '@/config/config.service';
import { Transform } from 'class-transformer';
import {
  ApiHideProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { TransformSort, Trim } from '@/base/validators/validator.transformer';

export class PaginationSpecificationDto {
  @ApiPropertyOptional({ example: config.PAGINATION_PAGE_SIZE })
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => value && parseInt(String(value)))
  @Max(config.PAGINATION_PAGE_SIZE)
  pageSize?: number = config.PAGINATION_PAGE_SIZE;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => value && parseInt(String(value)))
  pageNumber?: number = 1;

  @ApiHideProperty()
  disablePagination?: boolean;
}

export interface ISort {
  [key: string]: 'DESC' | 'ASC';
}

export class SortSpecificationDto {
  @ApiPropertyOptional({
    type: String,
    example: 'id, -createdAt',
  })
  @IsOptional()
  @Trim()
  @TransformSort()
  sort?: ISort;
}

export class SearchSpecificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }: { value: string | string[] }) =>
    Array.isArray(value) ? value : [value],
  )
  searchFields?: string[];
}

export class QuerySpecificationDto<
  TFilter = Record<string, any>,
> extends IntersectionType(
  PaginationSpecificationDto,
  SortSpecificationDto,
  SearchSpecificationDto,
) {
  filter?: TFilter;
}
