import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "playwright.config.js",
      "reports/**",
      "scripts/site-auto-fix.js",
      "scripts/site-health-check.js",
      "seo-engine/**",
      "tests/site-health.spec.js",
      "tmp/**",
      "tsconfig.tsbuildinfo"
    ]
  },
  {
    files: [
      "app/page.tsx",
      "app/(en)/**",
      "app/contact/**",
      "app/factory/**",
      "app/manufacturer/**",
      "app/products/**",
      "app/projects/**",
      "app/resources/**",
      "app/components/*.tsx",
      "app/components/i18n/*.tsx"
    ],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/no-unescaped-entities": "off"
    }
  },
  {
    files: ["app/(en)/oem/[slug]/page.tsx"],
    rules: {
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];
