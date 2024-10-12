import { Customer } from '@customers-domain/customer';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { CustomerEntity } from './customer.entity';
import { CustomerFactory } from './customer.factory';
import { CustomerOrmNotFoundException } from './errors/customer-orm.error';

export class CustomerAdapter implements CustomerRepositoryPort {
  private customers = new Map<string, CustomerEntity>();
  constructor() {}

  public async create(customer: Customer): Promise<Customer> {
    const customerEntity = CustomerFactory.domainToEntity(customer);
    this.customers.set(customerEntity.uuid, customerEntity);
    return new Promise((resolve, reject) => {
      resolve(
        CustomerFactory.entityToDomain(this.customers.get(customerEntity.uuid)),
      );
    });
  }

  public async find(query?: any): Promise<Customer[]> {
    const customersDomain: Customer[] = [];
    this.customers.forEach((customer) => {
      customersDomain.push(CustomerFactory.entityToDomain(customer));
    });

    return new Promise((resolve, reject) => {
      resolve(customersDomain);
    });
  }

  public async findOne(id: string): Promise<Customer> {
    const customerEntity = this.customers.get(id);
    if (!customerEntity) throw new CustomerOrmNotFoundException();
    return CustomerFactory.entityToDomain(customerEntity);
  }
}
