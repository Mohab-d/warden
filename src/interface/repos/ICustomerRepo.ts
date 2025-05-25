import ICustomerData from "../ICustomerData";

interface ICustomerRepo {
  findOneById(id: string): Promise<ICustomerData>;
  findOneByUsername(username: string): Promise<ICustomerData>;
  saveOne(data: ICustomerData): Promise<ICustomerData>;
}

export default ICustomerRepo;
