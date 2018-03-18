const HtmlWebpackPlugin = require('html-webpack-plugin')//html生产插件

const pages = [//页面配置写在这里
    {
        title:'page index',
        pageName:'index'
    },
    {
        title:'page bbb',
        pageName:'b'
    },
    {
        title:'page ccc',
        pageName:'c'
    }
]



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
const normalize = (title,pageName) =>{
    const entry = {}
    const url = './src/pages/'+ pageName +'/'+ pageName
    entry[pageName] = url
    return  {
        title:title,
        entry:entry,
        template:url+'.html',
        name:pageName,
        chunks: ['manifest','common',pageName]
    }
}
const configPages = []
pages.map(item=>{
    configPages.push(normalize(item.title,item.pageName))
})
const config = []
configPages.map(item => {
    config.push(generatePage(item))
})

module.exports = config