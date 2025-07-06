import AbstractAppError from "../abstracts/AbstractAppError";
import ErrorType from "../errorHandler/ErrorType";
import IErrorHandlingStrategy from "./IErrorHandlingStrategy";

interface IErrorHandlingStrategyRegistry {
  registerStrategyFactory(
    errorType: ErrorType,
    strategyFactory: () => IErrorHandlingStrategy<any>,
  ): IErrorHandlingStrategyRegistry;

  getStrategy(error: AbstractAppError<any>): IErrorHandlingStrategy<any>;
}

export default IErrorHandlingStrategyRegistry;
