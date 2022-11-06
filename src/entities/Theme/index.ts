type ThemeID = string;
type Styles = any;

export default class Theme {
  private id: ThemeID = String(Math.random() * 999999);
  private name: string;
  private styles: Styles;

  constructor(name: string) {
    this.name = name;
  }
}
