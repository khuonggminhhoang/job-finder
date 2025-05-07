import * as path from 'node:path';
import { randomAlphabet } from '@/base/util/function';
import { slugify } from '@/base/util/string.convert';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { Request } from 'express';
import { BadRequestException } from '@/base/exceptions';
import { config } from '@/config/config.service';
import { mergeRegex } from '@/base/util/data-type';

export const UPLOAD_IMG_EXTNAME = /(jpg|jpeg|png|gif|bmp|tif|tiff|ico|svg)$/isu;
export const UPLOAD_PDF_EXTNAME = /(pdf|html|xml)$/isu;
export const UPLOAD_EXCEL_EXTNAME = /(excel|csv|sheet|xls)$/isu;
export const UPLOAD_MS_OFFICE_EXTNAME =
  /(excel|sheet|xls|powerpoint|presentation|word|document)$/isu;
export const UPLOAD_ALL_EXTNAME = mergeRegex(
  UPLOAD_IMG_EXTNAME,
  UPLOAD_PDF_EXTNAME,
  UPLOAD_EXCEL_EXTNAME,
  UPLOAD_MS_OFFICE_EXTNAME,
);

export const uniqueFileName = (originalName: string) => {
  const { name, ext } = path.parse(originalName);
  return (
    [new Date().getTime(), randomAlphabet(8), slugify(name)].join('-') + ext
  );
};

export const fileFilter =
  (mimetypes: RegExp = UPLOAD_IMG_EXTNAME) =>
  (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.mimetype.match(mimetypes)) {
      return callback(
        new BadRequestException({
          error: 'UPLOAD.IN_CORRECT_FORMAT',
          message: 'File upload incorrect format',
        }),
        false,
      );
    }
    return callback(null, true);
  };

export const multerConfig = (options: MulterModuleOptions) => ({
  limits: {
    fileSize: config.UPLOAD_LIMIT,
  },
  fileFilter: fileFilter(UPLOAD_IMG_EXTNAME),
  ...options,
});
