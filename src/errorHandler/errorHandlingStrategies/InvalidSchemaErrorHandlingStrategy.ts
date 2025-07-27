import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IInvalidSchemaContext } from "../contextTypes/IInvalidSchemaContext";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

class InvalidSchemaHandlingStrategy
  implements IErrorHandlingStrategy<IInvalidSchemaContext>
{
  httpCode: number = 400;

  handle(error: AbstractAppError<IInvalidSchemaContext>): void {}

  getFormattedError(
    error: AbstractAppError<IInvalidSchemaContext>,
  ): IAppError<IInvalidSchemaContext> {
    return {
      ...error.getFormat(),
    };
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_INVALID_SCHEMA,
  () => new InvalidSchemaHandlingStrategy(),
);

export { InvalidSchemaHandlingStrategy };
