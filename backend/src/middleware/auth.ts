import { Context, Next } from "hono";
import { parse } from "cookie";
import { env } from "../env";
import { verifyToken } from "../lib/token";

declare module "hono" {
  interface Context {
    userId: number;
  }
}

interface AuthPayload {
  userId: number;
}

const authMiddleware = async (c: Context, next: Next) => {
  const cookies = c.req.header("cookie");

  if (!cookies) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const parsedCookies = parse(cookies);
  const token = parsedCookies["auth-token"];

  if (!token) {
    return c.json({ message: "Unauthorized, no token" }, 401);
  }

  try {
    const payload: AuthPayload = verifyToken(token, env.SECRET_KEY);

    if (!payload.userId) {
      return c.json({ message: "Unauthorized, invalid token" }, 401);
    }

    c.userId = payload.userId;

    await next();
  } catch (err) {
    return c.json({ message: "Unauthorized, invalid token" }, 401);
  }
};

export { authMiddleware };
