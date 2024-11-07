import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";
import { env } from "@/env";

export const pool = new Pool({
  password: env.POSTGRES_PASSWORD,
  user: env.POSTGRES_USER,
  database: env.POSTGRES_DB,
  port: 5432,
});

export type db = typeof db;
export const db = drizzle({ client: pool, schema, logger: true });
