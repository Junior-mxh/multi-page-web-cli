const HtmlWebpackPlugin = require('html-webpack-plugin')//html生产插件
const generatePage = function ({
   title = '',
   entry = '',
   template = '',
   name = '',
   chunks = []
} = {}) {
    return {
        entry,
        plugins:[
            new HtmlWebpackPlugin({
                chunks,
                template,
                title,
                filename:name + '.html',
                chunksSortMode: 'manual'//应用文件顺序
            })
        ]
    }
}
const configPages = [
    {
        title:'page A',
        entry:{
            a:'./src/pages/a/a'
        },
        template:'./src/pages/a/a.html',
        name:'a',
        chunks: ['manifest','common','a']
    },
    {
        title:'page B',
        entry:{
            b:'./src/pages/b/b'
        },
        template:'./src/pages/b/b.html',
        name:'b',
        chunks:['manifest','common','b']
    },
    {
        title:'page C',
        entry:{
            c:'./src/pages/c/c'
        },
        template:'./src/pages/c/c.html',
        name:'c',
        chunks:['manifest','common','c']
    }
]
const config = []
configPages.map(item => {
    config.push(generatePage(item))
})

module.exports = config