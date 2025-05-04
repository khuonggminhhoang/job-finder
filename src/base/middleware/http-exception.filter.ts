import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    if (host.getType() !== 'http') return;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const excResponse = exception.getResponse();

    const newDataResponse =
      typeof excResponse === 'object' ? excResponse : { message: excResponse };
    response.status(status).json({
      success: false,
      statusCode: status,
      ...newDataResponse,
    });
  }
}
