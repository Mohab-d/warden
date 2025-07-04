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

  public async signup(clientData: ICustomerData): Promise<IAuthData> {
    if (!clientData.password) {
      throw WardenError.missingProperty({
        unprovidedProperties: ["password"],
      });
    }

    clientData.password = await bcrypt.hash(
      clientData.password,
      appConfigs.passwordSaltRounds,
    );

    const savedData = await this._customerRepo.saveOne(clientData);

    const tokens = {
      accessToken: this.generateAccessToken({ id: savedData.id }),
      refreshToken: this.generateRefreshToken({ id: savedData.id }),
    };
    await this._tokenRepo?.saveOne(tokens.refreshToken, savedData.id);

    return tokens;
  }

  public async login(loginData: ICustomerLoginData): Promise<IAuthData> {
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

  public async refresh(refreshToken: string): Promise<IAuthData> {
    try {
      const validPayload = this.verifyTokenAndGetPayload(
        refreshToken,
        appConfigs.refreshKey,
      );

      const tokenData = await this._tokenRepo.findOne(refreshToken);
      if (!tokenData.active) {
        throw WardenError.invalidToken();
      }

      return {
        accessToken: this.generateAccessToken((validPayload as any).id),
      };
    } catch (error) {
      throw error;
    }
  }

  public async logout(logoutData: IAuthData): Promise<void> {
    try {
      if (!logoutData.accessToken) {
        throw WardenError.missingProperty({
          missingProperties: ["accessToken"],
        });
      }

      const payload = this.verifyTokenAndGetPayload(
        logoutData.accessToken,
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
        throw WardenError.invalidToken();
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
    return WardenError.incorrectCredentials({
      incorrectCredentials: ["username", "password"],
    });
  }
}

export default CustomerAuthStrategy;
