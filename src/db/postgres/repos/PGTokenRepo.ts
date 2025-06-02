import ITokenRepo from "../../../interface/repos/ITokenRepo";

class PGTokenRepo implements ITokenRepo {
  public async findOneById(id: string): Promise<String> {
    throw "Not implemented";
  }

  saveOne(data: any): Promise<any> {
    throw "Not implemented";
  }

  updateOne(id: string, data: any): Promise<any> {
    throw "Not implemented";
  }
}
