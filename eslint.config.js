const { defineConfig, globalIgnores } = require("eslint/config");
const universeConfig = require("eslint-config-universe/flat/node");

module.exports = defineConfig([
  universeConfig,
  globalIgnores(["node_modules", "build"]),
]);
