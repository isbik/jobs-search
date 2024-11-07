import { fixupPluginRules } from "@eslint/compat";
import eslintPrettierConfig from "eslint-config-prettier";
import drizzlePlugin from "eslint-plugin-drizzle";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  ...tseslint.configs.recommended,
  eslintPrettierConfig,
  {
    plugins: {
      drizzle: fixupPluginRules(drizzlePlugin),
    },
  },
];