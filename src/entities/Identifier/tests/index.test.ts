import Identifier from "..";

describe("Indetifier", () => {
  const identifier = new Identifier();
  it("an id can be set and retrieved", () => {
    identifier.setId("anId123");
    expect(identifier.getId()).toBeTruthy();
  });
});
