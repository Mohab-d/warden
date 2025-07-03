import IThirdPartyAppData from "../../../interface/IThirdPartyAppData";
import IThirdPartyAppRepo from "../../../interface/repos/IThirdPartyAppRepo";
import pgPool from "../pgPool";

class PGThirdPartyAppRepo implements IThirdPartyAppRepo {
  public async saveOne(data: IThirdPartyAppData): Promise<IThirdPartyAppData> {
    let db;
    try {
      db = await pgPool.connect();

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
