import { hash, verify } from "argon2";
import { IHashStrategy } from "../../interfaces/IHashStrategy";

class ArgonHashingStrategy implements IHashStrategy {
  public async hash(data: string): Promise<string> {
    return await hash(data);
  }

  public async verify(data: string, encrypted: string): Promise<boolean> {
    return await verify(encrypted, data);
  }
}

export { ArgonHashingStrategy };
