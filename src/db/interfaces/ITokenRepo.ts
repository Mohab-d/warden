import ITokenData from "../../interface/ITokenData";

interface ITokenRepo {
  findOne(token: string): Promise<ITokenData>;
  saveOne(token: string, userId: number): Promise<ITokenData>;
  revokeByUserId(userId: number): Promise<void>;
  revokeByToken(token: string): Promise<void>;
}

export default ITokenRepo;
