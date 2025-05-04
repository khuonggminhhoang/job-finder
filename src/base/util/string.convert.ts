import * as _ from 'lodash';

export function unidecode(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/ơ/g, 'o')
    .replace(/Ơ/g, 'O')
    .replace(/ư/g, 'u')
    .replace(/Ư/g, 'U')
    .replace(/ă/g, 'a')
    .replace(/Ă/g, 'A')
    .replace(/â/g, 'a')
    .replace(/Â/g, 'A')
    .replace(/ê/g, 'e')
    .replace(/Ê/g, 'E')
    .replace(/ô/g, 'o')
    .replace(/Ô/g, 'O')
    .replace(/đ/g, 'd');
}

export function slugify(str: string): string {
  return _.snakeCase(unidecode(str).trim().toString());
}
