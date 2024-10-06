import { CustomerUnexpectedError } from '@customers-domain/errors/customer-unexpected.error';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomerExceptions } from './customer-exceptions.mapper';

@Catch()
export class CustomerExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(
    exception: unknown & { code?: string; stack?: any },
    host: ArgumentsHost,
  ): void {
    console.log(exception);
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = CustomerUnexpectedError.message;
    if (exception?.code) {
      const customerException = CustomerExceptions.get(exception.code);
      if (customerException) {
        status = customerException.status;
        message = customerException.message;
      }
    }

    const responseBody = {
      status,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
      stack: exception.stack ? exception.stack : 'INVALID-STACK',
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
