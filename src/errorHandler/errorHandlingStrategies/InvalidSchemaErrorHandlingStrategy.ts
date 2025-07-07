import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import IInvalidSchemaContext from "../contextTypes/IInvalidSchemaContext";
import ErrorType from "../ErrorType";

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

export default InvalidSchemaHandlingStrategy;
