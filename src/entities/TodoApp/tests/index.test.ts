import TodoApp from "..";
import TodoList from "src/entities/TodoList";
import User from "src/entities/User";
import exampleLists from "../exampleLists";

describe("TodoApp", () => {
  const user = new User("some@mail.com", "123456");
  const todoApp = new TodoApp(user.getId());
  const lists = [1, 2, 3, 4, 5, 6, 7].map((i) => new TodoList(`List${i}`));
  const aList = lists[3];
  const anId = aList.getId();

  it("is instantiated with example lists", () => {
    expect(todoApp.getLists().length).toBe(exampleLists.length);
  });

  it("can remove all lists at once", () => {
    todoApp.removeAllLists();
    expect(todoApp.getLists().length).toEqual(0);
  });

  it("can have more than one Todo List", () => {
    lists.forEach((list) => todoApp.addList(list));
    const retrievedLists = todoApp.getLists();
    expect(retrievedLists).toBeTruthy();
    expect(retrievedLists.length).toBe(7);
  });

  it("can get list by id", () => {
    const retrievedItem = todoApp.getListById(anId);
    expect(retrievedItem).toEqual(aList);
  });
  it("can remove list", () => {
    todoApp.removeList(anId);
    expect(() => todoApp.getListById(anId)).toThrow();
  });
  it("can add a list back", () => {
    todoApp.addList(aList);
    expect(todoApp.getListById(anId)).toBeTruthy();
    expect(todoApp.getListById(anId)).toEqual(aList);
  });
  it("can update a list by providing a list with the same id", () => {
    const newName = "a new name";
    aList.setName(newName);

    todoApp.updateList(aList);

    const retrievedList = todoApp.getListById(anId);

    expect(aList.getName()).toEqual(newName);
    expect(retrievedList).toEqual(aList);
    expect(retrievedList.getName()).toEqual(newName);

    todoApp.removeList(anId);
    expect(() => todoApp.updateList(aList)).toThrow();
  });
});
