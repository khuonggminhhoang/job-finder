import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiBearerAndTags(...tags: string[]) {
  return applyDecorators(ApiBearerAuth(), ApiTags(...tags));
}

export function ApiFile(fieldName: string = 'file') {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: true,
    }),
  );
}
