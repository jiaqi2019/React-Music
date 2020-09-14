const {srcPath, distPath} = require('./paths')
const apiOptions = require('./devServer')

const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = require('./webpack.common')({
  mode: 'development',
  entry: {
    index: path.join(srcPath, 'index')
  },
  output: {
    filename: '[name].bundle.js',
    // publicPath: "/music/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node-modules/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  optimization: {
    splitChunks: {
    	chunks: 'all'
    }
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.join(srcPath, 'index.html')
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map',
  // devtool: 'inline-source-map',
  performance: {
    //开发环境关闭，bundle过大的警告或错误
    hints: false
  },

  //使用devServer时使用
  devServer: {
    port: 4000,
    contentBase: distPath,
    compress: true,
    hot: true,
    historyApiFallback:{
      index:'index.html'
    },
    ...apiOptions,

    // publicPath: '/',         
    //不指定会与ouputPath中publicPath一致，在server根目录和ouput.publicPath都可以访问到
    // ouput.publicPath指定打包时，资源url引用的目录前缀（上线路径），默认不写相对路径是相对当前请求路径
    // 而devServer是对上线的模拟
    // 由于webpack打包生成的文件放在 distPath
    // 此处 contentBase: distPath 
    // devServer会将contentBase中的文件放在 server的publicPath中
  }
})












