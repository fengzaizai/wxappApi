const express = require('express')
const cors = require('cors')

const router = require('./router')

const app = express()

//中间件解决跨域问题
app.use(cors())

//中间件解决post请求中的数据获取问题
app.use(express.urlencoded({
  extended: false
}))

app.use(express.static('public'))

app.use(express.static(__dirname + "./../myapi"));
//使用路由
app.use(router)

//开启服务
app.listen(3000, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('成功')
})