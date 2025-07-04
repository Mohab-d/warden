import ThirdPartyAppAuthStrategy from "../../authManager/authStrategies/ThirdPartyAppAuthStrategy";
import HashAlgorithmFactory from "../../factories/HashAlgorithmFactory";
import RepoFactory from "../../factories/RepoFactory";

function getThirdPartyAppAuthStrategy() {
  const repoFactory = new RepoFactory();
  const hashFactory = new HashAlgorithmFactory();
  return new ThirdPartyAppAuthStrategy(
    repoFactory.createThirdPartyAppRepo(),
    repoFactory.createAPIKeyRepo(),
    hashFactory.getHashAlgorithm(),
  );
}

export default getThirdPartyAppAuthStrategy;
