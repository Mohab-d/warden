import ArgonHashingStrategy from "../hasher/hashStrategies/argon/ArgonHashingStrategy";
import BcryptHashStrategy from "../hasher/hashStrategies/bcrypt/BcryptHashStrategy";

type HashAlgorithmName = "bcrypt_2a" | "argon_2";

class HashAlgorithmFactory {
  private _preferredAlgorithm: HashAlgorithmName = "bcrypt_2a";

  public getHashAlgorithm(name?: HashAlgorithmName) {
    if (!name) name = this._preferredAlgorithm;

    switch (name) {
      case "bcrypt_2a":
        return new BcryptHashStrategy();
      case "argon_2":
        return new ArgonHashingStrategy();
    }
  }
}

export default HashAlgorithmFactory;
