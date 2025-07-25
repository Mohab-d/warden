import WardenError from "../../errorHandler/definedError/WardenError";
import { IHashAlgorithmData } from "../hasher/interfaces/IHashAlgorithmData";
import { IHashAlgorithmDataParser } from "../hasher/interfaces/IHashAlgorithmDataParser";

abstract class AbstractHashAlgorithmDataParser
  implements IHashAlgorithmDataParser
{
  private _nextParser: IHashAlgorithmDataParser | undefined;

  public parseAlgorithmData(hash: string): IHashAlgorithmData {
    if (this._nextParser) {
      return this._nextParser.parseAlgorithmData(hash);
    }

    throw WardenError.unknownOperation({
      name: "Unknown",
      message:
        "Could not specify which hashing algorithm is used to hash this password",
    });
  }

  public setNextParser(
    parser: IHashAlgorithmDataParser,
  ): IHashAlgorithmDataParser {
    this._nextParser = parser;
    return parser;
  }
}

export default AbstractHashAlgorithmDataParser;
