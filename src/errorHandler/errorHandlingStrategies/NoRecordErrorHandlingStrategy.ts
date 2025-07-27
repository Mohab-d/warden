import { AbstractAppError } from "../abstracts/AbstractAppError";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

class NoRecordErrorHandlingStrategy
  implements IErrorHandlingStrategy<undefined>
{
  httpCode: number = 404;

  handle(error: AbstractAppError<undefined>): void {}

  getFormattedError(error: AbstractAppError<undefined>): IAppError<undefined> {
    return {
      ...error.getFormat(),
    };
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_NO_RECORD,
  () => new NoRecordErrorHandlingStrategy(),
);

export { NoRecordErrorHandlingStrategy };
