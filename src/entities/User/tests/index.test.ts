import User, { UserID } from "..";
import TodoApp from "src/entities/TodoApp";
import exampleLists from "src/entities/TodoApp/exampleLists";

describe("User instantiation", () => {
  const originalPassword = "originalPass";
  const user = new User("valid@email.com", originalPassword);
  it("has an id", () => {
    const id = user.getId();
    expect(id).toBeTruthy();
    expect(id).toBeInstanceOf(UserID);
  });

  it("a name can be set, and then altered", () => {
    const name = "username";
    user.setName(name);
    expect(user.getName()).toBeTruthy();

    const newName = "New user name";
    user.setName(newName);
  });

  it("has an email, which can be altered", () => {
    expect(user.getEmail()).toBeTruthy();
    const newEmail = "new@email.com";
    user.setEmail(newEmail);
    expect(user.getEmail()).toEqual(newEmail);
  });

  it("has unverified email by default", () => {
    expect(user.getVerifiedEmail()).toBeFalsy();
  });

  it("can verify set email as verified", () => {
    user.setVerifiedEmail(true);
    expect(user.getVerifiedEmail()).toBeTruthy();
  });

  it("has a password, which can be altered", () => {
    expect(user.hasPassword()).toBeTruthy();
    expect(user.auth(originalPassword)).toBeTruthy();

    const newPass = "newPassword";
    user.setPassword(newPass);
    expect(user.auth(newPass)).toBeTruthy();
  });

  it("is born with one already", () => {
    expect(user.getApp()).toBeTruthy();
    expect(user.getApp()).toBeInstanceOf(TodoApp);
    expect(user.getApp().getOwnerId()).toEqual(user.getId());
  });
  it("starts off with example lists", () => {
    expect(user.getLists().length).toBe(exampleLists.length);
  });
  it("can remove all lists", () => {
    user.removeAllLists();
    expect(user.getLists().length).toBe(0);
  });
  it("can create lists", () => {
    user.createList("a todo list");
    expect(user.getLists().length).toBe(1);
  });
});
