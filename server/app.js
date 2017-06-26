// 引入编写好的api
const api = require('./api')
// 引入文件模块
const fs = require('fs')
// 引入处理路径的模块
const path = require('path')
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express')
const app = express()

const model = require('./db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(api)
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
// 监听8088端口
app.listen(8088)
console.log('success listen…………')

model.create({
  name: '小王子（纯美珍藏绘本）',
  author: '安东尼·德·圣-埃克苏佩里',
  publisher: '中央广播电视大学出版社',
  price: 22.10
}, function (err) {
  if (err) return console.log(err)
})
