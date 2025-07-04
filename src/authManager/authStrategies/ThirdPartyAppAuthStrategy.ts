import IThirdPartyAppData from "../../interface/IThirdPartyAppData";
import IAuthData from "../../interface/IAuthData";
import IAuthStrategy from "../../interface/IAuthStrategy";
import IThirdPartyAppRepo from "../../interface/repos/IThirdPartyAppRepo";
import { randomBytes } from "crypto";
import IAPIKeyRepo from "../../interface/repos/IAPIKeyRepo";
import WardenError from "../../errorHandler/definedError/WardenError";
import IHashStrategy from "../../interface/IHashStrategy";

class ThirdPartyAppAuthStrategy implements IAuthStrategy<IThirdPartyAppData> {
  private _appRepo: IThirdPartyAppRepo;
  private _APIKeyRepo: IAPIKeyRepo;
  private _hashStrategy: IHashStrategy;

  constructor(
    appRepo: IThirdPartyAppRepo,
    tokenRepo: IAPIKeyRepo,
    hashStrategy: IHashStrategy,
  ) {
    this._appRepo = appRepo;
    this._APIKeyRepo = tokenRepo;
    this._hashStrategy = hashStrategy;
  }

  public async signup(clientData: IThirdPartyAppData): Promise<IAuthData> {
    try {
      const savedData = await this._appRepo.saveOne(clientData);

      const plainAPIKey = randomBytes(32).toString("hex");
      const hash = await this.hashKey(plainAPIKey);

      await this._APIKeyRepo.saveOne(hash, savedData.id!);

      const authData: IAuthData = {
        apiKey: this.prefixAPIKey(plainAPIKey, savedData.id!),
      };

      return authData;
    } catch (error) {
      throw error;
    }
  }

  public login(loginData: any): Promise<IAuthData> {
    throw "Not implemented";
  }

  public async logout(logoutData: IAuthData): Promise<void> {
    try {
      if (!logoutData.apiKey) {
        throw WardenError.missingProperty({
          missingProperties: ["apiKey"],
        });
      }

      const id = this.parseIdFromString(logoutData.apiKey);
      const apiKey = this.parseAPIKeyFromString(logoutData.apiKey);

      const storedHash = await this._APIKeyRepo.findOneByAppId(id);

      const isValidKey = await this._hashStrategy.verify(apiKey, storedHash);

      if (!isValidKey) {
        throw WardenError.invalidKey();
      }

      await this._APIKeyRepo.revokeByUserId(id);
    } catch (error) {
      throw error;
    }
  }

  public refresh(refreshToken: string): Promise<IAuthData> {
    throw "Not implemented";
  }

  public revokeRefreshToken(refreshToken: string): Promise<void> {
    throw "Not implemented";
  }

  private async hashKey(key: string): Promise<string> {
    try {
      return await this._hashStrategy.hash(key);
    } catch (error) {
      throw error;
    }
  }

  private prefixAPIKey(key: string, id: number): string {
    return `pks_${id}_pke_${key}`;
  }

  private parseIdFromString(key: string): number {
    return Number(key.split("_")[1]);
  }

  private parseAPIKeyFromString(key: string): string {
    return key.split("_")[3];
  }
}

export default ThirdPartyAppAuthStrategy;
