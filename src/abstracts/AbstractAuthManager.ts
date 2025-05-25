import AbstractService from "./AbstractService";

abstract class AbstractAuthManager<T> {
  protected service: AbstractService<T, any>;

  constructor(service: AbstractService<T, any>) {
    this.service = service;
  }

  public async signup(data: T): Promise<any> {
    throw "Not implemented";
  }

  public async login(data: T): Promise<string> {
    throw "Not implemented";
  }

  public async logout() {
    throw "Not implemented";
  }
}

export default AbstractAuthManager;
