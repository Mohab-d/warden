import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IUnknownOperationContext } from "../contextTypes/IUnknownOperationContext";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

class UnknownOperationErrorHandlingStrategy
  implements IErrorHandlingStrategy<IUnknownOperationContext>
{
  httpCode: number = 500;

  handle(error: AbstractAppError<IUnknownOperationContext>): void {}

  getFormattedError(
    error: AbstractAppError<IUnknownOperationContext>,
  ): IAppError<IUnknownOperationContext> {
    return error.getFormat();
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_UNKNOWN_OPERATION,
  () => new UnknownOperationErrorHandlingStrategy(),
);

export { UnknownOperationErrorHandlingStrategy };
