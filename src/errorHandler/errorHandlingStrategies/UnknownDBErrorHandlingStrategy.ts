import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IUnknownDBContext } from "../contextTypes/IUnknownDBContext";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

class UnknownDBErrorHandlingStrategy
  implements IErrorHandlingStrategy<IUnknownDBContext>
{
  httpCode: number = 500;

  handle(): void {}

  getFormattedError(
    error: AbstractAppError<IUnknownDBContext>,
  ): IAppError<IUnknownDBContext> {
    return error.getFormat();
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_UNKNOWN_DB,
  () => new UnknownDBErrorHandlingStrategy(),
);

export { UnknownDBErrorHandlingStrategy };
