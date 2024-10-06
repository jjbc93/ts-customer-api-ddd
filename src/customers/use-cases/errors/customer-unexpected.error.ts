import { CustomerUnexpectedError } from '@customers-domain/errors/customer-unexpected.error';

export class CustomerUnexpectedException extends Error {
  readonly code = CustomerUnexpectedError.code;
  constructor() {
    super(CustomerUnexpectedError.message);
  }
}
