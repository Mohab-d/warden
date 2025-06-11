import WardenError from "../errorHandler/definedError/WardenError";
import ErrorType from "../errorHandler/ErrorType";
import RepoFactory from "../factories/RepoFactory";
import IAuthStrategy from "../interface/IAuthStrategy";
import CustomerAuthStrategy from "./authStrategies/CustomerAuthStrategy";

class AuthStrategyRegistry {
  private _strategies: Record<string, IAuthStrategy<any>> = {};

  public registerStrategy(name: string, strategy: IAuthStrategy<any>): this {
    this._strategies[name] = strategy;
    return this;
  }

  public getStrategy(name: string): IAuthStrategy<any> {
    const strategy = this._strategies[name];

    if (!strategy) {
      throw new WardenError(
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
  new CustomerAuthStrategy(
    repoFactory.createCustomerRepo(),
    repoFactory.createTokenRepo(),
  ),
);

export default authStrategiesRegistry;
