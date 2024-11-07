import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { userRoutes } from "./modules/users/routes";
import { env } from "./env";
import { authRoutes } from "./modules/auth/routes";
import { jobRoutes } from "./modules/jobs/routes";
import { companyRoutes } from "./modules/company/routes";
import { internalRoutes } from "./modules/internal/routes";
import { cors } from "hono/cors";
import { swaggerJson } from "./lib/swagger/swagger-json";

const app = new OpenAPIHono();

app.use("*", cors());

app.route("/users", userRoutes);
app.route("/auth", authRoutes);
app.route("/jobs", jobRoutes);
app.route("/companies", companyRoutes);
app.route("/internal", internalRoutes);

app.get("/doc", (c) => {
  return c.json(swaggerJson(app));
});

app.get(
  "/",
  swaggerUI({
    url: "/doc",
  })
);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
