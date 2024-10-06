interface CustomerEntityParams {
  uuid: string;
  firstName: string;
  secondName: string;
  mail: string;
}
export class CustomerEntity {
  uuid: string;
  firstName: string;
  secondName: string;
  mail: string;

  private constructor(params: CustomerEntityParams) {
    this.uuid = params.uuid;
    this.firstName = params.firstName;
    this.secondName = params.secondName;
    this.mail = params.mail;
  }

  static fromValues(params: CustomerEntityParams) {
    return new CustomerEntity(params);
  }
}
