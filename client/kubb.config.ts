import { defineConfig } from "@kubb/core";
import { pluginTs } from "@kubb/swagger-ts";
import { pluginClient } from "@kubb/swagger-client";
import { pluginTanstackQuery } from "@kubb/swagger-tanstack-query";
import { pluginOas } from "@kubb/plugin-oas";

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "http://localhost:4001/doc",
    },
    output: {
      path: "./src/__generated__",
      clean: true,
    },
    plugins: [
      pluginClient({
        client: {
          importPath: "@/shared/api/client",
        },
      }),
      pluginTs(),
      pluginOas(),
      pluginTanstackQuery({
        client: {
          importPath: "@/shared/api/client",
        },
        mutate: {
          variablesType: "mutate",
          methods: ["post", "put", "patch", "delete"],
        },
      }),
    ],
  };
});
