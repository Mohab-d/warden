interface IBaseRepo {
  findOneById(id: string): Promise<any>;
  saveOne(data: any): Promise<any>;
  updateOne(id: string, data: any): Promise<any>;
}

export default IBaseRepo;
