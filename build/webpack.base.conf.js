var path = require('path')
const productionConfig = require('./webpack.prod.conf')//生产环境配置
const developmentConfig = require('./webpack.dev.conf')//开发环境配置
const pagesConfig =require('./pages.conf')
var ExtractTextPlugin =require('extract-text-webpack-plugin')//提取css
const merge = require('webpack-merge')//用于配置merge
const cssExtract = new ExtractTextPlugin({
    filename: 'css/[name]-bundle-[hash:5].css',
    // allChunk:true
})
const generateConfig = env => {
    const assetsPublicPath = env === 'development' ? '/' : '/' //项目根区分环境
    const scriptLoader = ['babel-loader']
            // .concat(env === 'production'
            // ? []
            // : [{
            //     loader: 'eslint-loader',
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // }]
            //)
    const cssLoaders =
        [
            {
                loader: 'css-loader',
                options: {
                    minimize: env === 'production',//压缩css
                    sourceMap:env === 'development'//启用sourcemap
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    sourceMap: env === 'development',
                    plugins: [
                        require('postcss-cssnext')()
                    ]
                    // ].concat(
                    //     env === 'production'
                    //     ? require('postcss-sprites')({
                    //         spritePath: 'dist/assets/imgs/sprites',
                    //         retina: true
                    //     })
                    //     : []
                    // )
                }
            }
        ]
    const styleLoader = { loader: 'style-loader'}//创建标签插入文档流
    const handleLoader = env === 'production'
        ? cssExtract.extract({
            fallback: styleLoader,
            use: cssLoaders
        })
        : [styleLoader].concat(cssLoaders)
    console.log(handleLoader)

    const fileLoader = outputPath => {
        return env === 'development'
            ? [{
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    // publicPath:'../',
                    outputPath: outputPath
                }
            }]
            : [{
                loader: 'url-loader',//带图片转base64功能
                options: {
                    name: '[name]-[hash:5].[ext]',
                    limit: 1000,//1000=1kb
                    // publicPath:'',
                    outputPath: outputPath,
                    // useRelativePath:true
                }
            }]
    }
    return {
        entry:{

        },
        output:{
            path:path.resolve(__dirname,'../dist'),//项目打包路径
            publicPath:assetsPublicPath,//项目根
            filename:'js/[name]-bundle-[hash:5].js'//js打包目录和名称
        },
        module:{
            rules:[
                {
                    test:/\.js$/,
                    include: [path.resolve(__dirname, '../src')],
                    // exclude: [path.resolve(__dirname, '../src/libs')],
                    use: scriptLoader
                },
                {
                    test:/\.css$/,
                    use:handleLoader
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/,
                    use: fileLoader('img/').concat(
                        env === 'production'
                            ? {
                                loader: 'img-loader',//图片压缩
                                options: {
                                    pngquant: {
                                        quality: 10
                                    }
                                }
                            }
                            : []
                    )
                },
                {
                    test:/\.(eot|woff2?|ttf|svg)$/,
                    use: fileLoader('font/')
                }
                // {
                //     test:/\.html$/,
                //     use:'html-loader'
                // }
            ]
        },
        plugins: [
            cssExtract
        ]
    }
}

module.exports = env => {

    const baseConfig = merge([generateConfig(env)].concat(pagesConfig))
    let runConfig = env === 'production'
        ? productionConfig
        : developmentConfig
    console.log(merge(baseConfig, runConfig))
    return merge(baseConfig, runConfig)
    // return generateConfig(env)
}