import RepoFactory from "../../factories/RepoFactory";
import { CustomerAuthStrategy } from "../authStrategies/CustomerAuthStrategy";
import { HashAlgorithmFactory } from "../hasher/hashAlgorithmFactory/HashAlgorithmFactory";
import { IAuthStrategy } from "../interfaces/IAuthStrategy";

function getCustomerAuthStrategy(): IAuthStrategy<any> {
  const repoFactory = new RepoFactory();
  return new CustomerAuthStrategy(
    repoFactory.createCustomerRepo(),
    repoFactory.createTokenRepo(),
    new HashAlgorithmFactory(),
  );
}

export { getCustomerAuthStrategy };
