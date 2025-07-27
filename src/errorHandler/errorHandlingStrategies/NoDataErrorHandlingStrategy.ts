import { AbstractAppError } from "../abstracts/AbstractAppError";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

type NoDataContext = Record<string, any>;

class NoDataErrorHadnlingStrategy
  implements IErrorHandlingStrategy<NoDataContext>
{
  httpCode: number = 400;

  handle(error: AbstractAppError<NoDataContext>): void {}

  getFormattedError(
    error: AbstractAppError<NoDataContext>,
  ): IAppError<NoDataContext> {
    return error.getFormat();
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_NO_Data,
  () => new NoDataErrorHadnlingStrategy(),
);

export { NoDataErrorHadnlingStrategy };
