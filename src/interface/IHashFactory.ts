import IHashStrategy from "./IHashStrategy";

type HashAlgorithmName = "bcrypt_2a" | "argon_2";

interface IHashFactory {
  getHashAlgorithm(name?: HashAlgorithmName): IHashStrategy;
  getHashAlgorithmFromHash(hash: string): IHashStrategy;
}

export { IHashFactory, HashAlgorithmName };
