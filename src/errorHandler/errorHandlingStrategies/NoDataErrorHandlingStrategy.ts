import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import ErrorType from "../ErrorType";

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

export default NoDataErrorHadnlingStrategy;
