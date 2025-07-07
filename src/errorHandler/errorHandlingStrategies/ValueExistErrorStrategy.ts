import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import IValueExistContext from "../contextTypes/IValueExistContext";
import ErrorType from "../ErrorType";

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

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_VALUE_EXIST,
  () => new ValueExistErrorStrategy(),
);

export default ValueExistErrorStrategy;
