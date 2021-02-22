const express = require('express')
const UserSchema = require('../UserSchema')
const ArticleSchema = require('../ArticleSchema')
const getOpenid = require('../getOpenid')
const formidable = require('formidable')
const {entoken,detoken} = require('../token')
const path = require('path')
const {
  equal
} = require('assert')
const release = express.Router()

release.get('/add', function (req, res) {
  ArticleSchema.Add({
    ...req.query
  }).then(v => {
    console.log(v)
    res.send('1')
  }).catch(v => {
    res.send('2')
  })
})

release.get('/search', function (req, res) {
  console.log(detoken(req.headers.authorization))
  ArticleSchema.find({
    ...req.query
  }).then(v => {
    res.send(v)
  })
})

release.get('/id', function (req, res) {
  ArticleSchema.findOne({
    ...req.query
  }).then(v => {
    // console.log(v)
    res.send(v)
  })
})

release.get('/remove', function (req, res) {
  ArticleSchema.findOneAndDelete({
    ...req.query
  }).then(v => {
    res.send('删除成功')
  }).catch(v => {
    res.send('删除失败')
  })

})

release.get('/search2', function (req, res) {
  ArticleSchema.find({
    name: req.query.query
  }).then(v => {
    let result = v

    ArticleSchema.find({}).then(v2 => {
      let arr = []
      for (var v4 in v2) {
        if (v2[v4].title.includes(req.query.query)) {
          result.foreach(v => {
            console.log(v)
          })
          result.push(v2[v4])
        }
      }
      res.send(result)
    }).catch(v => {
      res.send()
      console.log(v)
    })
  })
})

release.get('/again', function (req, res) {
  ArticleSchema.findOneAndDelete({
    _id: req.query._id,
  }).then(v => {
    let obj = {
      ...v._doc
    }
    delete obj._id
    delete obj.date
    delete obj.comments
    delete obj.isfind
    ArticleSchema.Add({
      ...obj,
      date: req.query.date
    }).then(v => {
      res.send("操作成功")
    })
  })
})

release.get('/updata', function (req, res) {
  const _id = req.query._id
  delete req.query._id
  console.log(req.query)
  ArticleSchema.findOneAndUpdate({
    _id,
  }, {
    ...req.query
  }).then(v => {
    console.log(v.isfind)
  })
  res.send()
})

module.exports = release