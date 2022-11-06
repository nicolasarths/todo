import Session from "..";
import Storage from "src/entities/Storage";
import Token from "src/entities/Token";
import User from "src/entities/User";

describe("Session", () => {
  const email = "user@mail.com";
  const password = "123456";
  const user = new User(email, password);
  const anotherUser = new User("otheruser@mail", password);

  const storage = new Storage();
  storage.addUser(user);
  storage.addUser(anotherUser);

  const session = new Session(storage);

  const token = new Token(user, password);

  it("user can get token by logging in", () => {
    expect(session.login(email, password)).toBeTruthy();
    expect(session.getToken()).toBeTruthy();
  });

  it("user can logoff, which erases token", () => {
    session.logoff();
    expect(session.isLoggedIn()).toBeFalsy();
  });

  it("can express if the user is logged in", () => {
    session.login(email, password);
    expect(session.isLoggedIn()).toBeTruthy();
  });

  it("if a session has a token, can get user data", () => {
    session.login(email, password);
    expect(session.getUser()).toEqual(user);
  });

  it("user without a token cannot access any database users", () => {
    session.logoff();
    expect(() => session.getUser()).toThrow();
  });
});
