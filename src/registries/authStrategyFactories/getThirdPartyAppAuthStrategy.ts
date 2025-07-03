import ThirdPartyAppAuthStrategy from "../../authManager/authStrategies/ThirdPartyAppAuthStrategy";
import RepoFactory from "../../factories/RepoFactory";

function getThirdPartyAppAuthStrategy() {
  const repoFactory = new RepoFactory();
  return new ThirdPartyAppAuthStrategy(
    repoFactory.createThirdPartyAppRepo(),
    repoFactory.createAPIKeyRepo(),
  );
}

export default getThirdPartyAppAuthStrategy;
