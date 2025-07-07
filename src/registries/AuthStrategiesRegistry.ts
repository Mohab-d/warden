import WardenError from "../errorHandler/definedError/WardenError";
import IAuthStrategiesRegistry from "../interface/IAuthStrategiesRegistry";
import IAuthStrategy from "../interface/IAuthStrategy";
import getCustomerAuthStrategy from "./authStrategyFactories/getCustomerAuthStrategy";
import getThirdPartyAppAuthStrategy from "./authStrategyFactories/getThirdPartyAppAuthStrategy";

class AuthStrategyRegistry implements IAuthStrategiesRegistry {
  private static _instance: AuthStrategyRegistry;
  private _strategyFactories: Record<string, () => IAuthStrategy<any>> = {};

  private constructor() {}

  public static get instance(): AuthStrategyRegistry {
    if (!AuthStrategyRegistry._instance) {
      AuthStrategyRegistry._instance = new AuthStrategyRegistry();
    }

    return AuthStrategyRegistry._instance;
  }

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
        name: name,
      });
    }

    return strategy;
  }
}

AuthStrategyRegistry.instance
  .registerStrategyFactory("customer", getCustomerAuthStrategy)
  .registerStrategyFactory("third-party-app", getThirdPartyAppAuthStrategy);

export default AuthStrategyRegistry;
