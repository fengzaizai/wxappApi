const express = require('express')
const ArticleSchema = require('../ArticleSchema')
const UserSchema = require('../UserSchema')
const {
  entoken,
  detoken
} = require('../token')

const superAuth = express.Router()

superAuth.get('/yanzheng', function (req, res, next) {
  console.log(req.data)
  res.send()
})

module.exports = superAuth