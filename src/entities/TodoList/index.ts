import TodoItem from "src/entities/TodoItem";
import TodoListID from "./TodoListID";

export default class TodoList {
  private id: string;
  private identifier: TodoListID = new TodoListID();
  private name: string;
  private items: TodoItem[] = [];
  private active: boolean = true;

  constructor(name: string) {
    if (!name) throw Error("A list should have a name");
    this.name = name;
    this.id = this.identifier.getId();
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
  public getItems(): TodoItem[] {
    return this.items;
  }
  public getActive(): boolean {
    return this.active;
  }
  public setActive(bool: boolean): void {
    this.active = bool;
  }

  public addItem(item: TodoItem): void {
    this.items.push(item);
  }

  public getItemById(id: string): TodoItem {
    return this.items.find((item) => item.id === id);
  }

  public getItemByContent(content: string): TodoItem[] {
    return this.items.filter(
      (item) =>
        item.getName().includes(content) ||
        item.getDescription().includes(content)
    );
  }
  public removeItemById(id: string): void {
    this.checkIfItemExists(id);

    this.items = this.items.filter((item) => item.id != id);
  }

  public updateItemName(id: string, name: string): void {
    this.checkIfItemExists(id);

    this.items = this.items.map((item) => {
      if (item.getId() === id) item.setName(name);
      return item;
    });
  }

  public updateItemDescription(id: string, description: string): void {
    this.checkIfItemExists(id);
    this.items = this.items.map((item) => {
      if (item.getId() === id) item.setDescription(description);
      return item;
    });
  }

  private checkIfItemExists(id: string): void {
    if (this.getItemById(id)) return;
    else throw Error("provided id does not match any items");
  }
}
