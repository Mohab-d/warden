import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IValueExistContext } from "../contextTypes/IValueExistContext";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

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

export { ValueExistErrorStrategy };
