var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var cssLoader = {};

if(process.env.NODE_ENV == 'production'){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    cssLoader = {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
    };

} else {

    cssLoader = {
        test: /\.css$/,
        loaders: [
            'style?sourceMap',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
    }

}

module.exports = {
	context: path.resolve('./app'),
	entry: './js/index.js',
	output: {
		path: path.resolve('./dist/'),
		filename: 'js/bundle.js',
		publicPath: '/'
	},
	module: {
		devtool: 'source-map',
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				presets: ['es2015']
			}
		},{
			test: /\.html$/,
			loader: 'html'
		},{
			test: /\.scss$/,
			loaders: ["style", "css", "sass"]
		},{
			test: /\.css$/,
			loaders: ["style", "css"]
		},{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
		},{
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file?name=fonts/[name].[ext]"
		},{
			test: /\.(jpe?g|png|gif)$/,
  		loader:'file?name=img/[name].[ext]'
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new BrowserSyncPlugin({
			server: {
				baseDir: ['dist']
			},
			port: 3000,
			host: 'localhost',
			open: false
		}),
		new CopyWebpackPlugin([{
			from: './manifest.json'
		},{
			from: './manifest.webapp'
		},{
			from: './robots.txt'
		},{
			from: './favicon.ico'
		},{
			from: './img/**/*',
			to: './'
		}])
	]
}
