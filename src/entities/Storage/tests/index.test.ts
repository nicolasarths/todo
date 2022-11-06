import Storage from "..";
import User from "src/entities/User";

describe("Storage", () => {
  const storage = new Storage();
  const users = [
    {
      email: "abc@mail.com",
      password: "012345",
    },
    {
      email: "abcefg@mail.com",
      password: "012345",
    },
    {
      email: "hij@mail.com",
      password: "012345",
    },
    {
      email: "klmn@mail.com",
      password: "012345",
    },
    {
      email: "opqrs@mail.com",
      password: "012345",
    },
  ].map(({ email, password }) => new User(email, password));

  it("can store users", () => {
    users.forEach((user) => storage.addUser(user));
    const retrievedUsers = storage.getUsers();
    expect(retrievedUsers).toBeTruthy();
  });

  it("can't store user with email already registered", () => {
    expect(() => storage.addUser(users[0])).toThrow();
  });

  it("can't store user with id already registered", () => {
    expect(() => storage.addUser(users[1])).toThrow();
  });

  it("can delete user", () => {
    storage.deleteUserById(users[0].getId());
    expect(storage.getUserByEmail(users[0].getEmail())).toBeFalsy();
    expect(storage.getUserById(users[0].getId())).toBeFalsy();
  });
});
