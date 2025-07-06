import AbstractHashAlgorithmDataParser from "../../../../abstracts/AbstractHashAlgorithmDataParser";
import IHashAlgorithmData from "../../../../interface/IHashAlgorithmData";

class ArgonParser extends AbstractHashAlgorithmDataParser {
  public parseAlgorithmData(hash: string): IHashAlgorithmData {
    const parts = hash.split("$");

    const name = parts[1] ? parts[1] : "";

    if (name.includes("argon")) {
      return {
        name: "argon_2",
        version: parts[2],
      };
    }

    return super.parseAlgorithmData(hash);
  }
}

export default ArgonParser;
