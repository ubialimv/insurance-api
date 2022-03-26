module.exports = {
  rootDir: "../src",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  coverageDirectory: "../coverage/unit",
  testEnvironment: "node",
  collectCoverageFrom: ["**/*.(t|j)s", "!**/__tests__/**"],
  coveragePathIgnorePatterns: ["/src/shared"],
};
