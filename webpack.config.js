/*
 * @Explain: xxx
 * @Author: SuperLy
 * @LastEditors: SuperLy
 * @Date: 2022-02-02 19:18:31
 * @LastEditTime: 2022-02-02 20:59:05
 * @FilePath: \简易画板\webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // 入口配置
    entry: './src/js/index.js',
    // 出口配置
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出文件夹必须定义为绝对路径
        path: path.resolve(__dirname, './dist'),
        // 公共路径配置
        publicPath: '',
        // 打包前清理 dist 文件夹
        clean: true,
        // 静态资源模块输出文件名
        assetModuleFilename: 'images/[contenthash][ext][query]',
    },
    // 插件配置
    plugins: [
        // 实例化 html-webpack-plugin 插件
        new HtmlWebpackPlugin(
            // 配置对象
            {
                // 打包所参照的文件，若不配置，则生成一个只有资源引入的 html 文件
                template: './src/index.html',
                // 打包生成的文件名称。默认为index.html
                filename: 'app.html',
                // 设置所有资源文件注入模板的位置。可以设置的值true | 'head' | 'body' | false，默认值为 true
                inject: 'body',
            },
        ),
    ],
    // 模式配置
    mode: 'production', // 开发模式：development，生产模式：production，生产模式下自动压缩HTML代码和去除注释
    // 资源文件配置
    module: {
        // 资源匹配规则列表
        rules: [
            {
                // 资源匹配规则
                test: /\.(jpg|png|gif)$/,
                // 资源模块类型
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                    // 需要兼容的浏览器
                                    targets: {
                                        chrome: '60',
                                        firefox: '60',
                                        ie: '9',
                                        safari: '10',
                                        edge: '17',
                                    },
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    // 优化配置
    optimization: {
        // 压缩配置
        minimizer: [
            // 实例化 CssMinimizerPlugin，用于压缩CSS代码
            new CssMinimizerPlugin(),
            // 压缩JS
            new TerserPlugin(),
        ],
    },
    // 关闭 webpack 的性能提示
    performance: {
        hints: false,
    },
};
