import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { Inject } from '@nestjs/common';

export class CustomerExistService {
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepo: CustomerRepositoryPort,
  ) {}

  public async exec(id: string): Promise<boolean> {
    return !!(await this.customerRepo.findOne(id));
  }
}
