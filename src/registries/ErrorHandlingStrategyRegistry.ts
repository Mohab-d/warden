import AbstractAppError from "../abstracts/AbstractAppError";
import InvalidSchemaErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/InvalidSchemaErrorHandlingStrategy";
import NoDataErrorHadnlingStrategy from "../errorHandler/errorHandlingStrategies/NoDataErrorHandlingStrategy";
import NoRecordErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/NoRecordErrorHandlingStrategy";
import UknownErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/UknownErrorHandlingStrategy";
import ValueExistErrorStrategy from "../errorHandler/errorHandlingStrategies/ValueExistErrorStrategy";
import ErrorType from "../errorHandler/ErrorType";
import IErrorHandlingStrategy from "../interface/IErrorHandlingStrategy";

class ErrorHandlingStrategyRegistry {
  private errorHandlingStrategyFactories: Record<
    string,
    () => IErrorHandlingStrategy<any>
  > = {};

  public registerStrategyFactory(
    errorType: ErrorType,
    strategyFactory: () => IErrorHandlingStrategy<any>,
  ): ErrorHandlingStrategyRegistry {
    this.errorHandlingStrategyFactories[errorType] = strategyFactory;
    return this;
  }

  public getStrategy(
    error: AbstractAppError<any>,
  ): IErrorHandlingStrategy<any> {
    const strategyFactory = this.errorHandlingStrategyFactories[error.type];

    if (!strategyFactory) {
      return new UknownErrorHandlingStrategy();
    }

    return strategyFactory();
  }
}

const errorsRegistry = new ErrorHandlingStrategyRegistry()
  .registerStrategyFactory(
    ErrorType.ERR_VALUE_EXIST,
    () => new ValueExistErrorStrategy(),
  )
  .registerStrategyFactory(
    ErrorType.ERR_INVALID_SCHEMA,
    () => new InvalidSchemaErrorHandlingStrategy(),
  )
  .registerStrategyFactory(
    ErrorType.ERR_NO_Data,
    () => new NoDataErrorHadnlingStrategy(),
  )
  .registerStrategyFactory(
    ErrorType.ERR_NO_RECORD,
    () => new NoRecordErrorHandlingStrategy(),
  );

export default errorsRegistry;
