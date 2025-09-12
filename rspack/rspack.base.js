const dotenv = require("dotenv");
const ESLintPlugin = require("eslint-rspack-plugin");
const path = require("path");
const { TsCheckerRspackPlugin } = require("ts-checker-rspack-plugin");
const WebpackBar = require("webpackbar/rspack");
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

// --------------------------------------------------------------------
// Find the project and workspace directories
const projectRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(projectRoot, "../..");
const isProduction = process.env.NODE_ENV === "production";

// ------------------------------- Env -------------------------------
// replace accordingly './.env' with the path of your .env file
dotenv.config({
  path: path.join(projectRoot, ".env"),
});

// ------------------------------- Rspack -------------------------------
/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: projectRoot,
  target: "node",
  entry: {
    server: [path.resolve(projectRoot, "./src/server.ts")],
  },
  output: {
    path: path.resolve(projectRoot, "./build"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    tsConfig: path.resolve(projectRoot, "./tsconfig.json"),
  },
  stats: "errors-only",
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: [/[\\/]node_modules[\\/]/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  externalsPresets: { node: true },
  externalsType: "commonjs",
  externals: [],
  plugins: [
    new ESLintPlugin({
      cache: !isProduction,
      files: "**/*",
      extensions: ["js", "ts"],
      emitWarning: true,
      emitError: true,
      failOnWarning: false,
      failOnError: isProduction,
      configType: "flat",
      eslintPath: "eslint",
    }),
    new TsCheckerRspackPlugin({
      devServer: !isProduction,
      typescript: { configFile: path.resolve(projectRoot, "./tsconfig.json") },
    }),
    // new FriendlyErrorsWebpackPlugin(),
    new WebpackBar({
      /* options */
    }),
  ],
};

module.exports = config;
