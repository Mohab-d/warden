import IAuthData from "../interface/IAuthData";

class AbstractAuthStrategy<T, RepoType> {
  protected _repo: RepoType;

  constructor(repo: RepoType) {
    this._repo = repo;
  }

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

export default AbstractAuthStrategy;
