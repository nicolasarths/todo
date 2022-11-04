import TodoItem from "src/entities/TodoItem";
import { bunchOfInvalidTypes } from "./bunchOfInvalidTypes";
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

  it("accepts strings only", () => {
    bunchOfInvalidTypes.forEach((type) => {
      expect(() => todoItem.setDescription(type)).toThrowError();
    });
  });
};
