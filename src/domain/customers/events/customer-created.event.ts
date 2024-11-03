interface CustomerCreatedEventParams {
  id: string;
  email: string;
  name: string;
}
export class CustomerCreatedEvent {
  constructor(public readonly params: CustomerCreatedEventParams) {}
}
