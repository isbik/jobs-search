import { z } from "zod";
import { companyResponse } from "../company/dto";

export const userResponse = z
  .object({
    id: z.number(),
    email: z.string(),
    isAdmin: z.boolean().nullable().optional(),
    company: companyResponse.nullable().openapi(""),
    createdAt: z.string(),
  })
  .strip()
  .transform((data) => {
    if (data.isAdmin === false) {
      delete data.isAdmin;
    }
    return data;
  })
  .openapi("User");
