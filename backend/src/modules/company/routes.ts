import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { companyResponse, companiesQuery, companyRequest } from "./dto";
import { db } from "@/db";
import { companyTable } from "@/db/schema";
import {
  errorJsonResponse,
  paginatedJsonResponse,
  requestBodyJson,
  successJsonResponse,
} from "@/lib/swagger/openapi";
import { and, count, desc, eq, SQL } from "drizzle-orm";
import { authMiddleware } from "@/middleware/auth";

export const companyRoutes = new OpenAPIHono();

companyRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: paginatedJsonResponse({
        schema: companyResponse,
        description: "Get all companies",
      }),
    },
    request: {
      query: companiesQuery,
    },
    tags: ["companies"],
  }),
  async (c) => {
    const { limit, offset, name } = await c.req.valid("query");

    const filters: SQL[] = [];

    if (name) filters.push(eq(companyTable.name, name));

    const where = and(...filters);

    const items = await db.query.companyTable.findMany({
      offset,
      limit,
      where,
      orderBy: desc(companyTable.createdAt),
    });

    const [total] = await db
      .select({ count: count() })
      .from(companyTable)
      .where(where);

    return c.json(
      { items: companyResponse.array().parse(items), total: total.count },
      200
    );
  }
);

companyRoutes.openapi(
  createRoute({
    method: "get",
    path: "/{companyId}",
    responses: {
      200: successJsonResponse({
        schema: companyResponse,
        description: "Get a company",
      }),
      404: errorJsonResponse({ description: "Company not found" }),
    },
    request: {
      params: z.object({ companyId: z.coerce.number() }),
    },
    tags: ["companies"],
  }),
  async (c) => {
    const { companyId } = await c.req.valid("param");

    const [company] = await db
      .select({
        id: companyTable.id,
        name: companyTable.name,
        url: companyTable.url,
        logo: companyTable.logo,
        email: companyTable.email,
      })
      .from(companyTable)
      .where(eq(companyTable.id, companyId))
      .limit(1);

    if (!company) return c.json({ message: "Company not found" }, 404);

    return c.json(company, 200);
  }
);

companyRoutes.openapi(
  createRoute({
    method: "post",
    path: "/",
    middleware: [authMiddleware],
    request: requestBodyJson({ schema: companyRequest }),
    responses: {
      201: successJsonResponse({
        schema: z.object({ id: z.number() }),
        description: "Create a new company",
      }),
    },
    tags: ["companies"],
  }),
  async (c) => {
    const userId = c.userId;

    const validated = await c.req.valid("json");

    const [company] = await db
      .insert(companyTable)
      .values({ ...validated, userId })
      .returning({ id: companyTable.id });

    return c.json({ id: company.id }, 201);
  }
);

companyRoutes.openapi(
  createRoute({
    method: "put",
    path: "/{companyId}",
    middleware: [authMiddleware],
    responses: {
      200: successJsonResponse({
        schema: companyResponse,
        description: "Update a company",
      }),
      403: errorJsonResponse({ description: "Forbidden" }),
      404: errorJsonResponse({ description: "Company not found" }),
    },
    request: {
      ...requestBodyJson({ schema: companyRequest }),
      params: z.object({ companyId: z.coerce.number() }),
    },
    tags: ["companies"],
  }),
  async (c) => {
    const userId = c.userId;

    const { companyId } = c.req.valid("param");

    const [company] = await db
      .select({ id: companyTable.id, userId: companyTable.userId })
      .from(companyTable)
      .where(eq(companyTable.id, companyId));

    if (!company) {
      return c.json({ message: "Company not found" }, 404);
    }

    if (company.userId !== userId) {
      return c.json({ message: "Forbidden" }, 403);
    }

    const validated = await c.req.valid("json");

    const [job] = await db
      .update(companyTable)
      .set({ ...validated })
      .where(eq(companyTable.id, companyId))
      .returning();

    return c.json(companyResponse.parse(job), 200);
  }
);
