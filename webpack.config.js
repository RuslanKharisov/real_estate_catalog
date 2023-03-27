const path = require('path');
const HtmlWebpackPlagin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
//     entry: './src/js/main.js',
    entry: {
        babelpolyfill: '@babel/polyfill',
        index: './src/js/main.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]bundle.js',
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "./dist"),
        },
    },

    plugins: [
        new HtmlWebpackPlagin({
            filename: 'index.html',
            template: './src/index.html'
    })],

    module: {
        rules: [
            {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: [
                    ['@babel/preset-env', { targets: "defaults" }]
                ]
                },
            }
            }
        ]
    }
}; 


