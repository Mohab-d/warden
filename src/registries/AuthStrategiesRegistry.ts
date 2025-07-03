import WardenError from "../errorHandler/definedError/WardenError";
import IAuthStrategy from "../interface/IAuthStrategy";
import getCustomerAuthStrategy from "./authStrategyFactories/getCustomerAuthStrategy";
import getThirdPartyAppAuthStrategy from "./authStrategyFactories/getThirdPartyAppAuthStrategy";

class AuthStrategyRegistry {
  private _strategyFactories: Record<string, () => IAuthStrategy<any>> = {};

  public registerStrategyFactory(
    name: string,
    strategyFactory: () => IAuthStrategy<any>,
  ): this {
    this._strategyFactories[name] = strategyFactory;
    return this;
  }

  public getStrategy(name: string): IAuthStrategy<any> {
    const strategy = this._strategyFactories[name]();

    if (!strategy) {
      throw WardenError.unknownOperation({
        strategy: name,
      });
    }

    return strategy;
  }
}

const authStrategiesRegistry = new AuthStrategyRegistry()
  .registerStrategyFactory("customer", getCustomerAuthStrategy)
  .registerStrategyFactory("third-party-app", getThirdPartyAppAuthStrategy);

export default authStrategiesRegistry;
