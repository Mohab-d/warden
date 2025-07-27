import IAPIKeyRepo from "../../interfaces/IAPIKeyRepo";
import pgPool from "../pgPool";

class PGAPIKeyRepo implements IAPIKeyRepo {
  public async saveOne(apiKey: string, clientId: number): Promise<string> {
    let db;
    try {
      db = await pgPool.connect();
      const query = `
      INSERT INTO api_key
      (hash, third_party_app_id)
      VALUES ($1, $2)
      RETURNING *
`;
      const result = await db.query(query, [apiKey, clientId]);

      return result.rows[0].hash;
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }

  findOne(apiKey: string): Promise<string> {
    throw "Not implemented";
  }

  public async findOneByAppId(id: number): Promise<string> {
    let db;
    try {
      db = await pgPool.connect();
      const query = `
      SELECT hash FROM api_key WHERE third_party_app_id = $1
`;
      const result = await db.query(query, [id]);
      return result.rows[0].hash;
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }

  public async revokeByKey(key: string): Promise<void> {
    let db;
    try {
      db = await pgPool.connect();

      await db.query(`UPDATE api_key SET active = FALSE WHERE hash = $1`, [
        key,
      ]);
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
        `UPDATE api_key SET active = FALSE WHERE third_party_app_id = $1`,
        [userId],
      );
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }
}

export { PGAPIKeyRepo };
