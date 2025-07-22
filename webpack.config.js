const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  devServer: {
    port: 3004,
    liveReload: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  name: "shell",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
          LoginPage: "loginPage@http://localhost:3000/remoteEntry.js",
          // LeftNav: "leftNavigation@http://localhost:3001/remoteEntry.js",
          TopNav: "topNavigation@http://localhost:3002/remoteEntry.js",
          ItemDetails: "itemDetails@http://localhost:3003/remoteEntry.js",
          Shell: "shell@http://localhost:3004/remoteEntry.js",
          SharedModules: "sharedModules@http://localhost:3005/remoteEntry.js",
      },
      exposes: {
         "./store": "./src/redux/store.js"
      },
      shared: {
        "react": {
          singleton: true,
          requiredVersion: dependencies.react
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"]
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: dependencies["@mui/material"]
        },
        "@mui/icons-material": {
          singleton: true,
          requiredVersion: dependencies["@mui/icons-material"]
        },
      }
    }),
    new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
  }),
  ],
};
