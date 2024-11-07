import { z } from "zod";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { env } from "../../env";
import { createToken } from "../../lib/token";
import {
  errorJsonResponse,
  requestBodyJson,
  successJsonResponse,
} from "@/lib/swagger/openapi";
import { registerRequest, loginRequest } from "./dto";
import { db } from "@/db";
import { companyTable, userTable } from "@/db/schema";
import { hashPassword, verifyPassword } from "@/lib/password";
import { eq } from "drizzle-orm";
import { userResponse } from "../users/dto";
import { isErrorWithCode } from "@/lib/error";
import { authMiddleware } from "@/middleware/auth";

export const authRoutes = new OpenAPIHono();

authRoutes.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: requestBodyJson({ schema: registerRequest }),
    responses: {
      201: successJsonResponse({
        schema: z.object({
          ok: z.boolean(),
        }),
        description: "Create new user",
      }),
      403: errorJsonResponse({ description: "User already exists" }),
      500: errorJsonResponse({ description: "Something went wrong" }),
    },
    tags: ["auth"],
  }),
  async (c) => {
    const { email, password } = c.req.valid("json");

    const hashedPassword = await hashPassword(password);

    try {
      await db
        .insert(userTable)
        .values({
          email,
          password: hashedPassword,
        })
        .returning();

      return c.json({ ok: true }, 201);
    } catch (error) {
      if (isErrorWithCode(error) && error.code === "23505") {
        return c.json(
          { message: "Пользователь с такой почтой уже существует" },
          403
        );
      }

      return c.json({ message: "Что-то пошло не так" }, 500);
    }
  }
);

authRoutes.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: requestBodyJson({
      schema: loginRequest,
      example: { email: "user", password: "password" },
    }),
    responses: {
      200: successJsonResponse({
        schema: userResponse,
        description: "Login user",
      }),
      401: errorJsonResponse({ description: "Invalid credentials" }),
    },
    tags: ["auth"],
  }),
  async (c) => {
    const { email, password } = c.req.valid("json");

    const [user] = await db
      .select({
        id: userTable.id,
        password: userTable.password,
        email: userTable.email,
        isAdmin: userTable.isAdmin,
        createdAt: userTable.createdAt,
        company: {
          id: companyTable.id,
          name: companyTable.name,
          logo: companyTable.logo,
          url: companyTable.url,
          email: companyTable.email,
        },
      })
      .from(userTable)
      .leftJoin(companyTable, eq(userTable.id, companyTable.userId))
      .where(eq(userTable.email, email))
      .limit(1);

    if (!user) {
      return c.json({ message: "Почта или пароль неверны" }, 401);
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (isValidPassword) {
      const token = createToken({ userId: user.id }, env.SECRET_KEY, 36000);
      c.res.headers.set(
        "Set-Cookie",
        `auth-token=${token}; Path=/; HttpOnly; Max-Age=36000`
      );

      return c.json(userResponse.parse(user), 200);
    }

    return c.json({ message: "Почта или пароль неверны" }, 401);
  }
);

authRoutes.openapi(
  createRoute({
    method: "post",
    path: "/logout",
    responses: {
      200: successJsonResponse({
        schema: z.object({
          ok: z.boolean(),
        }),
        description: "Logout user",
      }),
    },
    middleware: [authMiddleware],
    tags: ["auth"],
  }),
  async (c) => {
    c.res.headers.set("Set-Cookie", "auth-token=; Path=/; HttpOnly; Max-Age=0");

    return c.json({ ok: true }, 200);
  }
);
