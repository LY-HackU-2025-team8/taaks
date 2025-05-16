// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  expoConfig,
  prettierConfig,
  {
    ignores: ["dist/*"],
  },
]);
