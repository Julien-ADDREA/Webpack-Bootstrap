// Imports
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

// Webpack : Config
let config = {};

// Webpack : Entry
config.entry = [
	'./src/js/app.js',
	'./src/scss/app.scss'
];

// Webpack : Output
config.output = {
	path: path.resolve('./dist'),
	filename: 'app.bundle.js',
	chunkFilename: 'app.[id].chunk.js',
	publicPath: './dist/'
};

// Webpack : Mode
config.mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// Webpack : Devtool
if (config.mode === 'development') {
	config.devtool = 'eval-source-map';
}

// Webpack : Module
config.module = {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		},
		{
			test: /\.s[ac]ss$/i,
			use: [
				config.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: require('sass'),
						sassOptions: {
							fiber: require('fibers')
						},
					}
				}
			]
		},
		{
			test: /\.(png|jpg|jpeg|gif)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: '[name].[ext]'
					}
				}
			]
		}
	]
};

// Webpack : Plugins
config.plugins = [
	new CleanWebpackPlugin(),
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery'
	})
];
if (config.mode === 'production') {
	config.plugins.push(new MiniCssExtractPlugin({
		filename: 'app.bundle.css',
		chunkFilename: 'app.[id].chunk.css'
	}));
}

module.exports = config;
