import { ApiProperty } from '@nestjs/swagger';
import { CustomerDto } from './customers.dto';

export class GetCustomerDto extends CustomerDto {}

export class GetCustomersResponseDto {
  @ApiProperty({ type: GetCustomerDto, isArray: true })
  customers: GetCustomerDto[];
}
