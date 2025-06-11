import IAuthData from "./IAuthData";

class IAuthStrategy<T> {
  public async signup(clientData: T): Promise<IAuthData<T>> {
    throw "Not impelemnted";
  }

  public async login(loginData: any): Promise<IAuthData<any>> {
    throw "Not impelemnted";
  }

  public async logout(id: string): Promise<void> {
    throw "Not implemented";
  }

  public async refresh(refreshToken: string): Promise<IAuthData<any>> {
    throw "Not implemented";
  }

  public async revokeRefreshToken(refreshToken: string): Promise<void> {
    throw "Not implemented";
  }
}

export default IAuthStrategy;
