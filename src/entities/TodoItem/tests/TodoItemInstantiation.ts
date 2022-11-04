import { TodoListID } from "src/entities/TodoList";
import TodoItem from "..";
import TodoItemID from "../TodoItemID";
import { bunchOfInvalidTypes } from "./bunchOfInvalidTypes";

import { todoItem as mockItem, todoItemName, todoList } from "./mocks";

export default () => {
  let todoItem: TodoItem;
  let todoListId: TodoListID = todoList.getId();
  beforeEach(() => {
    todoItem = mockItem;
  });

  it("should have an id", () => {
    const identifier = new TodoItemID();
    const todoItemId = todoItem.getId();
    expect(identifier.isId(todoItemId)).toBeTruthy();
  });

  it("can be instantiated with empty string", () => {
    const todoItemWithEmptyString: TodoItem = new TodoItem("", todoListId);
    expect(todoItemWithEmptyString.getName()).toBe("");
  });

  it("initializes with string as title", () => {
    expect(todoItem.getName()).toBe(todoItemName);
  });

  it("cannot initialize with something other than strings", () => {
    bunchOfInvalidTypes.forEach((type) => {
      const test = () => new TodoItem(type, todoListId);
      expect(test).toThrowError();
    });
  });
};
