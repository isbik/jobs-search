import { JobStatus } from "@/db/schema";
import { z } from "zod";

export const updateJobRequest = z.object({
  status: z.nativeEnum(JobStatus).optional().openapi("jobStatus"),
  isFeatured: z.boolean().optional(),
});
