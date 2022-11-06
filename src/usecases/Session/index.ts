import Storage from "src/entities/Storage";
import Token from "src/entities/Token";
import User from "src/entities/User";
import TodoList from "src/entities/TodoList";
import TodoItemID from "src/entities/TodoItem/TodoItemID";
import TodoListID from "src/entities/TodoList/TodoListID";
import TodoItem from "src/entities/TodoItem";
import TodoApp from "src/entities/TodoApp";

export default class Session {
  private database: Storage;
  private token: Token;
  private user: User;

  constructor(database: Storage) {
    if (!database) throw Error("failed to stablish connection");
    this.database = database;
    this.token = Token.newInvalidToken();
    this.user = User.newInvalidUser();
  }

  public getUser(): User {
    if (!this.token) throw Error("Needs token to access user info");
    if (!this.token.getValidity()) throw Error("Invalid token");
    const user = this.database.getUserById(this.token.getUserId());
    if (user) return user;
    else throw Error("Unknown error, couldn't retrieve user");
  }

  public getApp(): TodoApp | undefined {
    return this.getUser().getApp();
  }

  public getLists(): TodoList[] {
    return this.getUser().getLists();
  }

  public getListById(id: TodoListID): TodoList {
    const list = this.getLists().find((list) => list.getId() === id);
    if (!list) throw Error("List not found");
    else return list;
  }

  public removeList(listId: TodoListID): void {
    this.getListById(listId);
    this.user.removeList(listId);
  }

  public getListItems(listId: TodoListID): TodoItem[] {
    return this.getListById(listId).getItems();
  }

  public setItemCompleted(itemId: TodoItemID, listId: TodoListID): void {
    const item = this.getItemById(itemId, listId);
    item.getCompleted() ? item.setCompleted(false) : item.setCompleted(true);
  }

  public addItem(name: string, listId: TodoListID): void {
    this.getListById(listId).addItem(name);
  }

  public getItemById(itemId: TodoItemID, listId: TodoListID): TodoItem {
    const list = this.getListById(listId);
    return list.getItemById(itemId);
  }

  public setListName(listId: TodoListID, name: string): void {
    this.getListById(listId).setName(name);
  }

  public removeItem(itemId: TodoItemID, listId: TodoListID): void {
    this.getListById(listId).removeItemById(itemId);
  }

  public removeAllItemsFromList(listId: TodoListID): void {
    this.getListById(listId).removeAllItems();
  }

  public login(email: string, password: string): boolean {
    if (!email) throw Error("No email provided on login attempt");
    if (!password) throw Error("No password provided on login attempt");
    const user = this.database.getUserByEmail(email);
    if (user && user.auth(password)) {
      this.token = new Token(user, password);
      this.user = user;
      return true;
    } else throw new Error("Login failure");
  }

  public register(email: string, password: string): void {
    const user = new User(email, password);
    this.database.addUser(user);
  }

  public isRegistered(email: string): boolean {
    return this.database.getUserByEmail(email) ? true : false;
  }

  public isLoggedIn(): boolean {
    return this.token.getValidity();
  }

  public logoff(): void {
    this.token.invalidate();
  }

  public getToken(): Token {
    return this.token;
  }
}
