const webpack = require('webpack')
var path = require('path')
// const proxy = require('./proxy')
// const historyFallback = require('./historyfallback')

module.exports = {
    // devtool: 'cheap-module-source-map',

    devServer: {
        port: 9001,
        openPage: 'a.html',
        overlay: true,
        hot: true,
        hotOnly: true
        // contentBase:'/views'
        // proxy: proxy,
        // historyApiFallback: historyFallback
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}