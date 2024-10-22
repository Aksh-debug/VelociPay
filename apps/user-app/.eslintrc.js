/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // project: true,
  },
  env: {
    NEXTAUTH_URL: true,
    NEXT_PUBLIC_JWT_SECRET:true
  },
};
