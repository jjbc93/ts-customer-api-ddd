import { Logger } from '@nestjs/common';
import { ValueObject } from '@shared-domain/value-object';

export class CustomerName extends ValueObject<string> {
  protected validate(value: string): void {
    Logger.warn('Method validate', 'CustomerName');
    if (value.length < 3) throw new Error('Invalid format customer name');
  }
}
