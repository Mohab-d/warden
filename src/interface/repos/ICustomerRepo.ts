import ICustomerData from "../ICustomerData";

interface ICustomerRepo {
  findOneById(id: number): Promise<any>;
  saveOne(data: any): Promise<any>;
  updateOne(id: number, data: any): Promise<any>;
  findOneByUsername(username: string): Promise<ICustomerData>;
}

export default ICustomerRepo;
