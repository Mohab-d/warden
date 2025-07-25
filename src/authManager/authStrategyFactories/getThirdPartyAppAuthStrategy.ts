import RepoFactory from "../../factories/RepoFactory";
import { ThirdPartyAppAuthStrategy } from "../authStrategies/ThirdPartyAppAuthStrategy";
import { HashAlgorithmFactory } from "../hasher/hashAlgorithmFactory/HashAlgorithmFactory";

function getThirdPartyAppAuthStrategy() {
  const repoFactory = new RepoFactory();
  return new ThirdPartyAppAuthStrategy(
    repoFactory.createThirdPartyAppRepo(),
    repoFactory.createAPIKeyRepo(),
    new HashAlgorithmFactory(),
  );
}

export { getThirdPartyAppAuthStrategy };
