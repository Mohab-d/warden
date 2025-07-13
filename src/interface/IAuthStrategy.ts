import IAuthData from "./IAuthData";

interface IAuthStrategy<T> {
  signup(clientData: T): Promise<IAuthData>;
  login(loginData: any): Promise<IAuthData>;
  logout(logoutData: IAuthData): Promise<void>;
  refresh(refreshToken: string): Promise<IAuthData>;
  revokeRefreshToken(refreshToken: string): Promise<void>;
}

export default IAuthStrategy;
