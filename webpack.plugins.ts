import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import { DefinePlugin } from "webpack";

export const plugins = [
  new DefinePlugin({
    "process.env.ENVIRONMENT": JSON.stringify(process.env.ENVIRONMENT),
  }),
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
];
