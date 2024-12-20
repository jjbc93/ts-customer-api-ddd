import { Module } from '@nestjs/common';
import { CustomersController } from './presentation/customers.controller';
import { CustomerCreateUseCase } from './use-cases/customer-create.use-case';
import { CustomerRepositoryPort } from '@customers-domain/repository/customer.repository';
import { CustomerAdapter } from './infrastructure/storage/customer.adapter';
import { GetCustomersUseCase } from './use-cases/get-customers.use-case';
import { GetOneCustomerUseCase } from './use-cases/get-one-customer.use-case';
import { CustomerExistService } from './use-cases/services/customer-exist.service';
import { GetCustomerService } from './use-cases/services/get-customer.service';

@Module({
  controllers: [CustomersController],
  providers: [
    { provide: CustomerRepositoryPort, useClass: CustomerAdapter },
    CustomerCreateUseCase,
    GetCustomersUseCase,
    GetOneCustomerUseCase,
    CustomerExistService,
    GetCustomerService,
  ],
})
export class CustomersModule {}
