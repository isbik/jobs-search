import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import { authMiddleware } from "@/middleware/auth";
import { db } from "@/db";
import { categoryTable, companyTable, jobTable, userTable } from "@/db/schema";
import {
  errorJsonResponse,
  paginatedJsonResponse,
  requestBodyJson,
  successJsonResponse,
} from "@/lib/swagger/openapi";
import { and, asc, count, desc, eq, gte } from "drizzle-orm";
import { jobResponse, jobsQuery } from "../jobs/dto";
import { updateJobRequest } from "./dto";

export const internalRoutes = new OpenAPIHono();

internalRoutes.openapi(
  createRoute({
    method: "get",
    path: "/jobs",
    responses: {
      200: paginatedJsonResponse({
        schema: jobResponse,
        description: "Get all jobs",
      }),
      403: errorJsonResponse({ description: "Forbidden" }),
    },
    request: {
      query: jobsQuery,
    },
    middleware: [authMiddleware],
    tags: ["internal"],
  }),
  async (c) => {
    const {
      offset,
      limit,
      categoryId,
      minSalary,
      companyId,
      workType,
      orderBy,
      orderDirection,
      isFeatured,
      userId,
    } = await c.req.valid("query");

    const [user] = await db
      .select({
        isAdmin: userTable.isAdmin,
      })
      .from(userTable)
      .where(eq(userTable.id, c.userId));

    if (userId !== c.userId && !user.isAdmin) {
      return c.json({ message: "Forbidden" }, 403);
    }

    const where = and(
      ...[
        ...(workType ? [eq(jobTable.workType, workType)] : []),
        ...(minSalary ? [gte(jobTable.minSalary, minSalary)] : []),
        ...(companyId ? [eq(companyTable.id, companyId)] : []),
        ...(categoryId ? [eq(jobTable.categoryId, categoryId)] : []),
        ...(isFeatured ? [eq(jobTable.isFeatured, isFeatured)] : []),
        ...(userId ? [eq(jobTable.userId, userId)] : []),
      ]
    );

    const items = await db
      .select({
        id: jobTable.id,
        title: jobTable.title,
        description: jobTable.description,
        minSalary: jobTable.minSalary,
        maxSalary: jobTable.maxSalary,
        workType: jobTable.workType,
        isFeatured: jobTable.isFeatured,
        updatedAt: jobTable.updatedAt,
        userId: jobTable.userId,
        url: jobTable.url,
        status: jobTable.status,
        experience: jobTable.experience,
        skills: jobTable.skills,
        category: {
          id: categoryTable.id,
          name: categoryTable.name,
        },
        company: {
          id: companyTable.id,
          name: companyTable.name,
          logo: companyTable.logo,
          url: companyTable.url,
        },
      })
      .from(jobTable)
      .leftJoin(categoryTable, eq(jobTable.categoryId, categoryTable.id))
      .leftJoin(userTable, eq(jobTable.userId, userTable.id))
      .leftJoin(companyTable, eq(jobTable.userId, companyTable.userId))
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(
        orderDirection === "asc"
          ? asc(jobTable[orderBy || "createdAt"])
          : desc(jobTable[orderBy || "createdAt"])
      )
      .execute();

    const [total] = await db
      .select({ count: count() })
      .from(jobTable)
      .where(where);

    return c.json(
      {
        items: items,
        total: total.count,
      },
      200
    );
  }
);

internalRoutes.openapi(
  createRoute({
    method: "patch",
    path: "/jobs/{jobId}",
    request: {
      ...requestBodyJson({ schema: updateJobRequest }),
      params: z.object({
        jobId: z.coerce.number(),
      }),
    },
    responses: {
      200: successJsonResponse({
        schema: z.object({ ok: z.boolean() }),
        description: "Update a job",
      }),
      403: errorJsonResponse({ description: "Forbidden" }),
      404: errorJsonResponse({ description: "Job not found" }),
    },
    tags: ["internal"],
    middleware: [authMiddleware],
  }),
  async (c) => {
    const validated = await c.req.valid("json");
    const { jobId } = c.req.valid("param");

    const userId = c.userId;

    const [user] = await db
      .select({
        isAdmin: userTable.isAdmin,
      })
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!user.isAdmin) {
      return c.json({ message: "Forbidden" }, 403);
    }

    const [job] = await db
      .update(jobTable)
      .set(validated)
      .where(eq(jobTable.id, jobId))
      .returning();

    if (!job) {
      return c.json({ message: "Job not found" }, 404);
    }

    return c.json({ ok: true }, 200);
  }
);
