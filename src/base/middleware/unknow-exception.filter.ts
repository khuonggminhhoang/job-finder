import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import * as exc from '@/base/exceptions/exception.resolve';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) throw exception;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const e = new exc.BusinessException({
      success: false,
      statusCode: 500,
      message: 'Unknown exception.',
    });
    response.status(500).json(e.getResponse());
  }
}
