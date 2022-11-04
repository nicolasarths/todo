import Identifier, { IIdentifier } from "../Identifier";
import { checkId, generateId } from "src/utils";

export class UserID extends Identifier implements IIdentifier {
  constructor() {
    super();
    super.setId(this.generateId());
  }

  public isId(id: string): boolean {
    return checkId(id, "User");
  }
  public generateId(): string {
    return generateId("User");
  }
}

export default class User {
  private id: string;
  private identifier: UserID = new UserID();
  private name: string;
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.id = this.identifier.getId();
    this.setEmail(email);
    this.setPassword(password);
  }
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public hasPassword(): boolean {
    if (this.password) return true;
    else return false;
  }

  public setPassword(password: string): void {
    if (password.length > 6 && password.length < 30) this.password = password;
  }

  public auth(password: string): boolean {
    if (this.password === password) return true;
    else return false;
  }
}
