import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import IValueExistContext from "../contextTypes/IValueExistContext";

class ValueExistErrorStrategy
  implements IErrorHandlingStrategy<IValueExistContext>
{
  httpCode: number = 409;

  public handle(error: AbstractAppError<IValueExistContext>): void {}

  public getFormattedError(
    error: AbstractAppError<IValueExistContext>,
  ): IAppError<IValueExistContext> {
    error.message = `Value ${error.context?.valueName ?? "unknown"} already exist`;

    return error.getFormat();
  }
}

export default ValueExistErrorStrategy;
