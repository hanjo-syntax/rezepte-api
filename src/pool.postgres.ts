import "dotenv/config";
import { Pool } from "pg";

let postgresPool: Pool | undefined;

export function getPostgresPool(): Pool {
  if (!postgresPool) {
    postgresPool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 10,
    });
  }

  return postgresPool;
}
