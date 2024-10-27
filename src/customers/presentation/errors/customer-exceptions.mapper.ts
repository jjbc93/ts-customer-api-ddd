import { CustomerAlreadyRegisteredError } from '@customers-domain/errors/customer-already-registered.error';
import { CustomerNotFoundError } from '@customers-domain/errors/customer-not-found.error';
import { CustomerUnexpectedError } from '@customers-domain/errors/customer-unexpected.error';
import { CustomerNotFoundException } from '@customers/use-cases/errors/customer-not-found.error';
import { HttpStatus } from '@nestjs/common';

export const CustomerExceptions = new Map<
  string,
  { status: number; message: string }
>([
  [
    CustomerNotFoundError.code,
    { message: CustomerNotFoundError.message, status: HttpStatus.NOT_FOUND },
  ],

  [
    CustomerUnexpectedError.code,
    {
      message: CustomerUnexpectedError.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    },
  ],
  [
    CustomerAlreadyRegisteredError.code,
    {
      message: CustomerAlreadyRegisteredError.message,
      status: HttpStatus.CONFLICT,
    },
  ],
]);
