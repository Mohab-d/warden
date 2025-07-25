import IHashAlgorithmData from "./IHashAlgorithmData";

interface IHashAlgorithmDataParser {
  parseAlgorithmData(hash: string): IHashAlgorithmData;
  setNextParser(parser: IHashAlgorithmDataParser): IHashAlgorithmDataParser;
}

export { IHashAlgorithmDataParser };
