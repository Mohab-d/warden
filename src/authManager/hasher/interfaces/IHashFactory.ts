import { IHashStrategy } from "./IHashStrategy";

type HashAlgorithmName = "bcrypt" | "argon_2";

interface IHashFactory {
  getHashAlgorithm(name?: HashAlgorithmName): IHashStrategy;
  getHashAlgorithmFromHash(hash: string): IHashStrategy;
}

export { IHashFactory, HashAlgorithmName };
