import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IInvalidSchemaContext } from "../contextTypes/IInvalidSchemaContext";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

class ImplementationErrorHandlingStrategy
  implements IErrorHandlingStrategy<any>
{
  httpCode: number = 500;

  handle(error: AbstractAppError<IInvalidSchemaContext>): void {}

  getFormattedError(
    error: AbstractAppError<IInvalidSchemaContext>,
  ): IAppError<IInvalidSchemaContext> {
    return error.getFormat();
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_IMPLEMENTATION,
  () => new ImplementationErrorHandlingStrategy(),
);

export { ImplementationErrorHandlingStrategy };
