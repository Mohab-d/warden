import IAuthStrategy from "./IAuthStrategy";

interface IAuthStrategiesRegistry {
  registerStrategyFactory(
    name: string,
    strategyFactory: () => IAuthStrategy<any>,
  ): IAuthStrategiesRegistry;

  getStrategy(name: string): IAuthStrategy<any>;
}

export default IAuthStrategiesRegistry;
