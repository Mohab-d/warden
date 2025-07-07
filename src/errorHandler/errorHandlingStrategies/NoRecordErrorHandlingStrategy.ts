import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import ErrorType from "../ErrorType";

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

export default NoRecordErrorHandlingStrategy;
