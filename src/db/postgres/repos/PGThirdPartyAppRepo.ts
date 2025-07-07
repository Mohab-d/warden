import WardenError from "../../../errorHandler/definedError/WardenError";
import IThirdPartyAppData from "../../../interface/IThirdPartyAppData";
import IThirdPartyAppRepo from "../../../interface/repos/IThirdPartyAppRepo";
import pgPool from "../pgPool";

class PGThirdPartyAppRepo implements IThirdPartyAppRepo {
  public async saveOne(data: IThirdPartyAppData): Promise<IThirdPartyAppData> {
    let db;
    try {
      db = await pgPool.connect();

      const existingApp = await db.query(
        `SELECT COUNT(*) FROM third_party_app WHERE name = $1`,
        [data.name],
      );

      if (existingApp.rows.length > 0) {
        throw WardenError.duplicatedRecord();
      }

      const query = `
INSERT INTO third_party_app
(name, owner, owner_email)
VALUES ($1, $2, $3) RETURNING id, name, owner, owner_email;
`;

      const result = await db.query(query, [
        data.name,
        data.owner,
        data.ownerEmail,
      ]);

      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      db?.release();
    }
  }
}

export default PGThirdPartyAppRepo;
