/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: [".d.ts", ".js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
