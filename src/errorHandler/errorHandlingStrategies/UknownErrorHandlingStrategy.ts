import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

class UknownErrorHandlingStrategy implements IErrorHandlingStrategy<any> {
  httpCode: number = 500;

  handle(error: AbstractAppError<undefined>): void {}

  getFormattedError(error: AbstractAppError<undefined>): IAppError<undefined> {
    return error.getFormat();
  }
}

export { UknownErrorHandlingStrategy };
