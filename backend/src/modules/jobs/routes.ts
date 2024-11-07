import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  createJobRequest,
  jobResponse,
  jobsQuery,
  categoryResponse,
} from "./dto";
import { authMiddleware } from "@/middleware/auth";
import { db } from "@/db";
import {
  categoryTable,
  companyTable,
  JobStatus,
  jobTable,
  userTable,
} from "@/db/schema";
import {
  errorJsonResponse,
  paginatedJsonResponse,
  requestBodyJson,
  successJsonResponse,
} from "@/lib/swagger/openapi";
import { and, asc, count, desc, eq, gte, SQL } from "drizzle-orm";

export const jobRoutes = new OpenAPIHono();

jobRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: paginatedJsonResponse({
        schema: jobResponse,
        description: "Get all jobs",
      }),
    },
    request: {
      query: jobsQuery,
    },
    tags: ["jobs"],
  }),
  async (c) => {
    const {
      offset,
      limit,
      search,
      categoryId,
      minSalary,
      companyId,
      workType,
      orderBy,
      orderDirection,
      isFeatured,
    } = await c.req.valid("query");

    const filters: SQL[] = [eq(jobTable.status, JobStatus.APPROVED)];

    if (search) filters.push(eq(jobTable.title, search));
    if (workType) filters.push(eq(jobTable.workType, workType));
    if (minSalary) filters.push(gte(jobTable.minSalary, minSalary));
    if (companyId) filters.push(eq(companyTable.id, companyId));
    if (categoryId) filters.push(eq(jobTable.categoryId, categoryId));
    if (isFeatured) filters.push(eq(jobTable.isFeatured, isFeatured));

    const where = and(...filters);

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
          : desc(jobTable[orderBy || "createdAt"]),
        desc(jobTable.id)
      )
      .execute();

    const [total] = await db
      .select({ count: count() })
      .from(jobTable)
      .leftJoin(categoryTable, eq(jobTable.categoryId, categoryTable.id))
      .leftJoin(userTable, eq(jobTable.userId, userTable.id))
      .leftJoin(companyTable, eq(jobTable.userId, companyTable.userId))
      .where(where);

    return c.json(
      {
        items,
        total: total.count,
      },
      200
    );
  }
);

jobRoutes.openapi(
  createRoute({
    method: "get",
    path: "/categories",
    responses: {
      200: successJsonResponse({
        schema: categoryResponse.array(),
        description: "Get all job categories",
      }),
    },
    tags: ["jobs"],
  }),
  async (c) => {
    const items = await db.query.categoryTable.findMany({});
    return c.json(categoryResponse.array().parse(items), 200);
  }
);

jobRoutes.openapi(
  createRoute({
    method: "get",
    path: "/{jobId}",
    responses: {
      200: successJsonResponse({
        schema: jobResponse,
        description: "Get a job",
      }),
      404: errorJsonResponse({ description: "Job not found" }),
    },
    request: {
      params: z.object({ jobId: z.coerce.number() }),
    },
    tags: ["jobs"],
  }),
  async (c) => {
    const { jobId } = c.req.valid("param");

    const [job] = await db
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
      .where(
        and(eq(jobTable.id, jobId), eq(jobTable.status, JobStatus.APPROVED))
      )
      .limit(1)
      .execute();

    if (!job) {
      return c.json({ message: "Job not found" }, 404);
    }

    return c.json(job, 200);
  }
);

jobRoutes.openapi(
  createRoute({
    method: "post",
    path: "/",
    middleware: [authMiddleware],
    request: requestBodyJson({ schema: createJobRequest }),
    responses: {
      201: successJsonResponse({
        schema: z.object({ id: z.number() }),
        description: "Create a new job",
      }),
    },
    tags: ["jobs"],
  }),
  async (c) => {
    const userId = c.userId;

    const validated = await c.req.valid("json");

    const [job] = await db
      .insert(jobTable)
      .values({ ...validated, userId, status: JobStatus.PENDING })
      .returning({ id: jobTable.id });

    return c.json(job, 201);
  }
);

jobRoutes.openapi(
  createRoute({
    method: "delete",
    path: "/{jobId}",
    middleware: [authMiddleware],
    responses: {
      200: successJsonResponse({
        schema: z.object({ ok: z.boolean() }),
        description: "Delete a job",
      }),
      403: errorJsonResponse({ description: "Forbidden" }),
      404: errorJsonResponse({ description: "Job not found" }),
    },
    request: {
      params: z.object({ jobId: z.coerce.number() }),
    },
    tags: ["jobs"],
  }),
  async (c) => {
    const { jobId } = c.req.valid("param");
    const userId = c.userId;

    const [job] = await db
      .select({ id: jobTable.id, userId: jobTable.userId })
      .from(jobTable)
      .where(eq(jobTable.id, jobId));

    if (!job) {
      return c.json({ message: "Job not found" }, 404);
    }

    if (job.userId === userId) {
      await db.delete(jobTable).where(eq(jobTable.id, jobId));
      return c.json({ ok: true }, 200);
    }

    return c.json({ message: "Forbidden" }, 403);
  }
);
