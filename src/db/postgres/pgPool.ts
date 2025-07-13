import { Pool } from "pg";
import pgConfigs from "./pgConfigs";

const neondbConfig = {
  connectionString: pgConfigs.neondb,
};

const pgPool = new Pool(neondbConfig);

export default pgPool;
