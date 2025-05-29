import AbstractAuthStrategy from "../abstracts/AbstractAuthStrategy";
import AppError from "../errorHandler/definedError/AppError";
import ErrorType from "../errorHandler/ErrorType";
import RepoFactory from "../factories/RepoFactory";
import CustomerAuthStrategy from "./authStrategies/CustomerAuthStrategy";

class AuthStrategyRegistry {
  private _strategies: Record<string, AbstractAuthStrategy<any, any>> = {};

  public registerStrategy(
    name: string,
    strategy: AbstractAuthStrategy<any, any>,
  ): this {
    this._strategies[name] = strategy;
    return this;
  }

  public getStrategy(name: string): AbstractAuthStrategy<any, any> {
    const strategy = this._strategies[name];

    if (!strategy) {
      throw new AppError(
        "UnknownStrategy",
        `You tried to access a ${name} strategy, but this strategy is not registerd`,
        true,
        ErrorType.ERR_INVALID_OPERATION,
        {
          strategyName: name,
        },
      );
    }

    return strategy;
  }
}

const repoFactory = new RepoFactory();

const authStrategiesRegistry = new AuthStrategyRegistry().registerStrategy(
  "customer",
  new CustomerAuthStrategy(repoFactory.createCustomerRepo()),
);

export default authStrategiesRegistry;
