import User from "src/entities/User";

export default class Storage {
  private users: User[] = [];

  public addUser(user: User): void {
    if (this.getUserByEmail(user.getEmail()))
      throw Error("Email already exists");
    if (this.getUserById(user.getId()))
      throw Error("Id conflict: a user with the same id already exists");
    this.users.push(user);
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getUserByEmail(email: string): User {
    return this.users.find((user) => user.getEmail() == email);
  }

  public getUserById(id: string): User {
    return this.users.find((user) => user.getId() == id);
  }

  public deleteUserById(id: string): void {
    this.users = this.users.filter((user) => user.getId() != id);
  }
}
