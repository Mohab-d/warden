import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";

type NoDataContext = Record<string, any>;

class NoDataErrorHadnlingStrategy
  implements IErrorHandlingStrategy<NoDataContext>
{
  httpCode: number = 400;

  handle(error: AbstractAppError<NoDataContext>): void {}

  getFormattedError(
    error: AbstractAppError<NoDataContext>,
  ): IAppError<NoDataContext> {
    return {
      ...error.getFormat(),
    };
  }
}

export default NoDataErrorHadnlingStrategy;
