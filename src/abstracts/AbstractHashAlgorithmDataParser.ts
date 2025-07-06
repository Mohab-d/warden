import WardenError from "../errorHandler/definedError/WardenError";
import IHashAlgorithmData from "../interface/IHashAlgorithmData";
import IHashAlgorithmDataParser from "../interface/IHashAlgorithmDataParser";

abstract class AbstractHashAlgorithmDataParser
  implements IHashAlgorithmDataParser
{
  private _nextParser: IHashAlgorithmDataParser | undefined;

  public parseAlgorithmData(hash: string): IHashAlgorithmData {
    if (this._nextParser) {
      return this._nextParser.parseAlgorithmData(hash);
    }

    throw WardenError.unknownOperation({
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
