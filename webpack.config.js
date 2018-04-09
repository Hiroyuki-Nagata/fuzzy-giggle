var path = require('path');
var webpack = require('webpack');
var assetsPlugin = require('assets-webpack-plugin');

module.exports = {
    entry: './apps/ds/frontend/application.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle_web-[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [new assetsPlugin()],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            vuex: 'vuex/dist/vuex.js',
        }
    }
};
