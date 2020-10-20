module.exports = {
    publicPath: './', //根路径
    assetsDir: 'public', //静态资源目录（js,css,img,fonts）这些文件都可以写里面
    lintOnSave: false, //是否开启eslint保存检查,它的有效值为true||false||'error'
    productionSourceMap: false,
    transpileDependencies: ['axios', 'vue', 'vue-router', 'iview','element'], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        https: false, //是否开启协议名，如果开启会发出警告
        // proxy: {
        //     '/api': { //配置跨域的名字
        //         target: '/public/mock', //跨域的地址(一般是后台ip)
        //         changeOrigin: true, //是否跨域
        
        //         pathRewrite: { //当前的名字
        //             '/api': '/public/mock'
        //         }
        //     }
        // },

    }

}