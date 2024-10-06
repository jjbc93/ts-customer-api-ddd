import { CustomerNotFoundError } from '@customers-domain/errors/customer-not-found.error';

export class CustomerNotFoundException extends Error {
  readonly code = CustomerNotFoundError.code;
  constructor() {
    super(CustomerNotFoundError.message);
  }
}
