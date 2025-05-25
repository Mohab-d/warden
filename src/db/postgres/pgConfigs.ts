import "dotenv/config";

const pgConfigs = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT as string),
}

export default pgConfigs
