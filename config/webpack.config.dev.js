("use strict");

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const PATHS = require("./paths");

// set environment to development
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(PATHS.public, "/index.html"),
  filename: "index.html",
  inject: "body",
  chunksSortMode: "none"
});

// SET to development
const WebpackDefinePluginConfig = new webpack.DefinePlugin({
  development: JSON.stringify(true),
  production: JSON.stringify(false)
});

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    app: [PATHS.js] /* revisit for adding babel-polyfill - check IE11 support */
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      },
      {
        test: /\.scss$/,
        use: [
          //  style-loader
          require.resolve("style-loader"),
          //  css-loader
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          //  postcss-loader
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                Autoprefixer({ flexbox: "no-2009" })
              ]
            }
          },
          //  sass-loader
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              // make global scss varibles available to all .scss without manually importing
              resources: [
                path.join(PATHS.src, "/styles-global/global-variables.scss")
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:8].[ext]",
              //publicPath: "./",
              outputPath: "images/",
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  plugins: [
    WebpackDefinePluginConfig,
    HtmlWebpackPluginConfig,
    new webpack.NamedModulesPlugin(),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    host: "localhost",
    port: 6699,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,
    historyApiFallback: true
  }
};
