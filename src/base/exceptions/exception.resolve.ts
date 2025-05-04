import { HttpException, HttpStatus } from '@nestjs/common';
import { defaultPayload, Payload } from '@/base/api/api.schema';

export class BaseException<TData> extends HttpException {
  constructor(
    partial: Payload<TData>,
    statusCode: number,
    defaultMessage: string = '',
  ) {
    const payload = {
      ...defaultPayload,
      ...partial,
    };
    payload.message = payload.message || defaultMessage;
    payload.statusCode = statusCode;
    payload.success = false;
    super(payload, statusCode);
  }
}

export class UnauthorizedException<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.UNAUTHORIZED);
  }
}

export class BusinessException<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class BadRequestException<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.BAD_REQUEST);
  }
}

export class NotFoundException<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.NOT_FOUND);
  }
}

export class ForbiddenException<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(payload, HttpStatus.FORBIDDEN);
  }
}

export class PayloadTooLargeException<TData> extends BaseException<TData> {
  constructor(payload: Payload<TData>) {
    super(
      payload,
      HttpStatus.PAYLOAD_TOO_LARGE,
      'Data exceeds the allowed size',
    );
  }
}
