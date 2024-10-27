import { Customer } from 'src/domain/customers/customer';
import { CustomerEntity } from './customer.entity';
import { CustomerId } from '@customers-domain/value-object/customer-id';
import { CustomerName } from '@customers-domain/value-object/customer-name';
import { CustomerLastName } from '@customers-domain/value-object/customer-lastname';
import { CustomerEmail } from '@customers-domain/value-object/customer-email';

export class CustomerFactory {
  static entityToDomain(entity: CustomerEntity): Customer {
    return Customer.fromValues({
      id: CustomerId.fromValues(entity.uuid),
      name: CustomerName.fromValues(entity.firstName),
      lastName: CustomerLastName.fromValues(entity.secondName),
      email: CustomerEmail.fromValues(entity.mail),
    });
  }

  static domainToEntity(domain: Customer): CustomerEntity {
    return CustomerEntity.fromValues({
      uuid: domain.id.getValue(),
      firstName: domain.name.getValue(),
      secondName: domain.lastName.getValue(),
      mail: domain.email.getValue(),
    });
  }
}
