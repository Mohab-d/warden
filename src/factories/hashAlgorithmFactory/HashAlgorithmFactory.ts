import WardenError from "../../errorHandler/definedError/WardenError";
import ArgonHashingStrategy from "../../hasher/hashStrategies/argon/ArgonHashingStrategy";
import BcryptHashStrategy from "../../hasher/hashStrategies/bcrypt/BcryptHashStrategy";
import IHashAlgorithmDataParser from "../../interface/IHashAlgorithmDataParser";
import { HashAlgorithmName, IHashFactory } from "../../interface/IHashFactory";
import IHashStrategy from "../../interface/IHashStrategy";
import hashAlgorithmParser from "./hashAlgorithmParser/parseAlgorithmData";

class HashAlgorithmFactory implements IHashFactory {
  private _preferredAlgorithm: HashAlgorithmName = "argon_2";
  private _algorithmDataParser: IHashAlgorithmDataParser;

  constructor() {
    this._algorithmDataParser = hashAlgorithmParser;
  }

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
    const algorithmData = this._algorithmDataParser.parseAlgorithmData(hash);

    switch (algorithmData.name) {
      case "bcrypt":
        return new BcryptHashStrategy();
      case "argon_2":
        return new ArgonHashingStrategy();
      default:
        throw WardenError.unknownOperation({
          requestedStrategy: algorithmData.name,
          message: "This hash uses an unkown hashing algorithm",
        });
    }
  }
}

export default HashAlgorithmFactory;
