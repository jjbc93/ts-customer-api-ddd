import { Customer } from '@customers-domain/customer';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerExistService } from './services/customer-exist.service';
import { CustomerAlreadyRegisteredException } from './errors/customer-already-registered.error';

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
  public getCustomerSerivice: CustomerRepositoryPort;
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepositoryPort: CustomerRepositoryPort,
    private readonly customerExist: CustomerExistService,
  ) {}
  public async exec(
    request: CustomerCreateUseCaseRequestModel,
  ): Promise<CustomerCreateUseCaseResponseModel> {
    /* const role = servicioDomainCreateRole: role
    newCustomer.ADDrOLE(role); */
    const idCustomer = crypto.randomUUID();
    const customerExist = await this.customerExist.exec(idCustomer);
    if (customerExist) throw new CustomerAlreadyRegisteredException();
    const newCustomer = await this.customerRepositoryPort.create(
      Customer.create({ ...request, id: idCustomer }),
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
