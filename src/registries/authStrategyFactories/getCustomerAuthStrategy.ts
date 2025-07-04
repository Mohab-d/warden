import CustomerAuthStrategy from "../../authManager/authStrategies/CustomerAuthStrategy";
import HashAlgorithmFactory from "../../factories/HashAlgorithmFactory";
import RepoFactory from "../../factories/RepoFactory";
import IAuthStrategy from "../../interface/IAuthStrategy";

function getCustomerAuthStrategy(): IAuthStrategy<any> {
  const repoFactory = new RepoFactory();
  const hashFactory = new HashAlgorithmFactory();
  return new CustomerAuthStrategy(
    repoFactory.createCustomerRepo(),
    repoFactory.createTokenRepo(),
    hashFactory.getHashAlgorithm("argon_2"),
  );
}

export default getCustomerAuthStrategy;
