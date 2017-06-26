/**
 * Created by zhangchi on 2017/5/12.
 */
const models = require('./db')
const express = require('express')
const router = express.Router()

/**
 * ************ 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  models.Login.findOne({account: req.body.account})
    .exec((err, data) => err ? console.log(err) : console.log(data))
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  })
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send('createAccount successed')
    }
  })
})
/* eslint-disable no-new */
// 获取已有账号接口
router.post('/api/login/getAccount', (req, res) => {
  // 通过模型去查找数据库
  console.log(req.body.account)
  models.Login.findOne({account: req.body.account})
    .exec((err, data) => {
      if (err) {
        res.send(err)
      } else {
        if (data === null) {
          res.send('账户不存在')
        } else {
          // res.send(data)
          if (data.password !== req.body.password) {
            res.send('密码不正确，正确密码为：' + data.password + '您输入密码为' + req.body.password + ' ' +
              (data.password == req.body.password) + ' ' + (typeof data.password) + ' ' + (typeof req.body.password) +
              ' ' + data.password.length + ' ' + req.body.password.length
            )
          } else {
            res.send('密码正确，登录成功！')
          }
        }
      }
    })
})

module.exports = router
