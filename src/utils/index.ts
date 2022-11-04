export const generateId = (prefix) => {
  return prefix + "#" + Math.random() * 100000000000000000;
};

export const checkId = (id, prefix) => {
  return id.match(prefix + "#\\w{10}\\w*");
};
