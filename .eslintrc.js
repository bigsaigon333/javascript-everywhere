module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["plugin:import/recommended", "airbnb-typescript/base", "prettier"],
  ignorePatterns: "*.js",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
