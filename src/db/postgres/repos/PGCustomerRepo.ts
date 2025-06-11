import { PoolClient } from "pg";
import WardenError from "../../../errorHandler/definedError/WardenError";
import ErrorType from "../../../errorHandler/ErrorType";
import ICustomerData from "../../../interface/ICustomerData";
import ICustomerRepo from "../../../interface/repos/ICustomerRepo";
import pgPool from "../pgPool";

class PGCustomerRepo implements ICustomerRepo {
  public async findOneById(id: string): Promise<ICustomerData> {
    throw "Not implemented";
  }

  public async findOneByUsername(username: string): Promise<ICustomerData> {
    let db;
    try {
      db = await pgPool.connect();

      const query = `
      SELECT *
      FROM customer
      WHERE username = $1`;
      const result = await db.query(query, [username]);
      const customer = result.rows[0];

      if (!customer) {
        throw new WardenError(
          "RecordNotExist",
          `User with username (${username}) does not exist`,
          true,
          ErrorType.ERR_NO_RECORD,
          {
            username: username,
          },
        );
      }

      return {
        id: customer.id,
        name: {
          firstName: customer.first_name,
          middleName: customer.middle_name,
          lastName: customer.lasty_name,
        },
        email: customer.email,
        username: customer.username,
        phonenumber: customer.phonenumber,
        password: customer.hash,
      };
    } catch (error) {
      throw this.handleError(error, username);
    } finally {
      db?.release();
    }
  }

  public async saveOne(data: ICustomerData): Promise<ICustomerData> {
    let db;

    try {
      db = await pgPool.connect();

      await db.query("BEGIN");
      const query = `
      INSERT INTO customer (first_name, middle_name, last_name, username, email, hash)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, first_name, middle_name, last_name, username, email;
`;

      await this.checkDuplication(data, db);

      const record = await db.query(query, [
        data.name.firstName,
        data.name.middleName,
        data.name.lastName,
        data.username,
        data.email,
        data.password,
      ]);

      const savedCustomer = record.rows[0];

      await db.query("COMMIT");

      return {
        id: savedCustomer.id,
        name: {
          firstName: savedCustomer.first_name,
          middleName: savedCustomer.middle_name,
          lastName: savedCustomer.last_name,
        },
        email: savedCustomer.email,
        username: savedCustomer.username,
        phonenumber: savedCustomer.phonenumber,
      };
    } catch (error) {
      await db?.query("ROLLBACK");
      throw this.handleError(error, data);
    } finally {
      db?.release();
    }
  }

  private async checkDuplication(
    data: ICustomerData,
    db: PoolClient,
  ): Promise<void> {
    try {
      // check if unique values are duplicated
      const records = await db.query(
        `SELECT
          CASE
              WHEN EXISTS (SELECT 1 FROM customer WHERE username = $1) THEN 1
              ELSE 0
          END AS username,
          CASE
              WHEN EXISTS (SELECT 1 FROM customer WHERE email = $2) THEN 1
              ELSE 0
          END AS email;
`,
        [data.username, data.email],
      );
      const result = records.rows[0];
      const duplicates: string[] = Object.keys(result).filter((key) =>
        result[key] ? key : null,
      );

      // Error: duplication found, formate context and throw an error
      // Context result example: {username: duplicatedUsername, email: duplicatedEmail, ...etc}
      if (duplicates.length > 0) {
        const context: { [key: string]: any } = {};
        duplicates.forEach(
          (duplicate) => (context[duplicate] = (data as any)[duplicate]),
        );
        throw new WardenError(
          "ValueExist",
          `The following values are duplicated (${duplicates.join(", ")})`,
          true,
          ErrorType.ERR_VALUE_EXIST,
          context,
        );
      }
    } catch (error) {
      throw this.handleError(error, data);
    }
  }

  updateOne(id: string, data: any): Promise<any> {
    throw "Not implemented yet";
  }

  private handleError(error: any, context: any): WardenError<any> {
    switch (error.code) {
      default:
        throw error;
    }
  }
}

export default PGCustomerRepo;
