//TODO: This abstraction is too generic using T, even this should have some sort of abstracted interface
abstract class AbstractAuthDB {
  public async saveClient(data: any): Promise<any> {
    throw "Please implement saveCleint";
  }
  public async getPassword(data: any): Promise<string> {
    throw "Please implement getHash in AbstractAuthDB";
  }
}

export default AbstractAuthDB;

/*
 * insertOne()
 * insertMany()
 * getOne(id)
 * getMany(ids[], start, end)
 *
 * */
