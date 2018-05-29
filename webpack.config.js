const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack=require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	entry: ["babel-polyfill","./lib/app.js"],
	output: {
		path: __dirname,
		filename: "dist/bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin("./dist/style.css"),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: path.resolve(__dirname, './lib/index.tpl.html')}),
		new UglifyJSPlugin(),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp:  /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: {removeAll: true } },
			canPrint: true
		})
	
	]
};


