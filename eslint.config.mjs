import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", "reports/**", "seo-engine/**", "tmp/**", "tsconfig.tsbuildinfo"]
  },
  {
    files: [
      "app/page.tsx",
      "app/contact/**",
      "app/factory/**",
      "app/manufacturer/**",
      "app/products/**",
      "app/projects/**",
      "app/resources/**",
      "app/components/*.tsx"
    ],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "off"
    }
  }
];
