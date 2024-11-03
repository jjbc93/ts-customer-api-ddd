interface CustomerUpdatedEventParams {
  id: string;
  email: string;
  name: string;
}
export class CustomerUpdatedEvent {
  constructor(public readonly params: CustomerUpdatedEventParams) {}
}
