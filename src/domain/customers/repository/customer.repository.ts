import { Customer } from '../customer';

export const CustomerRepositoryPort = Symbol('CustomerRepositoryPort');

export interface CustomerRepositoryPort {
  find(query?: any): Promise<Customer[] | []>;
  create(customer: Customer): Promise<Customer>;
  findOne(id: string): Promise<Customer>;
}
