import ITokenData from "../../../interface/ITokenData";
import ITokenRepo from "../../interfaces/ITokenRepo";
import pgPool from "../pgPool";

class PGTokenRepo implements ITokenRepo {
  public async findOne(token: string): Promise<ITokenData> {
    let db;
    try {
      db = await pgPool.connect();

      const result = await db.query(
        "SELECT * FROM refresh_token WHERE token = $1",
        [token],
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }

  public async saveOne(token: string, userId: number): Promise<ITokenData> {
    let db;
    try {
      db = await pgPool.connect();

      const result = await db.query(
        "INSERT INTO refresh_token (token, active, user_id) VALUES ($1, $2, $3) RETURNING *",
        [token, true, userId],
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }

  public async revokeByUserId(userId: number): Promise<void> {
    let db;
    try {
      db = await pgPool.connect();

      await db.query(
        "UPDATE refresh_token SET active = FALSE WHERE user_id = $1",
        [userId],
      );
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }

  public async revokeByToken(token: string): Promise<void> {
    let db;
    try {
      db = await pgPool.connect();

      await db.query(
        "UPDATE refresh_token SET active = FALSE WHERE token = $1",
        [token],
      );
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }
}

export { PGTokenRepo };
