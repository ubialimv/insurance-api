const defaultConfig = require("./jest.config.js");

module.exports = {
  ...defaultConfig,
  testRegex: ".*\\.component-spec\\.ts$",
  coverageDirectory: "../coverage/component",
};
