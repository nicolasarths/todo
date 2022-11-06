import Identifier from "../Identifier";
import { generateId } from "src/utils";
export default class TodoListID implements Identifier {
  _id: string = this.generateId();

  get id(): string {
    return this._id;
  }

  public generateId(): string {
    return generateId("TodoList");
  }
}
