import { AbstractAppError } from "./abstracts/AbstractAppError";
import { UknownErrorHandlingStrategy } from "./errorHandlingStrategies/UknownErrorHandlingStrategy";
import { ErrorType } from "./ErrorType";
import { IErrorHandlingStrategy } from "./interfaces/IErrorHandlingStrategy";
import { IErrorHandlingStrategyRegistry } from "./interfaces/IErrorHandlingStrategyRegistry";

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

export { ErrorHandlingStrategyRegistry };
