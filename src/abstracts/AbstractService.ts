abstract class AbstractService<T, RepoType> {
  public async saveClient(data: T): Promise<T> {
    throw "Please define your save method";
  }

  public async getClient(data: T): Promise<string> {
    throw "Please define your getRecord method";
  }
}

export default AbstractService;
