import { paginationQuerySchema } from "@/lib/schema";
import { z } from "zod";

export const companiesQuery = paginationQuerySchema.merge(
  z.object({
    name: z.string().optional(),
  })
);

export const companyRequest = z.object({
  url: z.string().url(),
  name: z.string(),
  logo: z.string(),
  email: z.string(),
});

export const companyResponse = z
  .object({
    id: z.number(),
    name: z.string(),
    logo: z.string(),
    email: z.string(),
    url: z.string().url(),
  })
  .openapi("Company");
