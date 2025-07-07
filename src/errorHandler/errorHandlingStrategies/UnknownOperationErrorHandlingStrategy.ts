import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import IUnknownOperationContext from "../contextTypes/IUnknownOperationContext";
import ErrorType from "../ErrorType";

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

export default UnknownOperationErrorHandlingStrategy;
