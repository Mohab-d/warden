import IAuthData from "./IAuthData";

class IAuthStrategy<T> {
  public async signup(clientData: T): Promise<IAuthData<T>> {
    throw "Not impelemnted";
  }

  public login(loginData: any): Promise<IAuthData<any>> {
    throw "Not impelemnted";
  }

  public refresh(refreshToken: string): IAuthData<any> {
    throw "Not implemented";
  }
}

export default IAuthStrategy;
