var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

var webpack = require('webpack');
 
module.exports = {

    entry: path.resolve(__dirname, './index.jsx'),

    output: {
        path: path.resolve(__dirname, 'build'), 
        filename: 'bundle.js'
    },

    resolve: {
        modulesDirectories: ['node_modules', './src'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { 
                test: /node_modules\/jquery\/.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            },
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?mimetype=application/vnd.ms-fontobject'
            },
            {
                test: /\.woff/,
                loader: 'url-loader?mimetype=application/font-woff'
            }, {
                test: /\.woff2/,
                loader: 'url-loader?mimetype=application/font-woff2'
            },
            { 
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url-loader?mimetype=application/x-font-ttf'
            },
            { 
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: "url?limit=10000&mimetype=image/svg+xml" 
            }
        ],
        noParse: [pathToReact]
  },
};
