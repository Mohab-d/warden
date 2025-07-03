import IAuthData from "./IAuthData";

class IAuthStrategy<T> {
  public async signup(clientData: T): Promise<IAuthData> {
    throw "Not impelemnted";
  }

  public async login(loginData: any): Promise<IAuthData> {
    throw "Not impelemnted";
  }

  public async logout(logoutData: IAuthData): Promise<void> {
    throw "Not implemented";
  }

  public async refresh(refreshToken: string): Promise<IAuthData> {
    throw "Not implemented";
  }

  public async revokeRefreshToken(refreshToken: string): Promise<void> {
    throw "Not implemented";
  }
}

export default IAuthStrategy;
