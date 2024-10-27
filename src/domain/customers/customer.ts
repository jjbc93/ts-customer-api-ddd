import { Logger } from '@nestjs/common';

interface CustomerParams {
  id?: string;
  name: string;
  email: string;
  lastName: string;
}
export class Customer {
  id: string;
  name: string;
  email: string;
  lastName: string;

  private constructor(params: CustomerParams) {
    this.id = params.id;
    this.name = params.name;
    this.lastName = params.lastName;
    this.email = params.email;
  }

  static create(params: CustomerParams) {
    //? Task use-case create
    if (!params.id) params.id = crypto.randomUUID();
    Logger.debug('Apply validation', 'Customer');
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
