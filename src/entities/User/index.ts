import Identifier from "src/entities/Identifier";
import { generateId } from "src/utils";
import TodoApp from "src/entities/TodoApp";
import TodoList from "src/entities/TodoList";
import TodoListID from "src/entities/TodoList/TodoListID";

export class UserID implements Identifier {
  _id: string;

  constructor() {
    this._id = this.generateId();
  }
  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  public generateId(): string {
    return generateId("User");
  }
}

export default class User {
  private id: UserID = new UserID();
  private name: string = "";
  private email: string = "";
  private verifiedEmail: boolean = false;
  private password: string = String(Math.random() * 9 * 9 * 9 * 9 * 9 * 9);
  private app: TodoApp = this.createApp();

  constructor(email: string, password: string) {
    this.setEmail(email);
    this.setPassword(password);
  }

  public getId(): UserID {
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

  public getVerifiedEmail(): boolean {
    return this.verifiedEmail;
  }

  public setVerifiedEmail(bool: boolean): void {
    this.verifiedEmail = bool;
  }

  public hasPassword(): boolean {
    if (this.password) return true;
    else return false;
  }

  public setPassword(password: string): void {
    if (!password) throw Error("No password has been provided");
    if (password.length < 6) throw Error("Password too short");
    if (password.length > 50) throw Error("Password too long");
    this.password = password;
  }

  public auth(password: string): boolean {
    if (this.password === password) return true;
    else return false;
  }

  private createApp(): TodoApp {
    return new TodoApp(this.getId());
  }

  public getApp(): TodoApp {
    return this.app;
  }

  public createList(name: string): void {
    const list = new TodoList(name);
    this.app.addList(list);
  }

  public removeList(listId: TodoListID): void {
    this.getApp().removeList(listId);
  }

  public getLists(): TodoList[] {
    return this.app.getLists();
  }

  public removeAllLists(): void {
    this.app.removeAllLists();
  }

  public static newInvalidUser(): User {
    return new User("", "000000");
  }

  public static getInvalidUserPassword(): string {
    return "000000";
  }
}
