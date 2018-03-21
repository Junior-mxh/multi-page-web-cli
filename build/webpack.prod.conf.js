const webpack = require('webpack')
// const PurifyWebpack = require('purifycss-webpack')
// const HtmlInlinkChunkPlugin = require('html-webpack-inline-chunk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')//打包清除工具
const globalConfig = require('./global.config')
const path = require('path')
const glob = require('glob-all')
let chunksArr = []
globalConfig.pages.forEach(item => {
    chunksArr.push(item.pageName)
})
module.exports = {
    plugins: [
        // new PurifyWebpack({
        //     paths: glob.sync([
        //         './src/pages/*/*.html',
        //         './src/pages/*/*.js',
        //     ])
        //
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2,
            chunks:chunksArr
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:['dependencies','manifest'],
            minChunks:Infinity
        }),
        // new HtmlInlinkChunkPlugin({
        //     inlineChunks: ['manifest']
        // }),

        new webpack.optimize.UglifyJsPlugin(),//js压缩

        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),       　　　　　　　　　　//根目录
            verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
            dry:      false        　　　　　　　　　　//启用删除文件
        })
    ]
}