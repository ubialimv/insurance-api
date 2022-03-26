const defaultConfig = require("./jest.config.js");

module.exports = {
  ...defaultConfig,
  coverageDirectory: "../coverage/mutation",
};
