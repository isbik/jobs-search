import { config } from "dotenv";
import { z } from "zod";

config();

const EnvSchema = z.object({
  PORT: z.coerce.number().default(4001),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

const result = EnvSchema.safeParse(process.env);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

const env: Env = result.data;

export { env };
