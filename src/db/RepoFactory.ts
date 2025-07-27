import { appConfigs, DBEnum } from "../config/appConfigs";
import { WardenError, ErrorType } from "../errorHandler";
import IAPIKeyRepo from "./interfaces/IAPIKeyRepo";
import ICustomerRepo from "./interfaces/ICustomerRepo";
import IThirdPartyAppRepo from "./interfaces/IThirdPartyAppRepo";
import ITokenRepo from "./interfaces/ITokenRepo";
import {
  PGAPIKeyRepo,
  PGCustomerRepo,
  PGThirdPartyAppRepo,
  PGTokenRepo,
} from "./postgres";

class RepoFactory {
  public createCustomerRepo(): ICustomerRepo {
    switch (appConfigs.db) {
      case DBEnum.POSTGRES:
        return new PGCustomerRepo();
      default:
        throw this.createUnknownDBErr();
    }
  }

  public createTokenRepo(): ITokenRepo {
    switch (appConfigs.db) {
      case DBEnum.POSTGRES:
        return new PGTokenRepo();
      default:
        throw this.createUnknownDBErr();
    }
  }

  public createThirdPartyAppRepo(): IThirdPartyAppRepo {
    switch (appConfigs.db) {
      case DBEnum.POSTGRES:
        return new PGThirdPartyAppRepo();
      default:
        throw this.createUnknownDBErr();
    }
  }

  public createAPIKeyRepo(): IAPIKeyRepo {
    switch (appConfigs.db) {
      case DBEnum.POSTGRES:
        return new PGAPIKeyRepo();
      default:
        throw this.createUnknownDBErr();
    }
  }

  private createUnknownDBErr(): WardenError<any> {
    const unknownDBError = WardenError.unknownOperation({
      name: appConfigs.db,
    });
    unknownDBError.message =
      "The database specified in the configs is not implemented";
    unknownDBError.type = ErrorType.ERR_UNKNOWN_DB;
    return unknownDBError;
  }
}

export { RepoFactory, IAPIKeyRepo };
