import "dotenv/config";

export enum DBEnum {
  POSTGRES = "postgres",
}

export const appConfigs = {
  port: parseInt(process.env.PORT ?? "8080"),
  secretKey: process.env.SECRET_KEY!,
  refreshKey: process.env.REFRESH_KEY!,
  db: DBEnum.POSTGRES,
  accessTokenDuration: 3600,
  refreshTokenDuration: 24 * 3600 * 30,
  thirdPartyAppKey: process.env.THIRD_PARTY_APP_KEY!,
  bcryptSaltRounds: 10,
};
