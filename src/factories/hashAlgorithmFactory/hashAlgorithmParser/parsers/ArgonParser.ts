import AbstractHashAlgorithmDataParser from "../../../../abstracts/AbstractHashAlgorithmDataParser";
import IHashAlgorithmData from "../../../../interface/IHashAlgorithmData";

class ArgonParser extends AbstractHashAlgorithmDataParser {
  public parseAlgorithmData(hash: string): IHashAlgorithmData {
    const parts = hash.split("$");

    const name = parts[1] ? parts[1] : "";

    if (name === "argon2id" || name === "argon2i" || name === "argon2d") {
      return {
        name: "argon_2",
        version: String(parseInt(parts[2])),
      };
    }

    return super.parseAlgorithmData(hash);
  }
}

export default ArgonParser;
