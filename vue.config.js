const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
// 基础路径 注意发布之前要先修改这里
let baseUrl = './'
module.exports = {
    publicPath: baseUrl, // 根据你的实际情况更改这里
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        // 修复HMR
        config.resolve.symlinks(true);

        //忽略的打包文件
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
        })
        const entry = config.entry('app')
        entry
            .add('babel-polyfill')
            .end()
        entry
            .add('classlist-polyfill')
            .end()
        entry
            .add('@/mock')
            .end()
    },
    css:{
        loaderOptions: {
            css:{
                url:false, //false  css中加载图片的路径将不会被解析 不会改变
            }
        },
        extract:false
    },
    transpileDependencies: ['avue-plugin-transfer', 'avue-plugin-ueditor'],
    //配置转发代理
    devServer: {
        // proxy: [{
        //     '/user': {
        //         target: 'http://192.168.1.6:8501'
        //     },
        //     '/weixin': {
        //         target: 'http://192.168.1.6:8501'
        //     },
        // }]
    },
    configureWebpack: config => {
        if (isProduction) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        }

    }
}
