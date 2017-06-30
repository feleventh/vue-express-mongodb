/**
 * Created by zhangchi on 2017/5/12.
 */
'use strict'
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
/*
mongoose.connect('mongodb://localhost/test')

// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))
/!**
 * ************ 定义模式loginSchema **************!/
const loginSchema = mongoose.Schema({
  account: String,
  password: String
})

/!**
 * ************ 定义模型Model **************!/
const Models = {
  Login: mongoose.model('Login', loginSchema)
}
 
module.exports = Models
*/
mongoose.connect('mongodb://localhost/childBook')
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection successed'))
const bookSchema = mongoose.Schema({
  isbn: String,
  name: String,
  author: String,
  publisher: String,
  price: Number
})
const adminSchema = mongoose.Schema({
  user: String,
  password: String
})
const bookModel = mongoose.model('book', bookSchema)
const adminModel = mongoose.model('admin', adminSchema)

module.exports = {bookModel, adminModel}
