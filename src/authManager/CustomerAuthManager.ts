import * as jsonwebtoken from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import AbstractAuthManager from "../abstracts/AbstractAuthManager";
import { appConfigs } from "../config/appConfigs";
import ICustomerData from "../interface/ICustomerData";

class CustomerAuthManager extends AbstractAuthManager<ICustomerData> {
  public async signup(data: ICustomerData) {
    try {
      data.password = await this.hashPassword(data.password!);

      const newCustomer = await this.service.save(data);

      const token = this.generateToken(data, appConfigs.secretKey ?? "");

      return {
        newCustomer,
        token: token,
      };
    } catch (err) {
      throw err;
    }
  }

  private generateToken(data: ICustomerData, secretKey: string): string {
    return jsonwebtoken.sign(data, secretKey);
  }

  private async hashPassword(plainPassword: string): Promise<string> {
    try {
      return await bcrypt.hash(plainPassword, 10);
    } catch (err) {
      throw err;
    }
  }

  public async login(data: ICustomerData): Promise<string> {
    try {
      const hash = await this.service.getHash(data);
      const hashMatch = await bcrypt.compare(data.password!, hash);

      if (hashMatch) {
        return this.generateToken(data, appConfigs.secretKey ?? "");
      }

      throw new Error("could not generate token");
    } catch (err) {
      throw err;
    }
  }
}

export default CustomerAuthManager;
