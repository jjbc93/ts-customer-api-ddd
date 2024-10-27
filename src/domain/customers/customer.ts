import { Logger } from '@nestjs/common';
import { CustomerId } from './value-object/customer-id';
import { CustomerName } from './value-object/customer-name';
import { CustomerEmail } from './value-object/customer-email';
import { CustomerLastName } from './value-object/customer-lastname';

export interface CustomerParams {
  id: CustomerId;
  name: CustomerName;
  email: CustomerEmail;
  lastName: CustomerLastName;
}
export class Customer {
  id: CustomerId;
  name: CustomerName;
  email: CustomerEmail;
  lastName: CustomerLastName;

  private constructor(params: CustomerParams) {
    this.id = params.id;
    this.name = params.name;
    this.lastName = params.lastName;
    this.email = params.email;
  }

  static create(params: CustomerParams) {
    Logger.warn('Apply validation', 'Customer');
    return new Customer(params);
  }

  static fromValues(params: CustomerParams): Customer {
    Logger.debug('Skip validation', 'Customer');
    return new Customer(params);
  }

  public getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }
}
