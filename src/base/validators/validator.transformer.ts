import { Transform } from 'class-transformer';
import { ISort } from '@/base/api/dtos/query-specification.dto';

export function Trim() {
  return Transform(({ value }: { value: string }) => value?.toString().trim());
}

export function ToLowerCase() {
  return Transform(({ value }: { value: string }) =>
    value?.toString().toLowerCase(),
  );
}

export function ToUpperCase() {
  return Transform(({ value }: { value: string }) =>
    value?.toString().toUpperCase(),
  );
}

export function TransformBoolean() {
  return Transform(({ value }: { value: boolean | string }) =>
    ['true', 'TRUE', 'True', true].includes(value),
  );
}

export function TransformNumber() {
  return Transform(({ value }: { value: number | string }) => +value);
}

export function TransformDate() {
  return Transform(({ value }: { value: string | Date }) => new Date(value));
}

/**
 * url: http://...?sort=-created_at,id
 * input: -created_at,id
 * output:
 * {
 *   created_at: 'DESC',
 *   id: 'ASC'
 * }
 */
export function TransformSort(sortFields?: string[]) {
  return Transform(({ value }: { value: any }) => {
    if (typeof value !== 'string') return value as ISort;
    const keys = value.replace(/\s+/, '').split(',');
    return keys.reduce((acc, cur) => {
      const key = cur.replace(/^[+-]/, '');
      if (Array.isArray(sortFields) && !sortFields.includes(key)) {
        return acc;
      }

      acc[key] = cur.startsWith('-') ? 'DESC' : 'ASC';
      return acc;
    }, {} as ISort);
  });
}
