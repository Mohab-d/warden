import AbstractAppError from "../abstracts/AbstractAppError";
import InvalidSchemaHadnlingStrategy from "../errorHandler/errorHandlingStrategies/InvalidSchemaHandlingStrategy";
import NoDataErrorHadnlingStrategy from "../errorHandler/errorHandlingStrategies/NoDataErrorHandlingStrategy";
import NoRecordErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/NoRecordErrorHandlingStrategy";
import UknownErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/UknownErrorHandlingStrategy";
import ValueExistErrorStrategy from "../errorHandler/errorHandlingStrategies/ValueExistErrorStrategy";
import ErrorType from "../errorHandler/ErrorType";
import IErrorHandlingStrategy from "../interface/IErrorHandlingStrategy";

class ErrorHandlingStrategyRegistry {
  private errorHandlingStrategies: Record<
    string,
    () => IErrorHandlingStrategy<any>
  > = {};

  public registerStrategy(
    errorType: ErrorType,
    strategy: () => IErrorHandlingStrategy<any>,
  ): ErrorHandlingStrategyRegistry {
    this.errorHandlingStrategies[errorType] = strategy;
    return this;
  }

  public createHandlingStrategy(
    error: AbstractAppError<any>,
  ): IErrorHandlingStrategy<any> {
    const strategyFactory = this.errorHandlingStrategies[error.type];

    if (!strategyFactory) {
      return new UknownErrorHandlingStrategy();
    }

    return strategyFactory();
  }
}

const errorsRegistry = new ErrorHandlingStrategyRegistry()
  .registerStrategy(
    ErrorType.ERR_VALUE_EXIST,
    () => new ValueExistErrorStrategy(),
  )
  .registerStrategy(
    ErrorType.ERR_INVALID_SCHEMA,
    () => new InvalidSchemaHadnlingStrategy(),
  )
  .registerStrategy(
    ErrorType.ERR_NO_Data,
    () => new NoDataErrorHadnlingStrategy(),
  )
  .registerStrategy(
    ErrorType.ERR_NO_RECORD,
    () => new NoRecordErrorHandlingStrategy(),
  );

export default errorsRegistry;
