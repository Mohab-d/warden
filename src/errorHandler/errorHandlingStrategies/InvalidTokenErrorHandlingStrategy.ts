import { AbstractAppError } from "../abstracts/AbstractAppError";
import { IInvalidRefreshTokenContext } from "../contextTypes/IInvalidRefreshTokenContext";
import { ErrorHandlingStrategyRegistry } from "../ErrorHandlingStrategyRegistry";
import { ErrorType } from "../ErrorType";
import { IAppError } from "../interfaces/IAppError";
import { IErrorHandlingStrategy } from "../interfaces/IErrorHandlingStrategy";

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

export { InvalidTokenErrorHandlingStrategy };
