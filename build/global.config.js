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
const dependencies = [//依赖的全局js
    'babel-polyfill',
]

const globalConfig = {
    'pages':pages,
    'dependencies':dependencies
}

module.exports = globalConfig