import AbstractAppError from "../abstracts/AbstractAppError";
import InvalidSchemaErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/InvalidSchemaErrorHandlingStrategy";
import NoDataErrorHadnlingStrategy from "../errorHandler/errorHandlingStrategies/NoDataErrorHandlingStrategy";
import NoRecordErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/NoRecordErrorHandlingStrategy";
import UknownErrorHandlingStrategy from "../errorHandler/errorHandlingStrategies/UknownErrorHandlingStrategy";
import ValueExistErrorStrategy from "../errorHandler/errorHandlingStrategies/ValueExistErrorStrategy";
import ErrorType from "../errorHandler/ErrorType";
import IErrorHandlingStrategy from "../interface/IErrorHandlingStrategy";
import IErrorHandlingStrategyRegistry from "../interface/IErrorHandlingStrategyRegistry";

class ErrorHandlingStrategyRegistry implements IErrorHandlingStrategyRegistry {
  private static _instance: IErrorHandlingStrategyRegistry;
  private errorHandlingStrategyFactories: Record<
    string,
    () => IErrorHandlingStrategy<any>
  > = {};

  private constructor() {}

  public static get instance(): IErrorHandlingStrategyRegistry {
    if (!ErrorHandlingStrategyRegistry._instance) {
      ErrorHandlingStrategyRegistry._instance =
        new ErrorHandlingStrategyRegistry();
    }

    return ErrorHandlingStrategyRegistry._instance;
  }

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

const errorsRegistry = ErrorHandlingStrategyRegistry.instance
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
