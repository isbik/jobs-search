import { z } from "zod";

export const registerRequest = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginRequest = z.object({
  email: z.string(),
  password: z.string(),
});
