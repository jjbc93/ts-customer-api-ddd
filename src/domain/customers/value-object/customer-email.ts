import { Logger } from '@nestjs/common';
import { ValueObject } from '@shared-domain/value-object';

export class CustomerEmail extends ValueObject<string> {
  /* protected constructor(value: string) {
    super(value);
  } */

  protected validate(value: string): void {
    Logger.debug('Method validate', 'CustomerEmail');
    const valid = value.includes('@test');
    if (!valid) throw new Error('Invalid email');
  }
}
