// @ts-check

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    files: ["src/**/*.ts"],
  },
);
