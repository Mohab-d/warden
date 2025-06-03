import ITokenRepo from "../../../interface/repos/ITokenRepo";
import pgPool from "../pgPool";

class PGTokenRepo implements ITokenRepo {
  public async findOneById(token: string): Promise<String> {
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

  public async saveOne(token: string): Promise<any> {
    let db;
    try {
      db = await pgPool.connect();

      const result = await db.query(
        "INSERT INTO refresh_token VALUES $1 RETURNING token",
        [token, false],
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }

  public async updateOne(token: string, revoked: boolean): Promise<any> {
    let db;
    try {
      db = await pgPool.connect();

      const result = await db.query(
        "UPDATE refresh_token SET active = $1 WHERE token = $2",
        [revoked, token],
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }
}
