import { appConfigs, DBEnum } from "../config/appConfigs";
import PGCustomerRepo from "../db/postgres/repos/PGCustomerRepo";
import AppError from "../errorHandler/definedError/AppError";
import ErrorType from "../errorHandler/ErrorType";
import ICustomerRepo from "../interface/repos/ICustomerRepo";

class RepoFactory {
  public createCustomerRepo(): ICustomerRepo {
    switch (appConfigs.db) {
      case DBEnum.POSTGRES:
        return new PGCustomerRepo();
      default:
        throw this.createUnknownDBErr();
    }
  }

  private createUnknownDBErr(): AppError<any> {
    return new AppError(
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
