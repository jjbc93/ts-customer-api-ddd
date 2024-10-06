import { ApiProperty } from '@nestjs/swagger';
import { CustomerDto } from './customers.dto';

export class GetOneCustomerDto extends CustomerDto {}

export class GetOneCustomersResponseDto {
  @ApiProperty({ type: GetOneCustomerDto })
  customer: GetOneCustomerDto;
}
