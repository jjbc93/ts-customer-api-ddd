import { Customer, CustomerParams } from '@customers-domain/customer';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerExistService } from './services/customer-exist.service';
import { CustomerAlreadyRegisteredException } from './errors/customer-already-registered.error';
import { CustomerId } from '@customers-domain/value-object/customer-id';
import { CustomerName } from '@customers-domain/value-object/customer-name';
import { CustomerLastName } from '@customers-domain/value-object/customer-lastname';
import { CustomerEmail } from '@customers-domain/value-object/customer-email';

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
    const idCustomer = crypto.randomUUID();
    const customerExist = await this.customerExist.exec(idCustomer);
    if (customerExist) throw new CustomerAlreadyRegisteredException();
    const id = CustomerId.create(idCustomer);
    const name = CustomerName.create(request.name);
    const lastName = CustomerLastName.create(request.lastName);
    const email = CustomerEmail.create(request.email);
    const newCustomer = await this.customerRepositoryPort.create(
      Customer.create({
        id,
        name,
        lastName,
        email,
      }),
    );
    return this.buildModel(newCustomer);
  }

  private buildModel(customer: Customer): CustomerCreateUseCaseResponseModel {
    return {
      id: customer.id.getValue(),
      name: customer.name.getValue(),
      lastName: customer.lastName.getValue(),
      email: customer.email.getValue(),
      fullName: customer.getFullName(),
    };
  }
}
