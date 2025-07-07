import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import IUnknownDBContext from "../contextTypes/IUnknownDBContext";
import ErrorType from "../ErrorType";

class UnknownDBErrorHandlingStrategy
  implements IErrorHandlingStrategy<IUnknownDBContext>
{
  httpCode: number = 500;

  handle(error: AbstractAppError<IUnknownDBContext>): void {}

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

export default UnknownDBErrorHandlingStrategy;
