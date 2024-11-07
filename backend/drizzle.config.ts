import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  dbCredentials: {
    host: "localhost",
    user: process.env.POSTGRES_USER!,
    password: process.env.POSTGRES_PASSWORD!,
    database: process.env.POSTGRES_DB!,
    port: 5432,
    ssl: false,
  },
  migrations: {
    prefix: "index",
    table: "__drizzle_migrations__",
    schema: "public",
  },
  out: "./src/db/migrations",
});
