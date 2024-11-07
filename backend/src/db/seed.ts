import { Table, getTableName, sql } from "drizzle-orm";

import * as schema from "@/db/schema";
import * as seeds from "./seeds";
import { db, pool } from "@/db";

if (process.env.NODE_ENV === "production") {
  throw new Error("Cannot seed in production mode");
}

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

for (const table of [schema.categoryTable]) {
  await resetTable(db, table);
}

for (const seed of Object.values(seeds)) {
  await seed(db);
}

await pool.end();
