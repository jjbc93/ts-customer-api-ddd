import { Logger } from '@nestjs/common';
import { ValueObject } from '@shared-domain/value-object';

export class CustomerLastName extends ValueObject<string> {
  protected validate(value: string): void {
    Logger.warn('Method validate', 'CustomerLastName');
    if (value.length < 2) throw new Error('Invalid format customer lastName');
  }
}
