import Token from "..";
import User from "src/entities/User";

describe("Token", () => {
  const password = "123456";
  const user = new User("user@mail.com", password);
  const newToken = new Token(user, password);
  it("cannot instantiate without authentication user", () => {
    expect(() => new Token(user, "wrongPassword")).toThrow();
  });
  it("has an id", () => {
    expect(newToken.getId()).toBeTruthy();
  });
  it("has an user associated with it by id", () => {
    expect(newToken.getUserId()).toBeTruthy();
    expect(newToken.getUserId()).toEqual(user.getId());
  });
  it("has a date associated with it", () => {
    expect(newToken.getDate()).toBeTruthy();
    expect(newToken.getDate()).toBeInstanceOf(Date);
  });
  it("can validate a real token", () => {
    expect(newToken.getValidity()).toBeTruthy();
  });
});
