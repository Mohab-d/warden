import AbstractHashAlgorithmDataParser from "../../../../abstracts/AbstractHashAlgorithmDataParser";
import { IHashAlgorithmData } from "../../../interfaces/IHashAlgorithmData";

class BcryptParser extends AbstractHashAlgorithmDataParser {
  public parseAlgorithmData(hash: string): IHashAlgorithmData {
    const parts = hash.split("$");

    const version = parts[1] ? parts[1] : "";

    if (version === "2b") {
      return {
        name: "bcrypt",
        version: version,
      };
    }

    return super.parseAlgorithmData(hash);
  }
}

export { BcryptParser };
