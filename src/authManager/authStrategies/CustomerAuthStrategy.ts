import { appConfigs } from "../../config/appConfigs";
import AppError from "../../errorHandler/definedError/AppError";
import ErrorType from "../../errorHandler/ErrorType";
import IAuthData from "../../interface/IAuthData";
import ICustomerData from "../../interface/ICustomerData";
import ICustomerLoginData from "../../interface/ICustomerLoginData";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ICustomerRepo from "../../interface/repos/ICustomerRepo";
import IAuthStrategy from "../../interface/IAuthStrategy";
import ITokenRepo from "../../interface/repos/ITokenRepo";

class CustomerAuthStrategy extends IAuthStrategy<ICustomerData> {
  private _customerRepo: ICustomerRepo;
  private _tokenRepo: ITokenRepo;

  constructor(customerRepo: ICustomerRepo, tokenRepo?: any) {
    super();
    this._customerRepo = customerRepo;
    this._tokenRepo = tokenRepo;
  }

  public async signup(
    clientData: ICustomerData,
  ): Promise<IAuthData<ICustomerData>> {
    try {
      if (!clientData.password) {
        throw new AppError(
          "MissingProperty",
          "You did not provide a password",
          true,
          ErrorType.ERR_No_Data,
        );
      }

      clientData.password = await bcrypt.hash(clientData.password, 10);

      const savedData = await this._customerRepo.saveOne(clientData);

      const tokens = this.generateTokens({ id: savedData.id! });

      this._tokenRepo?.saveOne(tokens.refreshToken);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  public async login(
    loginData: ICustomerLoginData,
  ): Promise<IAuthData<ICustomerData>> {
    try {
      const customer = await this._customerRepo.findOneByUsername(
        loginData.username,
      );

      if (!loginData.username || !loginData.password) {
        throw this.getIncorrectCredentialsError();
      }

      const isValidPassword = await bcrypt.compare(
        loginData.password,
        customer.password!,
      );

      if (!isValidPassword) {
        throw this.getIncorrectCredentialsError();
      }

      return this.generateTokens({ id: customer.id! });
    } catch (error) {
      if (error instanceof AppError && error.type === ErrorType.ERR_NO_RECORD) {
        throw this.getIncorrectCredentialsError();
      }
      throw error;
    }
  }

  public refresh(refreshToken: string): IAuthData<any> {
    try {
      const validPayload = jwt.verify(refreshToken, appConfigs.refreshKey);
      console.log(validPayload);

      return {
        accessToken: jwt.sign(
          { id: (validPayload as any).id },
          appConfigs.secretKey,
          {
            expiresIn: appConfigs.accessTokenDuration,
          },
        ),
      };
    } catch (error) {
      throw error;
    }
  }

  public async logout(id: string): Promise<void> {
    try {
      throw "Not implemented";
    } catch (error) {}
  }

  private generateTokens(payload: object): IAuthData<any> {
    return {
      accessToken: jwt.sign(payload, appConfigs.secretKey, {
        expiresIn: appConfigs.accessTokenDuration,
      }),
      refreshToken: jwt.sign(payload, appConfigs.refreshKey, {
        expiresIn: appConfigs.refreshTokenDuration,
      }),
    };
  }

  private getIncorrectCredentialsError(): AppError<undefined> {
    return new AppError(
      "IncorrectCredentials",
      `Username or password incorrect`,
      true,
      ErrorType.ERR_No_Data,
    );
  }
}

export default CustomerAuthStrategy;
