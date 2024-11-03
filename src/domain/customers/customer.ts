import { Logger } from '@nestjs/common';
import { CustomerId } from './value-object/customer-id';
import { CustomerName } from './value-object/customer-name';
import { CustomerEmail } from './value-object/customer-email';
import { CustomerLastName } from './value-object/customer-lastname';
import { AggregateRoot } from '@shared-domain/aggregate-root';
import { CustomerCreatedEvent } from './events/customer-created.event';
import { CustomerUpdatedEvent } from './events/customer-updated.event';

export interface CustomerParams {
  id: CustomerId;
  name: CustomerName;
  email: CustomerEmail;
  lastName: CustomerLastName;
}
export class Customer extends AggregateRoot {
  id: CustomerId;
  name: CustomerName;
  email: CustomerEmail;
  lastName: CustomerLastName;

  private constructor(params: CustomerParams) {
    super();
    this.id = params.id;
    this.name = params.name;
    this.lastName = params.lastName;
    this.email = params.email;
  }

  static create(params: CustomerParams): Customer {
    Logger.warn('Apply validation', 'Customer');
    const customer = new Customer(params);
    Logger.debug('Create Event', 'CustomerCreated');
    customer.addDomainEvent(
      new CustomerCreatedEvent({
        id: customer.id.getValue(),
        name: customer.name.getValue(),
        email: customer.email.getValue(),
      }),
    );
    console.log(customer.getDomainEvents());
    return customer;
  }

  static fromValues(params: CustomerParams): Customer {
    Logger.debug('Skip validation', 'Customer');
    return new Customer(params);
  }

  public getFullName(): string {
    return `${this.name} ${this.lastName}`;
  }

  public updateCustomer(
    updateCustomer: Pick<CustomerParams, 'name' | 'email' | 'lastName'>,
  ): void {
    const newName = updateCustomer.name;
    const newEmail = updateCustomer.email;
    const newLastName = updateCustomer.lastName;
    let hasBeenUpdated = false;

    if (!this.name.equals(newName)) {
      this.name = newName;
      hasBeenUpdated = true;
    }

    if (!this.email.equals(newEmail)) {
      this.email = newEmail;
      hasBeenUpdated = true;
    }

    if (!this.lastName.equals(newLastName)) {
      this.lastName = newLastName;
      hasBeenUpdated = true;
    }

    if (hasBeenUpdated) {
      this.addDomainEvent(
        new CustomerUpdatedEvent({
          id: this.id.getValue(),
          name: this.name.getValue(),
          email: this.email.getValue(),
        }),
      );
    }
  }
}
