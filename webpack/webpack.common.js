const path = require('path')
const {srcPath, distPath} = require('./paths')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: distPath,
      publicPath: "/"
    },
    options.output,
  ),
  module: {
    rules: options.module.rules.concat([
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: [
              [
                '@babel/preset-env',
                  {
                      // 按需加载
                      useBuiltIns: 'usage',
                      // 指定core-js版本
                      corejs: {
                          version: 3
                      },
                      // 指定兼容性做到哪个版本浏览器
                      targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                          edge: '17'
                      }
                  }
              ],
              "@babel/preset-react",
            ]
          }
        }
      },
      {
        test: /\.(bmp|png|svg|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8*1024,
          name: '[hash:10].[ext]',
          outputPath: 'imges'
        }
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)/,
        loader: 'file-loader',
        options:{
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ])
  },
 
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点vs插件没有路径提示
    // alias: {
    //   $css: resolve(__dirname, 'app/css')
    // },
    // 配置省略文件路径的后缀名
    //默认值位js和json
    //配置后js中引入可以不写后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录，不用让他自己不断向上级目录寻找
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules']
  },

  plugins: options.plugins.concat([
    // 使用此插件可以在命令行中NODE_ENV=development去设置 process.env.NODE_ENV的实际值
    // windows中没有NODE_ENV这个变量，需要set NODE_ENV=development
    // 或者使用cross-env,  cross-env NODE_ENV=development
    // 不使用此插件时process.env.NODE_ENV的值与 该配置中mode值相同
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // 除非有定义 process.env.NODE_ENV，否则就使用 'development'
      DEBUG: false
    }),
    new CleanWebpackPlugin(),
  ]),

  optimization: options.optimization,
  devtool: options.devtool,
  performance: options.performance || {},
  target: 'web',
})


































