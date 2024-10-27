import { Customer } from '@customers-domain/customer';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { Inject, Injectable } from '@nestjs/common';

export type GetCustomersUseCaseRequestModel = {};
export interface CustomerResponseModel {
  id: string;
  name: string;
  lastName: string;
  email: string;
  fullName: string;
}
export type GetCustomersUseCaseResponseModel = {
  customers: CustomerResponseModel[];
};

const GetCustomersUseCaseRepository = Symbol('GetCustomersUseCaseRepository');

type GetCustomersUseCaseRepository = Pick<CustomerRepositoryPort, 'find'>;

@Injectable()
export class GetCustomersUseCase {
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepository: GetCustomersUseCaseRepository,
  ) {}

  async exec(): Promise<GetCustomersUseCaseResponseModel> {
    const customers = await this.customerRepository.find();
    return { customers: this.buildModel(customers) };
  }

  private buildModel(customers: Customer[]): CustomerResponseModel[] {
    const response = customers?.map((customer) => {
      return {
        id: customer.id.getValue(),
        name: customer.name.getValue(),
        lastName: customer.lastName.getValue(),
        email: customer.email.getValue(),
        fullName: customer.getFullName(),
      };
    });
    return response;
  }
}
