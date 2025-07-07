import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";

class UknownErrorHandlingStrategy implements IErrorHandlingStrategy<any> {
  httpCode: number = 500;

  handle(error: AbstractAppError<undefined>): void {}

  getFormattedError(error: AbstractAppError<undefined>): IAppError<undefined> {
    return error.getFormat();
  }
}

export default UknownErrorHandlingStrategy;
