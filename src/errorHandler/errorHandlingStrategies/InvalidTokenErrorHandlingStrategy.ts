import AbstractAppError from "../../abstracts/AbstractAppError";
import IAppError from "../../interface/IAppError";
import IErrorHandlingStrategy from "../../interface/IErrorHandlingStrategy";
import ErrorHandlingStrategyRegistry from "../../registries/ErrorHandlingStrategyRegistry";
import IInvalidRefreshTokenContext from "../contextTypes/IInvalidRefreshTokenContext";
import ErrorType from "../ErrorType";

class InvalidTokenErrorHandlingStrategy
  implements IErrorHandlingStrategy<IInvalidRefreshTokenContext>
{
  public httpCode: number = 400;

  public handle(error: AbstractAppError<IInvalidRefreshTokenContext>): void {}

  public getFormattedError(
    error: AbstractAppError<IInvalidRefreshTokenContext>,
  ): IAppError<IInvalidRefreshTokenContext> {
    return error.getFormat();
  }
}

ErrorHandlingStrategyRegistry.instance.registerStrategyFactory(
  ErrorType.ERR_INVALID_TOKEN,
  () => new InvalidTokenErrorHandlingStrategy(),
);

export default InvalidTokenErrorHandlingStrategy;
