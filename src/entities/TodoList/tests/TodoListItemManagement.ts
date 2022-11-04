import TodoList from "..";
import TodoItem from "src/entities/TodoItem";

export default () => {
  let aTodoList: TodoList;

  beforeEach(() => {
    aTodoList = new TodoList("My testing list");
  });
  const newItem = () => new TodoItem("A todo item");
  it("can add item", () => {
    const item = newItem();
    const id = item.getId();
    aTodoList.addItem(item);

    const retrievedItem = aTodoList.getItems()[0];
    const retrievedItemId = retrievedItem.getId();

    expect(retrievedItemId).toEqual(id);
  });
  it("can query for item id", () => {
    const specificItem = newItem();
    const specificId = specificItem.getId();

    const randomItems1 = [newItem(), newItem(), newItem()];
    const randomItems2 = [newItem(), newItem(), newItem()];

    randomItems1.forEach((item) => aTodoList.addItem(item));
    aTodoList.addItem(specificItem);
    randomItems2.forEach((item) => aTodoList.addItem(item));

    const queryResult = aTodoList.getItemById(specificId);
    expect(queryResult).toBeTruthy();

    const queryResultId = queryResult.getId();
    expect(queryResultId).toEqual(specificId);
  });

  it("can query for content (in name or description)", () => {
    const content = "a different content";
    const itemWithSpecificContentInName = new TodoItem(content);
    const itemWithSpecificContentInNameId =
      itemWithSpecificContentInName.getId();

    const itemWithSpecificContentInDesc = newItem();
    itemWithSpecificContentInDesc.setDescription(content);
    const itemWithSpecificContentInDescId =
      itemWithSpecificContentInDesc.getId();

    aTodoList.addItem(itemWithSpecificContentInName);
    aTodoList.addItem(itemWithSpecificContentInDesc);

    const queryResults: TodoItem[] = aTodoList.getItemByContent(content);

    expect(Array.isArray(queryResults)).toBeTruthy();
    expect(queryResults.length).toBe(2);
    expect(queryResults[0].getId()).toEqual(itemWithSpecificContentInNameId);
    expect(queryResults[1].getId()).toEqual(itemWithSpecificContentInDescId);
  });

  it("can get all previously added items", () => {
    const ids: string[] = [];
    for (let i = 0; i < 20; i++) {
      const item = newItem();
      aTodoList.addItem(item);
      ids.push(item.getId());
    }
    const retrievedItems = aTodoList.getItems();
    expect(Array.isArray(retrievedItems)).toBeTruthy();
    expect(retrievedItems.length).toEqual(20);
    retrievedItems.forEach((item, i) => {
      expect(item.getId()).toEqual(ids[i]);
    });
  });
  it("can remove item by id", () => {
    const ids: string[] = [];
    for (let i = 0; i < 10; i++) {
      const item = newItem();
      aTodoList.addItem(item);
      ids.push(item.getId());
    }
    expect(aTodoList.getItems().length).toEqual(10);
    aTodoList.removeItemById(ids[9]);

    const items = aTodoList.getItems();
    expect(items.length).toEqual(9);
    expect(items.find((item) => item.getId() == ids[9])).toBeFalsy();

    expect(() => aTodoList.removeItemById(ids[9])).toThrow("");
  });
  it("can update item by id", () => {
    const ids: string[] = [];
    for (let i = 0; i < 5; i++) {
      const item = newItem();
      aTodoList.addItem(item);
      ids.push(item.getId());
    }

    const name = "This is a different title";
    aTodoList.updateItemName(ids[3], name);
    const desc = "This is another description";
    aTodoList.updateItemDescription(ids[3], desc);
    const item = aTodoList.getItemById(ids[3]);
    expect(item.getName()).toEqual(name);
    expect(item.getDescription()).toEqual(desc);

    expect(() => aTodoList.updateItemName("invalidId", "any name")).toThrow();
    expect(() =>
      aTodoList.updateItemDescription("invalidId", "any description")
    ).toThrow();
  });
};
