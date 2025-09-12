const { SwcJsMinimizerRspackPlugin } = require("@rspack/core");

// ------------------------------- Rspack -------------------------------
/** @type {import('@rspack/cli').Configuration} */
const config = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new SwcJsMinimizerRspackPlugin({})],
  },
  devtool: "source-map",
  plugins: [],
};

module.exports = config;
