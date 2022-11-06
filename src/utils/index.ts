import Identifier from "src/entities/Identifier";

export const generateId = (prefix: string) => {
  return prefix + "#" + Math.random() * 100000000000000000;
};

export const checkId = (id: string, prefix: string) => {
  if (id.match(prefix + "#\\w{10}\\w*")) return true;
  else return false;
};
