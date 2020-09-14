const path = require('path')

const {srcPath} = require('./paths')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin  = require('terser-webpack-plugin')

module.exports = require('./webpack.common')({
  mode: 'production',
  entry: {
    index: path.join(srcPath, 'index')
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                // require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
                // require('cssnano')()
              ]
            }
          }
        ]
      },
    ]
  },
  optimization: {            //为js使用压缩优化
    minimize: true,        //生产模式默认为true
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: 'production',   //默认与mode一致，没有mode则为prodution
    sideEffects: true,      //识别package.json中sideEffects
    concatenateModules: true, //生产模式下默认启用, 相当于ModuleConcatenationPlugin, 就是作用域提升
    runtimeChunk: 'single',   // 用于优化持久化缓存，
                              //每个入口文件添加一个额外的 包含运行时的chunk，dist中也会生成对应runtime.js
                              // 值single为{name:'runtime'}的别名，表示被所有生成得chunk共享
                              // 默认为false，表示每个chunk中都添加runtime
                              // 产生的runtime chunk就是webpack的运行环境和模块信息清单, 从每个chunk中单独打包出来，
                              // 使得在runtime改变时，不会影响到其他 chunk,从而不会改变其他chunk的hashname,命中缓存.

    splitChunks: {         // 相当于使用SplitChunksPlugin, 分离条件：可共享的模块以及来自node_modules中的模块，模块超过30kb时,
                          // 目的：1.分理处不经常变化的模块，便于缓存
                          // 2. 分理处被多个模块共用的模块, 减少请求此处, 考虑请求成本,默认选择30kb以上的才分离出,可以自定义大小
      chunks: 'all',
      maxInitialRequests: 20,  //入口文件,最大并行请求数量,默认3, 此值为多少，就会最多分离出多少个chunk, 与入口js并行加载
                               // 相当于入口文件的拆分数量
      minSize: 0,          // 单位为byte, 默认为30000
      // automaticNameDelimiter: '~',
      cacheGroups: {  //核心配置, 有两个缓存组vender和default
                      // 默认node_modules中所有module会赋给vendor
                      // 被2个以上chunk引用的模块 会赋给default组
                      // 二者都满足时通过priority值决定赋给哪个cache组
        // 会覆盖splitChunks中其他配置，比如name设置后会覆盖automaticNameDelimiter
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vender',   
          name: (module) => {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
          priority: -10,
        },
        //总之，但入口基本没必要去设置default,
        default: {
          //多入口，minChunks可设置为2, 至少被2个chunk引用的模块，
          // name: (module) => {
          //   const packageName = module.context.split('\\').slice(-1);
          //   console.log(packageName[0]);
          //   return packageName[0]
          // },
          // minChunks: 2,  
          
          //单入口,
          // minChunks设置为1的,没什么意义，相当于默认输出的main.js,多此一举，还会增加请求次数
          // name: 'common', 
          name: (module) => {
            const packageName = module.context.split('\\').slice(-1);
            return packageName[0]
          },
          minChunks: 2,  
          priority: -20,
          reuseExistingChunk: true
        }
      },
    },  
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,     //在html底部引入资源
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    // 使用此插件可以在命令行中NODE_ENV=development去设置 process.env.NODE_ENV的实际值
    // windows中没有NODE_ENV这个变量，需要set NODE_ENV=development
    // 或者使用cross-env,  cross-env NODE_ENV=development
    // 不使用此插件时process.env.NODE_ENV的值与 该配置中mode值相同
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // 除非有定义 process.env.NODE_ENV，否则就使用 'development'
      DEBUG: false
    }),
   
  ],
  devtool: 'source-map',  //使用map,会为每个bundle生成对应得.map文件
  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
})






















