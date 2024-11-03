export abstract class AggregateRoot {
  private readonly events: any[] = [];

  protected addDomainEvent(event: any): void {
    this.events.push(event);
  }

  protected getDomainEvents(): any[] {
    return this.events;
  }

  public cleanDomainEvents(): void {
    this.events.length = 0;
  }
}
