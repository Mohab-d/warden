import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import ErrorType from "../ErrorType";

class InvalidKeyErrorHandlingStrategy implements IErrorHandlingStrategy<any> {
  httpCode: number = 400;

  handle(error: AbstractAppError<any>): void {}

  getFormattedError(error: AbstractAppError<any>): IAppError<any> {
    return error.getFormat();
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_INVALID_KEY,
  () => new InvalidKeyErrorHandlingStrategy(),
);

export default InvalidKeyErrorHandlingStrategy;
