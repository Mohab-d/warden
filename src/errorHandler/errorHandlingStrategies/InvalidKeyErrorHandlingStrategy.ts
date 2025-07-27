import { AbstractAppError } from "../abstracts/AbstractAppError";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

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

export { InvalidKeyErrorHandlingStrategy };
