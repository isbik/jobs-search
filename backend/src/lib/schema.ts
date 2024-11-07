import { z } from "zod";

export const paginationQuerySchema = z.object({
  offset: z.coerce.number().optional().default(0),
  limit: z.coerce.number().optional().default(10),
});

export const orderDirectionSchema = z
  .enum(["asc", "desc"])
  .openapi("orderDirection");
