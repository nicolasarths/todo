import TodoItem from "..";

export const bunchOfInvalidTypes = [
  0,
  1,
  ["", "a"],
  [0, 1],
  [],
  {},
  { a: "" },
  { 0: 1 },
  new TodoItem(""),
  undefined,
  null,
];
