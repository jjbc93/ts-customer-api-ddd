import { Customer } from 'src/domain/customers/customer';
import { CustomerEntity } from './customer.entity';

export class CustomerFactory {
  static entityToDomain(entity: CustomerEntity): Customer {
    return Customer.fromValues({
      id: entity.uuid,
      name: entity.firstName,
      lastName: entity.secondName,
      email: entity.mail,
    });
  }

  static domainToEntity(domain: Customer): CustomerEntity {
    return CustomerEntity.fromValues({
      uuid: domain.id,
      firstName: domain.name,
      secondName: domain.lastName,
      mail: domain.email,
    });
  }
}
