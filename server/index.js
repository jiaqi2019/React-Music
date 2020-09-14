const express = require('express')
const path = require('path')

const apiRouter = require('./router/api_router')

const app = express()
app.use('/api', apiRouter)   //代理，请求qq接口

const isProd = process.env.NODE_ENV === 'production'
const port = isProd ? 8000 : 4000
if (isProd) {
  //生产环境
  const addProdMiddlewares = require('./middleware/addProdMiddleware')
  addProdMiddlewares(app, {
    publicPath: '/',
    outputPath: path.resolve(process.cwd(), 'dist')
  })
} else {
  //开发环境
  const addDevMiddleware = require('./middleware/addDevMiddleware')
  const config = require('../webpack/webpack.dev')
  addDevMiddleware(app, config)
}


app.listen(port, () => {
  console.log(`localhost:${port} starting...`);
})





