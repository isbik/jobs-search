import { authMiddleware } from "@/middleware/auth";
import { OpenAPIHono } from "@hono/zod-openapi";
import { PathItemObject } from "openapi3-ts/oas31";

export const swaggerJson = (app: OpenAPIHono) => {
  const doc = app.getOpenAPIDocument({
    openapi: "3.0.0",
    info: {
      title: "Job Join API",
      version: "1.0.0",
    },
  });

  const routes = app.routes.filter((route) => route.handler === authMiddleware);

  routes.forEach((route) => {
    const method = route.method.toLowerCase() as keyof PathItemObject;

    const path = route.path;

    if (doc.paths[path] && doc.paths[path][method]) {
      doc.paths[path][method].security = [{ CookieAuth: [] }];
    }
  });

  if (!doc.components) {
    doc.components = {};
  }

  doc.components.securitySchemes = {
    CookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "auth-token",
      description: "Auth token for authentication",
    },
  };

  return doc;
};
