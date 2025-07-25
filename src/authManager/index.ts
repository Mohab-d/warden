import { AuthStrategiesRegistry } from "./AuthStrategiesRegistry";
import { getCustomerAuthStrategy } from "./authStrategyFactories/getCustomerAuthStrategy";
import { getThirdPartyAppAuthStrategy } from "./authStrategyFactories/getThirdPartyAppAuthStrategy";
import { IAuthStrategy } from "./interfaces/IAuthStrategy";

AuthStrategiesRegistry.instance
  .registerStrategyFactory("customer", getCustomerAuthStrategy)
  .registerStrategyFactory("third-party-app", getThirdPartyAppAuthStrategy);

export { AuthStrategiesRegistry, IAuthStrategy };
