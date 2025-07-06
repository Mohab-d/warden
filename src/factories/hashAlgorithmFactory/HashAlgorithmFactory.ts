import WardenError from "../../errorHandler/definedError/WardenError";
import ArgonHashingStrategy from "../../hasher/hashStrategies/argon/ArgonHashingStrategy";
import BcryptHashStrategy from "../../hasher/hashStrategies/bcrypt/BcryptHashStrategy";
import { HashAlgorithmName, IHashFactory } from "../../interface/IHashFactory";
import IHashStrategy from "../../interface/IHashStrategy";

class HashAlgorithmFactory implements IHashFactory {
  private _preferredAlgorithm: HashAlgorithmName = "argon_2";

  public getHashAlgorithm(name?: HashAlgorithmName): IHashStrategy {
    if (!name) name = this._preferredAlgorithm;

    switch (name) {
      case "bcrypt":
        return new BcryptHashStrategy();
      case "argon_2":
        return new ArgonHashingStrategy();
    }
  }

  public getHashAlgorithmFromHash(hash: string): IHashStrategy {
    const algorithmData = this.parseAlgorithmData(hash);

    console.log(algorithmData);

    switch (algorithmData.name) {
      case "2b":
        return new BcryptHashStrategy();
      case "argon2id":
        return new ArgonHashingStrategy();
      default:
        throw WardenError.unknownOperation({
          requestedStrategy: algorithmData.name,
          message: "This hash uses an unkown hashing algorithm",
        });
    }
  }

  private parseAlgorithmData(hash: string): { name: string; version: string } {
    const parts = hash.split("$");

    return {
      name: parts[1],
      version: parts[2],
    };
  }
}

export default HashAlgorithmFactory;
