import { JobExperience, JobStatus, JobType } from "@/db/schema";
import { orderDirectionSchema, paginationQuerySchema } from "@/lib/schema";
import { z } from "zod";

export const jobsQuery = paginationQuerySchema.merge(
  z.object({
    search: z.string().optional(),
    orderBy: z.enum(["createdAt", "minSalary"]).optional(),
    userId: z.coerce.number().optional(),
    categoryId: z.coerce.number().optional(),
    workType: z.nativeEnum(JobType).optional().nullable().openapi(""),
    companyId: z.coerce.number().optional(),
    minSalary: z.coerce.number().optional(),
    isFeatured: z.coerce.boolean().optional(),
    orderDirection: orderDirectionSchema.optional(),
  })
);

export const createJobRequest = z.object({
  title: z.string(),
  description: z.string(),
  minSalary: z.coerce.number(),
  maxSalary: z.coerce.number(),
  url: z.string().url(),
  categoryId: z.coerce.number(),
  workType: z.nativeEnum(JobType).openapi("workType"),
  skills: z.array(z.string()).default([]),
  experience: z.nativeEnum(JobExperience).openapi("workLevel"),
});

export const categoryResponse = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .openapi("Category");

export const jobResponse = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    minSalary: z.number(),
    maxSalary: z.number(),
    url: z.string().url(),
    category: categoryResponse.nullable().openapi(""),
    company: z
      .object({
        id: z.number(),
        name: z.string(),
        logo: z.string(),
        url: z.string(),
      })
      .nullable(),
    workType: z.nativeEnum(JobType).openapi("workType"),
    experience: z.nativeEnum(JobExperience).openapi("workLevel"),
    skills: z.array(z.string()),
    status: z.nativeEnum(JobStatus).openapi("jobStatus"),
    isFeatured: z.boolean(),
  })
  .openapi("Job");
