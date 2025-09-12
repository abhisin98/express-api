const { merge } = require("webpack-merge");

const baseConfig = require("./rspack/rspack.base");

// ------------------------------- Rspack -------------------------------
/** @type {import('@rspack/cli').Configuration} */
module.exports = function (env, argv) {
  // const isProduction = process.env.NODE_ENV === "production";
  const envConfig = require(`./rspack/rspack.${process.env.NODE_ENV}.js`);
  if (envConfig.mode === "development") {
    delete baseConfig.entry.server;
  }
  const config = merge(baseConfig, envConfig);
  return config;
};
