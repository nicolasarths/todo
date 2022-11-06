export default abstract class Identifier {
  abstract _id: string;
  abstract get id(): string;
  abstract set id(id: any);
}
