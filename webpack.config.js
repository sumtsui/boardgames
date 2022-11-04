const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/try.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "webpackOutput"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "usage", corejs: "3.26.0" }],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
