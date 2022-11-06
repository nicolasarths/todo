import TodoItem from "src/entities/TodoItem";
import { todoItem as mockItem } from "./mocks";

export default () => {
  let todoItem: TodoItem;

  beforeEach(() => {
    todoItem = mockItem;
  });

  it("can be set and altered", () => {
    const desc = "abc";
    todoItem.setDescription(desc);
    expect(todoItem.getDescription()).toBe(desc);
  });
};
