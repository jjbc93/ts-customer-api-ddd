import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CustomerCreateUseCase } from '@customers/use-cases/customer-create.use-case';
import {
  CreateCustomerRequestDto,
  CreateCustomerResponseDto,
} from './dto/create-customer.dto';
import { GetCustomersResponseDto } from './dto/get-customers.dto';
import { GetCustomersUseCase } from '@customers/use-cases/get-customers.use-case';
import { GetOneCustomersResponseDto } from './dto/get-one-customer.dto';
import { GetOneCustomerUseCase } from '@customers/use-cases/get-one-customer.use-case';
import { CustomerExceptionsFilter } from './errors/http-customer-exception.filter';

@ApiTags('Customers')
@UseFilters(CustomerExceptionsFilter)
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customerCreateUseCase: CustomerCreateUseCase,
    private readonly getCustomersUseCase: GetCustomersUseCase,
    private readonly getOneCustomerUseCase: GetOneCustomerUseCase,
  ) {}

  @Post()
  @ApiResponse({ type: CreateCustomerResponseDto, status: 200 })
  async createCustomer(
    @Body() createCustomerRequestDto: CreateCustomerRequestDto,
  ): Promise<CreateCustomerResponseDto> {
    const customerModel = await this.customerCreateUseCase.exec(
      createCustomerRequestDto,
    );

    return new CreateCustomerResponseDto({
      id: customerModel.id,
      name: customerModel.name,
      lastName: customerModel.lastName,
      email: customerModel.email,
      fullName: customerModel.fullName,
    });
  }

  @Get()
  @ApiResponse({ type: GetCustomersResponseDto, status: 200 })
  async getCustomers(): Promise<GetCustomersResponseDto> {
    return this.getCustomersUseCase.exec();
  }

  @Get(':id')
  @ApiResponse({ type: GetOneCustomersResponseDto, status: 200 })
  async getOneCustomer(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetOneCustomersResponseDto> {
    return this.getOneCustomerUseCase.exec({ id });
  }
}
