import CustomerAuthStrategy from "../../authManager/authStrategies/CustomerAuthStrategy";
import RepoFactory from "../../factories/RepoFactory";
import IAuthStrategy from "../../interface/IAuthStrategy";

function getCustomerAuthStrategy(): IAuthStrategy<any> {
  const repoFactory = new RepoFactory();
  return new CustomerAuthStrategy(
    repoFactory.createCustomerRepo(),
    repoFactory.createTokenRepo(),
  );
}

export default getCustomerAuthStrategy;
