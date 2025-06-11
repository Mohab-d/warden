import { Pool, PoolClient } from "pg";
import pgConfigs from "./pgConfigs";

const pgPool = new Pool(pgConfigs);

export default pgPool;
