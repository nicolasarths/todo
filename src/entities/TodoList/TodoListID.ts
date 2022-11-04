import Identifier from "../Identifier";
import { checkId, generateId } from "src/utils";
export default class TodoListID extends Identifier {
  constructor() {
    super();
    super.setId(this.generateId());
  }

  public isId(id: string) {
    return checkId(id, "TodoList");
  }

  public generateId(): string {
    return generateId("TodoList");
  }
}
