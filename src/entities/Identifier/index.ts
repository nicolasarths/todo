export default class Identifier {
  private id: string;

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }
}

export interface IIdentifier {
  isId(id: string): boolean;
  generateId(): string;
}
