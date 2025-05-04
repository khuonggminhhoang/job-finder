/*eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-argument*/
import { HttpExceptionFilter } from '@/base/middleware/http-exception.filter';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import * as exc from '@/base/exceptions/exception.resolve';

export class MulterErrorFilter extends HttpExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception.getStatus() === HttpStatus.PAYLOAD_TOO_LARGE) {
      const payloadTooLargeExc = new exc.PayloadTooLargeException({
        error: 'UPLOAD.PAYLOAD_TOO_LARGE',
      });
      super.catch(payloadTooLargeExc, host);
    } else {
      super.catch(exception, host);
    }
  }
}
