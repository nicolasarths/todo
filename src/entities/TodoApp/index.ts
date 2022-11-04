import TodoList from "src/entities/TodoList";

export default class TodoApp {
  private lists: TodoList[] = [];
  private ownerId: string;

  constructor(ownerId: string) {
    if (!ownerId) throw Error("Missing owner id on app instantiation");
    this.setOwnerId(ownerId);
  }

  public addList(list: TodoList): void {
    this.lists.push(list);
  }

  public getLists(): TodoList[] {
    return this.lists;
  }

  public getListById(id: string): TodoList {
    return this.lists.find((list) => list.getId() === id);
  }

  public removeList(id: string): void {
    this.lists = this.lists.filter((list) => list.getId() != id);
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

  public setOwnerId(ownerId: string): void {
    this.ownerId = ownerId;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }
}
