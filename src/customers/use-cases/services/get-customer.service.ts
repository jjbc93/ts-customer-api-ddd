import { Customer } from '@customers-domain/customer';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { Inject } from '@nestjs/common';
import { CustomerNotFoundException } from '../errors/customer-not-found.error';
import { CustomerUnexpectedException } from '../errors/customer-unexpected.error';

export class GetCustomerService {
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  public async getCustomer(id: string): Promise<Customer> {
    let customer;
    try {
      customer = await this.customerRepository.findOne(id);
      if (!customer) throw new CustomerNotFoundException();
      return customer;
    } catch (error) {
      if (error instanceof CustomerNotFoundException) {
        throw error;
      }
      throw new CustomerUnexpectedException();
    }
  }
}
