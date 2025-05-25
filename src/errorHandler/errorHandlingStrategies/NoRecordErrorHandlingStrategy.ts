import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";

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

export default NoRecordErrorHandlingStrategy;
