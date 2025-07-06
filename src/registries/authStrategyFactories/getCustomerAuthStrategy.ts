import CustomerAuthStrategy from "../../authManager/authStrategies/CustomerAuthStrategy";
import HashAlgorithmFactory from "../../factories/hashAlgorithmFactory/HashAlgorithmFactory";
import RepoFactory from "../../factories/RepoFactory";
import IAuthStrategy from "../../interface/IAuthStrategy";

function getCustomerAuthStrategy(): IAuthStrategy<any> {
  const repoFactory = new RepoFactory();
  return new CustomerAuthStrategy(
    repoFactory.createCustomerRepo(),
    repoFactory.createTokenRepo(),
    new HashAlgorithmFactory(),
  );
}

export default getCustomerAuthStrategy;
