import TodoListID from "src/entities/TodoList";
import TodoItem from "..";
import TodoItemID from "../TodoItemID";

import { todoItem as mockItem, todoItemName, todoList } from "./mocks";

export default () => {
  let todoItem: TodoItem;
  let todoListId = todoList.getId();
  beforeEach(() => {
    todoItem = mockItem;
  });

  it("should have an id", () => {
    const todoItemId = todoItem.getId();
    expect(todoItemId).toBeInstanceOf(TodoItemID);
  });

  it("can be instantiated with empty string", () => {
    const todoItemWithEmptyString: TodoItem = new TodoItem("", todoListId);
    expect(todoItemWithEmptyString.getName()).toBe("");
  });

  it("initializes with string as title", () => {
    expect(todoItem.getName()).toBe(todoItemName);
  });
};
