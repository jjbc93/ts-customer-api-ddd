import { Customer } from '@customers-domain/customer';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { CustomerOrmNotFoundException } from '@customers/infrastructure/storage/errors/customer-orm.error';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerNotFoundException } from './errors/customer-not-found.error';
import { CustomerUnexpectedException } from './errors/customer-unexpected.error';

export type GetOneCustomerUseCaseRequestModel = {
  id: string;
};
export interface CustomerResponseModel {
  id: string;
  name: string;
  lastName: string;
  email: string;
  fullName: string;
}
export type GetOneCustomerUseCaseResponseModel = {
  customer: CustomerResponseModel;
};

const GetOneCustomerUseCaseRepository = Symbol(
  'GetOneCustomerUseCaseRepository',
);

type GetOneCustomerUseCaseRepository = Pick<CustomerRepositoryPort, 'findOne'>;

@Injectable()
export class GetOneCustomerUseCase {
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepository: GetOneCustomerUseCaseRepository,
  ) {}

  async exec(
    request: GetOneCustomerUseCaseRequestModel,
  ): Promise<GetOneCustomerUseCaseResponseModel> {
    let customer;
    try {
      customer = await this.customerRepository.findOne(request.id);
    } catch (error) {
      if (error instanceof CustomerOrmNotFoundException) {
        throw new CustomerNotFoundException();
      }

      throw new CustomerUnexpectedException();
    }

    return { customer: this.buildModel(customer) };
  }

  private buildModel(customer: Customer): CustomerResponseModel {
    return {
      id: customer.id,
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      fullName: customer.getFullName(),
    };
  }
}
