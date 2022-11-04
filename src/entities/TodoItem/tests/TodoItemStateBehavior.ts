import TodoItem from "src/entities/TodoItem";
import { todoItem as mockItem } from "./mocks";

export default () => {
  let todoItem: TodoItem;
  beforeEach(() => {
    todoItem = mockItem;
  });
  it("Should be born as not completed", () => {
    expect(todoItem.getCompleted()).toBe(false);
  });
  it("Should be able to toggle completed", () => {
    todoItem.setCompleted(true);
    expect(todoItem.getCompleted()).toBe(true);
    todoItem.setCompleted(false);
    expect(todoItem.getCompleted()).toBe(false);
    todoItem.setCompleted(true);
    expect(todoItem.getCompleted()).toBe(true);
  });
};
