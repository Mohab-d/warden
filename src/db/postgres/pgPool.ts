import { Pool } from "pg";
import pgConfigs from "./pgConfigs";

const pgPool = new Pool(pgConfigs);

export default pgPool;
