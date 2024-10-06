import { ApiProperty } from '@nestjs/swagger';
import { CustomerDto } from './customers.dto';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateCustomerDto extends CustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;
}

export class CreateCustomerRequestDto extends CustomerDto {}

export class CreateCustomerResponseDto {
  @ApiProperty({ type: CreateCustomerDto })
  customer: CreateCustomerDto;

  constructor(params: CustomerDto & CreateCustomerDto) {
    this.customer = params;
  }
}
