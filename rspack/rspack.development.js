const path = require("path");
const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");

// --------------------------------------------------------------------
// Find the project and workspace directories
const projectRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(projectRoot, "../..");

// ------------------------------- Rspack -------------------------------
/** @type {import('@rspack/cli').Configuration} */
const config = {
  mode: "development",
  entry: {
    dev: [
      path.resolve(projectRoot, "./src/dev.ts"),
      "@rspack/core/hot/poll?100",
    ],
  },
  optimization: {
    minimize: false,
  },
  devtool: "cheap-source-map",
  devServer: {
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  watchOptions: {
    // for some systems, watching many files can result in a lot of CPU or memory usage
    // https://webpack.js.org/configuration/watch/#watchoptionsignored
    // don't use this pattern, if you have a monorepo with linked packages
    ignored: /node_modules/,
  },
  // ignoreWarnings: [
  //   {
  //     module: /node_modules\/express\/lib\/view\.js/,
  //     message: /the request of a dependency is an expression/,
  //   },
  // ],
  plugins: [
    new RunScriptWebpackPlugin({
      name: "dev.js",
      autoRestart: false,
    }),
  ].filter(Boolean),
};

module.exports = config;
