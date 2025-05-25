import AbstractAuthStrategy from "../abstracts/AbstractAuthStrategy";
import AppError from "../errorHandler/definedError/AppError";
import ErrorType from "../errorHandler/ErrorType";
import RepoFactory from "../factories/RepoFactory";
import CustomerAuthStrategy from "./authStrategies/CustomerAuthStrategy";
import AuthStrategiesEnum from "./AuthStrategiesEnum";

class AuthStrategyRegistry {
  private _strategies: Record<string, AbstractAuthStrategy<any, any>> = {};

  public registerStrategy(
    name: AuthStrategiesEnum,
    strategy: AbstractAuthStrategy<any, any>,
  ): this {
    this._strategies[name] = strategy;
    return this;
  }

  public getStrategy(name: string): AbstractAuthStrategy<any, any> {
    switch (name) {
      case "customer":
        return this._strategies[AuthStrategiesEnum.CUSTOMER];
      default:
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
  }
}

const repoFactory = new RepoFactory();

const authStrategiesRegistry = new AuthStrategyRegistry().registerStrategy(
  AuthStrategiesEnum.CUSTOMER,
  new CustomerAuthStrategy(repoFactory.createCustomerRepo()),
);

export default authStrategiesRegistry;
