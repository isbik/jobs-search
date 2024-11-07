import tsParser from "@typescript-eslint/parser";
import tsESLintPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: ["node_modules/**", "dist/**", ".next/**", "src/__generated__/**"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.app.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        browser: true,
        es2021: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsESLintPlugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      perfectionist,
      import: importPlugin,
      prettier,
    },
    rules: {
      ...tsESLintPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "perfectionist/sort-imports": [
        "error",
        {
          type: "line-length",
          ignoreCase: true,
          specialCharacters: "keep",
          matcher: "minimatch",
          internalPattern: ["@/**"],
          newlinesBetween: "always",
          matcher: "minimatch",
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
          environment: "node",
        },
      ],
      "import/newline-after-import": ["error", { count: 1 }],

      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
