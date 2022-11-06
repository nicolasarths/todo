import Session from "src/usecases/Session";
import Storage from "src/entities/Storage";
import exampleLists from "src/entities/TodoApp/exampleLists";
import TodoItemID from "../../entities/TodoItem/TodoItemID";
import TodoItem from "../../entities/TodoItem";
import TodoListID from "../../entities/TodoList/TodoListID";
import TodoList from "../../entities/TodoList";

describe("-- User Experience Story --", () => {
  const db = new Storage();
  const session = new Session(db);

  const email = "example@email.com";
  const password = "123456";
  const name = "Fulano";

  it("A user starts the app, which triggers a new session", () => {
    expect(session).toBeTruthy();
  });

  it("The user then proceeds to register his account", () => {
    session.register(email, password);
    expect(session.isRegistered(email)).toBeTruthy();
  });

  it("Then, he logs into his account", () => {
    session.login(email, password);
    session.getLists();
    expect(session.isLoggedIn()).toBeTruthy();
  });

  it("And then he proceeds to alter his name", () => {
    session.getUser().setName(name);
    expect(session.getUser().getName()).toEqual(name);
  });

  it("He checks his default Todo App and their examplary Todo Lists", () => {
    expect(session.getApp()).toBeTruthy();
    expect(session.getLists().length).toEqual(exampleLists.length);
  });

  let list: TodoList;
  let listId: TodoListID;
  let item: TodoItem;
  let itemId: TodoItemID;

  it("He tests toggling an item as completed several times", () => {
    list = session.getLists()[0];
    listId = list.getId();

    item = list.getItems()[0];
    itemId = item.getId();
    session.setItemCompleted(itemId, listId);
    expect(item.getCompleted()).toBe(true);
    expect(session.getLists()[0].getItems()[0].getCompleted()).toBe(true);
    session.setItemCompleted(itemId, listId);
    expect(item.getCompleted()).toBe(false);
    session.setItemCompleted(itemId, listId);
    expect(item.getCompleted()).toBe(true);
    session.setItemCompleted(itemId, listId);
    expect(item.getCompleted()).toBe(false);
  });

  it("He proceeds to deleting an item", () => {
    session.removeItem(itemId, listId);
    expect(() => session.getItemById(itemId, listId)).toThrow();
  });
  it("He then decides to delete all items of this list", () => {
    session.removeAllItemsFromList(listId);
    expect(session.getListItems(listId).length).toBe(0);
  });
  it("He renames this list to fit their needs", () => {
    const name = "This Year Objectives";
    session.setListName(listId, name);
    expect(session.getListById(listId).getName()).toBe(name);
  });
  it("He adds some items to his list", () => {
    const itemNames = ["Marry", "Go to Paris", "Finish school"];
    itemNames.forEach((itemName) => {
      session.addItem(itemName, listId);
    });
    session.getListItems(listId).forEach((list, i) => {
      expect(list.getName()).toEqual(itemNames[i]);
    });
  });
  it("He deletes the other lists", () => {
    session.getLists().forEach((list, i) => {
      if (i > 0) session.removeList(list.getId());
    });
    expect(session.getLists().length).toBe(1);
    expect(session.getLists()[0]).toEqual(list);
  });
});
