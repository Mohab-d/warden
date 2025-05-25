import AbstractAppError from "../abstracts/AbstractAppError";
import UknownErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/UknownErrorHandlingStrategy";
import ErrorType from "../errorHandler/ErrorType";
import IErrorHandlingStrategy from "../interface/IErrorHandlingStrategy";

class ErrorHandlingStrategyRegistry {
  private errorHandlingStrategies: Record<string, IErrorHandlingStrategy<any>> =
    {};

  public registerStrategy(
    errorType: ErrorType,
    strategy: IErrorHandlingStrategy<any>,
  ): ErrorHandlingStrategyRegistry {
    this.errorHandlingStrategies[errorType] = strategy;
    return this;
  }

  public createHandlingStrategy(
    error: AbstractAppError<any>,
  ): IErrorHandlingStrategy<any> {
    const strategy = this.errorHandlingStrategies[error.type];

    if (!strategy) {
      return new UknownErrorHandlingStrategy();
    }

    return strategy;
  }
}

export default ErrorHandlingStrategyRegistry;
