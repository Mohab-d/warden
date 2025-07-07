import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import IOverflowContext from "../contextTypes/IOverflowContext";
import ErrorType from "../ErrorType";

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

export default OverflowErrorHandlingStrategy;
