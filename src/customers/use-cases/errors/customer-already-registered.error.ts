import { CustomerAlreadyRegisteredError } from '@customers-domain/errors/customer-already-registered.error';

export class CustomerAlreadyRegisteredException extends Error {
  readonly code = CustomerAlreadyRegisteredError.code;
  constructor() {
    super(CustomerAlreadyRegisteredError.message);
  }
}
