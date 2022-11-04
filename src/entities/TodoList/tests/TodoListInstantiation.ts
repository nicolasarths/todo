import TodoList from "../";
import TodoListID from "../TodoListID";

export default () => {
  const aTodoList = new TodoList("My testing list");
  it("has to have an id", () => {
    const id = aTodoList.getId();
    const identifier = new TodoListID();
    expect(identifier.isId(id)).toBeTruthy();
  });
  it("has a title", () => {
    const title = aTodoList.getName();
    expect(title).toBeTruthy();
    expect(typeof title).toBe("string");
  });
  it("can toggle active state", () => {
    const getState = () => aTodoList.getActive();
    aTodoList.setActive(true);
    expect(getState()).toBeTruthy();
    aTodoList.setActive(false);
    expect(getState()).toBeFalsy();
  });
  it("can update title", () => {
    const title = "A new title";
    aTodoList.setName(title);
    expect(aTodoList.getName()).toEqual(title);
  });
};
