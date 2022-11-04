import TodoItem from "src/entities/TodoItem";
import { todoItem as itemMock, todoList, anotherTodoList } from "./mocks";

export default () => {
  let todoItem: TodoItem;

  beforeEach(() => {
    todoItem = itemMock;
  });
  it("should born referencing a list", () => {
    expect(typeof todoItem.getTodoListId()).toEqual(typeof todoList.getId());
  });
  it("reference to list can be changed", () => {
    const oldRef = todoItem.getTodoListId();
    todoItem.setTodoListId(anotherTodoList.getId());

    expect(todoItem.getTodoListId()).not.toBe(oldRef);
  });
};
