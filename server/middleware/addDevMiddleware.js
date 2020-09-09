const webpack = require('webpack')
// 使用 sever开发，需使用该插件 把 webpack 处理后的文件传递给一个服务器(server)
const webpackDevMiddleware  = require('webpack-dev-middleware')  
const webpackHotMiddleware = require('webpack-hot-middleware');  //热更新
const path = require('path')



module.exports =  function addDevMiddleware(app, webpackConfig) {
  const compiler = webpack(webpackConfig) 
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'warn',
    stats: 'errors-only',
  })
  
  app.use(devMiddleware)
  app.use(webpackHotMiddleware(compiler))

  const fs = devMiddleware.fileSystem;
  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
}