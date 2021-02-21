export class Environment {
  production: boolean;
  baseUrl: string;

  constructor(production: boolean, baseUrl: string) {
    this.production = production;
    this.baseUrl = baseUrl;
  }
}
