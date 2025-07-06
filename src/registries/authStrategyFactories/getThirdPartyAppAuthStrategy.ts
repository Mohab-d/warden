import ThirdPartyAppAuthStrategy from "../../authManager/authStrategies/ThirdPartyAppAuthStrategy";
import HashAlgorithmFactory from "../../factories/hashAlgorithmFactory/HashAlgorithmFactory";
import RepoFactory from "../../factories/RepoFactory";

function getThirdPartyAppAuthStrategy() {
  const repoFactory = new RepoFactory();
  return new ThirdPartyAppAuthStrategy(
    repoFactory.createThirdPartyAppRepo(),
    repoFactory.createAPIKeyRepo(),
    new HashAlgorithmFactory(),
  );
}

export default getThirdPartyAppAuthStrategy;
