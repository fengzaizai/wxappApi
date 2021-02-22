const express = require('express')
const cors = require('cors')

const router = require('./router')
const release = require('./routes/release')
const admin = require('./routes/admin')
const user = require('./routes/user')
const {
  entoken,
  detoken
} = require('./token')
const expressJwt = require('express-jwt');
const app = express()

//中间件解决跨域问题
app.use(cors())

//中间件解决post请求中的数据获取问题
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

//静态文件夹
app.use(express.static('public'))
//也不知道有什么用 上传图片用的
app.use(express.static(__dirname + "./../myapi"));

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  token = token.replace('Bearer ','')
  if (!!token) {
    return next();
  } else {
    detoken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      //token解析失败
      return next();
    })
    return next()
  }
})

app.use(expressJwt({
  secret: 'tokenKey',
  algorithms:['HS256']
}).unless({
	path: ["/user/register","/user/login",'/admin/api/login']//除了这个地址，其他的URL都需要验证
}));


//使用路由
app.use('/release', release)
app.use('/admin/api', admin)
app.use('/user', user)
app.use(router)

app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).send('token失效');
	}
});
//开启服务
app.listen(3000, function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('成功')
})