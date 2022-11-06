import TodoList from "src/entities/TodoList";
import TodoListID from "../TodoList/TodoListID";
import { UserID } from "../User";
import exampleLists from "./exampleLists";

export default class TodoApp {
  private lists: TodoList[] = exampleLists;
  private ownerId: UserID | undefined;

  constructor(ownerId: UserID) {
    if (!ownerId) throw Error("Missing owner id on app instantiation");
    this.setOwnerId(ownerId);
  }

  public addList(list: TodoList): void {
    this.lists.push(list);
  }

  public getLists(): TodoList[] {
    return this.lists;
  }

  public getListById(id: TodoListID): TodoList {
    const list = this.lists.find((list) => list.getId() === id);
    if (list) return list;
    else throw Error("List not found");
  }

  public removeList(id: TodoListID): void {
    this.lists = this.lists.filter((list) => list.getId() != id);
  }

  public removeAllLists(): void {
    this.lists = [];
  }

  public updateList(list: TodoList): void {
    const id = list.getId();
    if (this.getListById(id))
      this.lists = this.lists.map((previousList) => {
        if (previousList.getId() === id) previousList = list;
        return previousList;
      });
    else throw Error("Could not find list by id, nothing has been updated");
  }

  public setOwnerId(ownerId: UserID): void {
    this.ownerId = ownerId;
  }

  public getOwnerId(): UserID {
    const id = this.ownerId;
    if (id) return id;
    else throw Error("No ID found");
  }
}
