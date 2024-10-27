import { Logger } from '@nestjs/common';
import { ValueObject } from './value-object';

export class UUID extends ValueObject<string> {
  protected validate(value: string): void {
    Logger.warn('Method validate', 'UUID');
  }

  /* protected constructor(value: string) {
    super(value);
  } */

  /* static create(value: string): UUID {
    Logger.debug('Apply validation', 'UUID');
    const uuid = new UUID(value);
    uuid.validate(uuid.getValue());
    return uuid;
  }

  static fromValues(value: string): UUID {
    Logger.debug('Skip validation', 'UUID');
    return new UUID(value);
  } */
}
