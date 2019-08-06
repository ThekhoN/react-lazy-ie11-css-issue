const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PATHS = require("./paths");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// set environment to production
process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

/*************************************************************************************************************/
// for production we are using production.index.html which has config with REACT-DEV TOOL disabled
/*************************************************************************************************************/
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: path.join(PATHS.public, "/production.index.html"),
	filename: "index.html",
	inject: "body",
	chunksSortMode: "none"
});

// SET to production
const WebpackDefinePluginConfig = new webpack.DefinePlugin({
	development: JSON.stringify(false),
	production: JSON.stringify(true)
});

module.exports = {
	devtool: false,
	entry: {
		app: ["babel-polyfill", PATHS.js]
	},
	output: {
		path: PATHS.dist,
		filename: "[name].[hash].js",
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.(css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					"css-loader"
				]
			},
			{
				test: /\.scss$/,
				use: [
					require.resolve("style-loader"),
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: require.resolve("css-loader"),
						options: {
							importLoaders: 1
						}
					},
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
								path.join(
									PATHS.src,
									"/styles-global/global-variables.scss"
								)
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
			},
			{
				test: /\.worker\.js$/,
				use: { loader: "worker-loader" }
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		},
		minimizer: [
			new TerserPlugin({ sourceMap: true }),
			new OptimizeCssAssetsPlugin({})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
			chunkFilename: "[id].[hash].css",
			publicPath: PATHS.build
		}),
		WebpackDefinePluginConfig,
		HtmlWebpackPluginConfig,
		new CompressionWebpackPlugin({
			cache: false
		}),
		// enable this to check bundle size
		// new BundleAnalyzerPlugin()
	]
};
