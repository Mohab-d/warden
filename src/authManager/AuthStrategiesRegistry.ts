import { WardenError } from "../errorHandler";
import { IAuthStrategy } from "./interfaces/IAuthStrategy";

class AuthStrategiesRegistry {
  private static _instance: AuthStrategiesRegistry;
  private _strategyFactories: Record<string, () => IAuthStrategy<any>> = {};

  private constructor() {}

  public static get instance(): AuthStrategiesRegistry {
    if (!AuthStrategiesRegistry._instance) {
      AuthStrategiesRegistry._instance = new AuthStrategiesRegistry();
    }

    return AuthStrategiesRegistry._instance;
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

export { AuthStrategiesRegistry };
