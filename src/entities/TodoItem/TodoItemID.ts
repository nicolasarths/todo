import Identifier from "../Identifier";
import { checkId, generateId } from "src/utils";

export default class TodoItemID implements Identifier {
  _id: string = this.generateId();

  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }

  public generateId(): string {
    return generateId("TodoItem");
  }
}
