import WardenError from "../errorHandler/definedError/WardenError";
import IAuthStrategy from "../interface/IAuthStrategy";
import getCustomerAuthStrategy from "./authStrategyFactories/getCustomerAuthStrategy";

class AuthStrategyRegistry {
  private _strategiesFactories: Record<string, () => IAuthStrategy<any>> = {};

  public registerStrategyFactory(
    name: string,
    strategyFactory: () => IAuthStrategy<any>,
  ): this {
    this._strategiesFactories[name] = strategyFactory;
    return this;
  }

  public getStrategy(name: string): IAuthStrategy<any> {
    const strategy = this._strategiesFactories[name]();

    if (!strategy) {
      throw WardenError.unknownOperation({
        strategy: name,
      });
    }

    return strategy;
  }
}

const authStrategiesRegistry =
  new AuthStrategyRegistry().registerStrategyFactory(
    "customer",
    getCustomerAuthStrategy,
  );

export default authStrategiesRegistry;
