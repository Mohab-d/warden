import { WardenError } from "../../../errorHandler";
import { ArgonHashingStrategy } from "../hashStrategies/argon/ArgonHashingStrategy";
import { BcryptHashStrategy } from "../hashStrategies/bcrypt/BcryptHashStrategy";
import { IHashAlgorithmDataParser } from "../interfaces/IHashAlgorithmDataParser";
import { HashAlgorithmName, IHashFactory } from "../interfaces/IHashFactory";
import { IHashStrategy } from "../interfaces/IHashStrategy";
import { hashAlgorithmParser } from "./hashAlgorithmParser/parseAlgorithmData";

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
          name: "Unknown",
          message: "This hash uses an unkown hashing algorithm",
        });
    }
  }
}

export { HashAlgorithmFactory };
