import { Customer } from '@customers-domain/customer';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { CustomerFactory } from '@customers/infrastructure/storage/customer.factory';
import { Inject, Injectable } from '@nestjs/common';

export type CustomerCreateUseCaseRequestModel = {
  name: string;
  email: string;
  lastName: string;
};
export type CustomerCreateUseCaseResponseModel = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  fullName: string;
};

const CustomerCreateUseCaseRepository = Symbol(
  'CustomerCreateUseCaseRepository',
);

type CustomerCreateUseCaseRepository = Pick<CustomerRepositoryPort, 'create'>;

@Injectable()
export class CustomerCreateUseCase {
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepositoryPort: CustomerCreateUseCaseRepository,
  ) {}
  public async exec(
    request: CustomerCreateUseCaseRequestModel,
  ): Promise<CustomerCreateUseCaseResponseModel> {
    const newCustomer = await this.customerRepositoryPort.create(
      Customer.create({ ...request }),
    );
    return this.buildModel(newCustomer);
  }

  private buildModel(customer: Customer): CustomerCreateUseCaseResponseModel {
    return {
      id: customer.id,
      name: customer.name,
      lastName: customer.lastName,
      email: customer.email,
      fullName: customer.getFullName(),
    };
  }
}
