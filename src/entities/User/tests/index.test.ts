import User, { UserID } from "..";

describe("User instantiation", () => {
  const originalPassword = "originalPass";
  const user = new User("valid@email.com", originalPassword);
  it("has an id", () => {
    const id = user.getId();
    const identifier = new UserID();
    expect(id).toBeTruthy();
    expect(identifier.isId(id)).toBeTruthy();
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

  it("has a password, which can be altered", () => {
    expect(user.hasPassword()).toBeTruthy();
    expect(user.auth(originalPassword)).toBeTruthy();

    const newPass = "newPassword";
    user.setPassword(newPass);
    expect(user.auth(newPass)).toBeTruthy();
  });
});
