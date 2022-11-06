import TodoListID from "../TodoList/TodoListID";
import TodoItemID from "./TodoItemID";

const Errors = {
  mustBeAString: "argument must be a string",
};

const throwError = (err: string) => {
  throw Error(err);
};

class TodoItem {
  private id: TodoItemID = new TodoItemID();
  private name: Required<string> = "";
  private description: string = "";
  private completed: boolean;
  private todoListId!: TodoListID;

  constructor(name: Required<string>, todoListID: TodoListID) {
    this.setName(name);
    this.completed = false;
    this.setTodoListId(todoListID);
  }

  public getId(): TodoItemID {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    typeof name === "string"
      ? (this.name = name)
      : throwError(Errors.mustBeAString);
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    typeof description === "string"
      ? (this.description = description)
      : throwError(Errors.mustBeAString);
  }

  public getCompleted(): boolean {
    return this.completed;
  }
  public setCompleted(bool: boolean): void {
    this.completed = bool;
  }

  public getTodoListId(): TodoListID {
    return this.todoListId;
  }

  public setTodoListId(id: TodoListID) {
    this.todoListId = id;
  }
}

export default TodoItem;
