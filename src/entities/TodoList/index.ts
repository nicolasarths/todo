import TodoItem from "src/entities/TodoItem";
import TodoItemID from "../TodoItem/TodoItemID";
import TodoListID from "./TodoListID";

export default class TodoList {
  private id: TodoListID = new TodoListID();
  private name: string;
  private items: TodoItem[] = [];
  private active: boolean = true;

  constructor(name: string) {
    if (!name) throw Error("A list should have a name");
    this.name = name;
  }

  public getId(): TodoListID {
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

  public addItem(name: string): void {
    const item = new TodoItem(name, this.id);
    this.items.push(item);
  }

  public addItemInstance(item: TodoItem): void {
    this.items.push(item);
  }

  public getItemById(id: TodoItemID): TodoItem {
    const item = this.items.find((item) => item.getId() === id);
    if (!item) throw Error("Item not found");
    else return item;
  }

  public getItemByContent(content: string): TodoItem {
    const items = this.items.find(
      (item) =>
        item.getName().includes(content) ||
        item.getDescription().includes(content)
    );

    if (items) return items;
    else throw Error("No item has been found");
  }

  public getItemsByContent(content: string): TodoItem[] {
    return this.items.filter(
      (item) =>
        item.getName().includes(content) ||
        item.getDescription().includes(content)
    );
  }
  public removeItemById(id: TodoItemID): void {
    this.checkIfItemExists(id);

    this.items = this.items.filter((item) => item.getId() != id);
  }

  public removeAllItems(): void {
    this.items = [];
  }

  public updateItemName(id: TodoItemID, name: string): void {
    this.checkIfItemExists(id);

    this.items = this.items.map((item) => {
      if (item.getId() === id) item.setName(name);
      return item;
    });
  }

  public updateItemDescription(id: TodoItemID, description: string): void {
    this.checkIfItemExists(id);
    this.items = this.items.map((item) => {
      if (item.getId() === id) item.setDescription(description);
      return item;
    });
  }

  private checkIfItemExists(id: TodoItemID): void {
    if (this.getItemById(id)) return;
    else throw Error("provided id does not match any items");
  }
}
