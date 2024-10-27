import { Logger } from '@nestjs/common';

export abstract class ValueObject<T> {
  protected readonly value: T;

  public constructor(value: T) {
    this.value = value;
  }

  protected abstract validate(value: T): void;

  equals(vo: ValueObject<T>): boolean {
    return (
      vo.constructor.name === this.constructor.name && vo.value === this.value
    );
  }

  toString(): string {
    return String(this.value);
  }

  getValue(): T {
    return this.value;
  }

  static create<U, V extends ValueObject<U>>(
    this: new (value: U) => V,
    value: U,
  ): V {
    const vo = new this(value);
    Logger.debug('Apply validation', this.name);
    vo.validate(value);
    return vo;
  }

  static fromValues<U, V extends ValueObject<U>>(
    this: new (value: U) => V,
    value: U,
  ): V {
    const vo = new this(value);
    Logger.debug('Skip validation', this.name);
    return vo;
  }
}
