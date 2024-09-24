import path from "path";
import webpack, { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import { resolveTsAliases } from "resolve-ts-aliases";

const config: Configuration = {
  entry: {
    app: path.resolve(__dirname, "src", "entry.ts"),
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  target: "node",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: resolveTsAliases(path.resolve("tsconfig.json")),
  },
  plugins: [
    new webpack.DefinePlugin({
      self: "global",
    }),
  ],
};

export default config;
