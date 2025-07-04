import { appConfigs } from "../../../config/appConfigs";
import WardenError from "../../../errorHandler/definedError/WardenError";
import IHashStrategy from "../../../interface/IHashStrategy";
import * as bcrypt from "bcrypt";

class BcryptHashStrategy implements IHashStrategy {
  public async hash(data: string): Promise<string> {
    this.checkStringLength(data);
    return await bcrypt.hash(data, appConfigs.bcryptSaltRounds);
  }

  public async verify(data: string, encrypted: string): Promise<boolean> {
    this.checkStringLength(data);
    return await bcrypt.compare(data, encrypted);
  }

  private checkStringLength(data: string): void {
    if (data.length > 72) {
      const error = WardenError.overflowError({
        plainData: data,
        maxLength: 72,
        dataLength: data.length,
      });

      error.message =
        "BcryptHashStrategy can not hash a string longer than 72 characters";

      throw error;
    }
  }
}

export default BcryptHashStrategy;
