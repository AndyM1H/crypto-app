process.env.TZ = "UTC";

const jestConfig = {
  clearMocks: true,
  moduleFileExtensions: ["js", "ts", ".d.ts"],
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "\\.ts?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  preset: "ts-jest",
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/**/**.ts", "!<rootDir>/**/index.ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/app/infrastructure/migrations/",
    "<rootDir>/test-utils",
  ],
};

export default jestConfig;
