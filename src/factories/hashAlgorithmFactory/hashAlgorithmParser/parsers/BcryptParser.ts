import AbstractHashAlgorithmDataParser from "../../../../abstracts/AbstractHashAlgorithmDataParser";
import IHashAlgorithmData from "../../../../interface/IHashAlgorithmData";

class BcryptParser extends AbstractHashAlgorithmDataParser {
  public parseAlgorithmData(hash: string): IHashAlgorithmData {
    const parts = hash.split("$");

    const name = parts[1] ? parts[1] : "";

    if (name === "2b") {
      return {
        name: "bcrypt",
        version: parts[2],
      };
    }

    return super.parseAlgorithmData(hash);
  }
}

export default BcryptParser;
