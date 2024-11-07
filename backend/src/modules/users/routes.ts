import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { successJsonResponse } from "@/lib/swagger/openapi";
import { eq } from "drizzle-orm";
import { authMiddleware } from "@/middleware/auth";
import { userResponse } from "./dto";

export const userRoutes = new OpenAPIHono();

userRoutes.openapi(
  createRoute({
    method: "get",
    path: "/me",
    responses: {
      200: successJsonResponse({
        schema: userResponse,
        description: "Get current user",
      }),
    },
    middleware: [authMiddleware],
    tags: ["users"],
  }),
  async (c) => {
    const userId = c.userId;

    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, userId),
      with: {
        company: true,
      },
    });

    return c.json(userResponse.parse(user), 200);
  }
);
