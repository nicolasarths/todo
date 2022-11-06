import User, { UserID } from "../User";
import * as utils from "src/utils";

export default class Token {
  private id: string;
  private userId: UserID;
  private date: Date = new Date();
  private isValid: boolean = true;

  constructor(user: User, password: string) {
    if (!user) throw Error("No user provided on Token request");
    if (!user.auth(password))
      throw Error("Authentication failure on Token request");
    this.id = utils.generateId(`User_${user.getName()}`);
    this.userId = user.getId();
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): UserID {
    return this.userId;
  }

  public getDate(): Date {
    return this.date;
  }

  public invalidate(): void {
    this.id = "";
    this.userId = new UserID();
    this.isValid = false;
  }

  public getValidity(): boolean {
    return this.isValid;
  }

  static newInvalidToken(): Token {
    const token = new Token(
      User.newInvalidUser(),
      User.getInvalidUserPassword()
    );
    token.invalidate();
    return token;
  }
}
