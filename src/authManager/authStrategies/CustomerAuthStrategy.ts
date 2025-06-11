import { appConfigs } from "../../config/appConfigs";
import WardenError from "../../errorHandler/definedError/WardenError";
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
        throw new WardenError(
          "MissingProperty",
          "You did not provide a password",
          true,
          ErrorType.ERR_No_Data,
        );
      }

      clientData.password = await bcrypt.hash(clientData.password, 10);

      const savedData = await this._customerRepo.saveOne(clientData);

      const tokens = {
        accessToken: this.generateAccessToken({ id: savedData.id }),
        refreshToken: this.generateRefreshToken({ id: savedData.id }),
      };
      await this._tokenRepo?.saveOne(tokens.refreshToken, savedData.id);

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

      const tokens = {
        accessToken: this.generateAccessToken({ id: customer.id! }),
        refreshToken: this.generateRefreshToken({ id: customer.id! }),
      };
      await this._tokenRepo?.saveOne(tokens.refreshToken, customer.id!);

      return tokens;
    } catch (error) {
      if (
        error instanceof WardenError &&
        error.type === ErrorType.ERR_NO_RECORD
      ) {
        throw this.getIncorrectCredentialsError();
      }
      throw error;
    }
  }

  public async refresh(refreshToken: string): Promise<IAuthData<any>> {
    try {
      const validPayload = this.verifyTokenAndGetPayload(
        refreshToken,
        appConfigs.refreshKey,
      );

      const tokenData = await this._tokenRepo.findOne(refreshToken);
      if (!tokenData.active) {
        throw new WardenError(
          "InvalidToken",
          "This token is invalid, you need to login again",
          true,
          ErrorType.ERR_INVALID_TOKEN,
        );
      }

      return {
        accessToken: this.generateAccessToken((validPayload as any).id),
      };
    } catch (error) {
      throw error;
    }
  }

  public async logout(accessToken: string): Promise<void> {
    try {
      const payload = this.verifyTokenAndGetPayload(
        accessToken,
        appConfigs.secretKey,
      );
      const tokenData = await this._tokenRepo.revokeByUserId(
        (payload as any).id,
      );
    } catch (error) {
      throw error;
    }
  }

  public async revokeRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this._tokenRepo.revokeByToken(refreshToken);
    } catch (error) {
      throw error;
    }
  }

  private verifyTokenAndGetPayload(
    token: string,
    secretKey: string,
  ): object | undefined {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload as any;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new WardenError(
          "InvalidToken",
          "This token is invalid, you need to login again",
          true,
          ErrorType.ERR_INVALID_TOKEN,
        );
      } else {
        throw error;
      }
    }
  }

  private generateAccessToken(payload: object): string {
    return jwt.sign(payload, appConfigs.secretKey, {
      expiresIn: appConfigs.accessTokenDuration,
    });
  }

  private generateRefreshToken(payload: object): string {
    return jwt.sign(payload, appConfigs.refreshKey, {
      expiresIn: appConfigs.refreshTokenDuration,
    });
  }

  private getIncorrectCredentialsError(): WardenError<undefined> {
    return new WardenError(
      "IncorrectCredentials",
      `Username or password incorrect`,
      true,
      ErrorType.ERR_No_Data,
    );
  }
}

export default CustomerAuthStrategy;
