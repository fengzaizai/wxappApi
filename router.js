const express = require('express')
const UserSchema = require('./UserSchema')
const ArticleSchema = require('./ArticleSchema')
const getOpenid = require('./getOpenid')
const formidable = require('formidable')
const path = require('path')
const {
  equal
} = require('assert')
const router = express.Router()

//图片上传
router.post('/image/up', function (req, res) {
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.join(__dirname + "/../myapi/public/image");
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;
  // 处理图片
  form.parse(req, function (err, fields, files) {
    // console.log(files);
    var filename = files.image.path
    var nameArray = filename.split('\\');
    res.send('http://127.0.0.1:3000/image/' + nameArray[nameArray.length - 1])
  })
})
//登录
router.get('/login', function (req, res) {
  // console.log(req.query) 
  UserSchema.findOne({
      openid: req.query.openid
    })
    .then(v => {
      if (v) {
        res.send(v)
      } else {
        UserSchema.findOneAndAdd({
          ...req.query
        }).then(res => {
          console.log(res)
          res.send()
        }).catch(v => {
          res.send('添加失败')
        })
      }
    }).catch(v => {
      res.send('获取信息失败')
    })
})

router.get('/login/openid', function (req, res) {
  console.log(req.query)
  getOpenid(req.query.code).then(v => {
    res.send(v)
  })
})

router.get('/comment/add', function (req, res) {
  const articleId = req.query.articleId
  // delete req.query.articleId
  ArticleSchema.findOne({
    _id: articleId
  }).then(v => {
    let comments = v.comments
    comments.push(req.query)
    console.log(comments)
    ArticleSchema.findOneAndUpdate({
      _id: articleId
    }, {
      comments,
    }).then(v => {
      res.send('留言成功')
      // console.log(v)
    }).catch(v => {
      res.send('留言失败')
    })
  })
})

router.get('/comment/reply', function (req, res) {
  const {
    articleId,
    replyIndex
  } = req.query
  // delete req.query.articleId
  // delete req.query.replyIndex
  // console.log(req.query)
  ArticleSchema.findOne({
    _id: articleId
  }).then(v => {
    v.comments[replyIndex] = req.query
    ArticleSchema.findOneAndUpdate({
      _id: articleId
    }, {
      comments: v.comments
    }).then(v => {
      console.log(v.comments[replyIndex])
      res.send('回复成功')
    }).catch(v => {
      res.send('回复失败')
    })
  })
})

router.get('/user/meto', function (req, res) {
  ArticleSchema.find({
    ...req.query
  }).then(v1 => {
    let goodsList = []
    for (let v2 in v1) {
      for (let v3 in v1[v2].comments) {
        if (v1[v2].comments[v3].openid === req.query.openid) {
          console.log(v1[v2])
          goodsList.push({
            _id: v1[v2]._id,
            content: v1[v2].comments[v3].content,
            title: v1[v2].title,
            nickName: v1[v2].nickName,
          })
        }
      }
    }
    res.send(goodsList)
  })
})

router.get('/user/tome', function (req, res) {

  ArticleSchema.find({
    openid: req.query.openid
  }).then(v1 => {
    let goodsList = []
    for (let v2 in v1) {
      if (v1[v2].comments[0]) {
        goodsList.push(v1[v2].comments)
      }
    }
    res.send(goodsList)
  })
})


module.exports = router