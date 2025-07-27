interface IAPIKeyRepo {
  findOne(apiKey: string): Promise<string>;
  findOneByAppId(id: number): Promise<string>;
  saveOne(apiKey: string, userId: number): Promise<string>;
  revokeByUserId(userId: number): Promise<void>;
  revokeByKey(Key: string): Promise<void>;
}

export default IAPIKeyRepo;
