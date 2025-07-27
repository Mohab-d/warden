import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IOverflowContext } from "../contextTypes/IOverflowContext";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

class OverflowErrorHandlingStrategy
  implements IErrorHandlingStrategy<IOverflowContext>
{
  httpCode: number = 500;

  handle(error: AbstractAppError<IOverflowContext>): void {}

  getFormattedError(
    error: AbstractAppError<IOverflowContext>,
  ): IAppError<IOverflowContext> {
    return error.getFormat();
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_OVERFLOW,
  () => new OverflowErrorHandlingStrategy(),
);

export { OverflowErrorHandlingStrategy };
