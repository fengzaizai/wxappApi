const express = require('express')
const ArticleSchema = require('../ArticleSchema')
const AdminSchema = require('../AdminSchema')
const {
  entoken,
  detoken
} = require('../token')

const admin = express.Router()

admin.post('/add', function (req, res) {
  AdminSchema.findOneAndAdd({
    ...req.body
  }).then(v => {
    res.send('添加成功')
  }).catch(v => {
    res.send('添加失败')
  })
})

admin.post('/login', function (req, res) {
  AdminSchema.findOne({
    username: req.body.username
  }).then(async v => {
    if (v === null) return res.send('username-err')
    if (v.password !== req.body.password) return res.send('password-err')
    const token = await entoken(v.username)
    res.send(token)
  }).catch(v => {
    console.log(v)
  })
  // res.send()
})

admin.get('/search', async function (req, res) {
  let arr = new Array()

  const users = await AdminSchema.find({})

  const xunwu = await ArticleSchema.find({
    type: '寻物启事'
  })
  const shiwu = await ArticleSchema.find({
    type: '失物招领'
  })
  arr[0] = {
    id: '1',
    authName: '用户管理',
    icon: 'icon-user-cog',
    children: [{
      id: '11',
      authName: '用户列表',
      // children: users,
      path: '/users'
    }]
  }
  arr[1] = {
    id: '2',
    authName: '发布管理',
    icon: 'icon-fabuguanli',
    children: [{
        id: '21',
        authName: '寻物启事',
        // children: xunwu,
        icon: 'icon-xunwuqishi',
        path: '/xunwu'
      },
      {
        id: '22',
        authName: '失物招领',
        // children: shiwu,
        icon: 'icon-shiwuzhaoling',
        path: '/shiwu'
      },
    ]
  }
  arr[2] = {
    id: '3',
    authName: '举报管理',
    children: [],
    icon: 'icon-jubaoguanli-',
  }
  res.send(arr)
})

admin.get('/users', function (req, res, next) {
  const {
    pagenum,
    query,
    pagesize
  } = req.query
  AdminSchema.find({
    ...query
  }).then(v => {
    let users = []
    for (let i = 0; i < pagesize; i++) {
      let v1 = v[i + (pagenum - 1) * pagesize]
      if (v1) {
        users.push(v1)
      }
    }
    const obj = {
      users,
      totalPage: v.length,
      pagenum,
    }
    res.send(obj)
  })
})

admin.get('/xunwu', async function (req, res) {
  const {
    pagenum,
    query,
    pagesize
  } = req.query
  ArticleSchema.find({
    ...query,
    type:'寻物启事'
  }).then(v => {
    let Xunwu = []
    for (let i = 0; i < pagesize; i++) {
      let v1 = v[i + (pagenum - 1) * pagesize]
      if (v1) {
        Xunwu.push(v1)
      }
    }
    const obj = {
      Xunwu,
      totalPage: v.length,
      pagenum,
    }
    res.send(obj)
  })
})

admin.get('/shiwu', async function (req, res) {
  const {
    pagenum,
    query,
    pagesize
  } = req.query
  ArticleSchema.find({
    ...query,
    type:'失物招领'
  }).then(v => {
    let Xunwu = []
    for (let i = 0; i < pagesize; i++) {
      let v1 = v[i + (pagenum - 1) * pagesize]
      if (v1) {
        Xunwu.push(v1)
      }
    }
    const obj = {
      Xunwu,
      totalPage: v.length,
      pagenum,
    }
    res.send(obj)
  })
})

module.exports = admin