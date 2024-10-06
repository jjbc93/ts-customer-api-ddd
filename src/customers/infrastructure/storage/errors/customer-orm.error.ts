import { CustomerNotFoundError } from '@customers-domain/errors/customer-not-found.error';

export class CustomerOrmNotFoundException extends Error {
  readonly code = CustomerNotFoundError.code;
  constructor() {
    super(CustomerNotFoundError.message);
  }
}
