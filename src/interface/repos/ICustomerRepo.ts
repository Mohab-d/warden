import ICustomerData from "../ICustomerData";
import IBaseRepo from "./IBaseRepo";

interface ICustomerRepo extends IBaseRepo {
  findOneByUsername(username: string): Promise<ICustomerData>;
}

export default ICustomerRepo;
