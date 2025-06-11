import { appConfigs, DBEnum } from "../config/appConfigs";
import PGCustomerRepo from "../db/postgres/repos/PGCustomerRepo";
import PGTokenRepo from "../db/postgres/repos/PGTokenRepo";
import WardenError from "../errorHandler/definedError/WardenError";
import ErrorType from "../errorHandler/ErrorType";
import ICustomerRepo from "../interface/repos/ICustomerRepo";
import ITokenRepo from "../interface/repos/ITokenRepo";

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

  private createUnknownDBErr(): WardenError<any> {
    return new WardenError(
      "UnknownDatabase",
      "The data base specified in the configs is not implemented",
      true,
      ErrorType.ERR_UNKNOWN_DB,
      {
        configuredDB: appConfigs.db,
      },
    );
  }
}

export default RepoFactory;
