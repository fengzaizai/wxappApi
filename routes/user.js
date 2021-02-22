const express = require('express')
const ArticleSchema = require('../ArticleSchema')
const UserSchema = require('../UserSchema')
const {
  entoken,
  detoken
} = require('../token')

const user = express.Router()

user.post('/register', function (req, res) {
  UserSchema.findOneAndAdd({
    ...req.body
  }).then(v => {
    res.send('注册成功')
  }).catch(v => {
    res.send(v)
  })
  // console.log(req.body)
  // res.send('1111')
})

user.post('/login', function(req,res,next){
  console.log(req.body)
  UserSchema.findOne({
    userId:req.body.userId,
  }).then(async v => {
    if(!v){
      return res.send('账号不存在')
    }
    if(v.password !== req.body.password){
      return res.send('密码有误')
    }
    const token = await entoken(req.body.userId)
    res.send(token)
  })
})

module.exports = user