import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { defaultPayload, Payload } from '@/base/api/api.schema';
import { map, Observable } from 'rxjs';
import * as _ from 'lodash';
import { STATUS_CODE } from '@/shared/constants/satus-code.constant';
import { Response } from 'express';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Payload<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Payload<T>> {
    const response: Response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: T | Payload<T>) => {
        const statusCode: number = response?.statusCode;
        const statusMessage: string =
          response?.statusMessage ?? STATUS_CODE[statusCode];
        _.assign(defaultPayload, {
          statusCode: statusCode,
          message: statusMessage,
        });
        const isPayload = (obj: any): obj is Payload<T> => obj && 'meta' in obj;
        return isPayload(data)
          ? {
              ...defaultPayload,
              data: data?.data ?? null,
              meta: data?.meta ?? null,
            }
          : {
              ...defaultPayload,
              data: data ?? null,
            };
      }),
    );
  }
}
