import Identifier, { IIdentifier } from "../Identifier";
import { checkId, generateId } from "src/utils";

export default class TodoItemID extends Identifier implements IIdentifier {
  constructor() {
    super();
    super.setId(this.generateId());
  }

  public isId(id: string) {
    return checkId(id, "TodoItem");
  }

  public generateId(): string {
    return generateId("TodoItem");
  }
}
