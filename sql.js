var mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
}
//连接数据库
mongoose.connect('mongodb://localhost/demo', options)

var Schema = mongoose.Schema

//构建用户信息结构
var userSchema = new Schema({
  nickName: {
    type: String,
    default: true
  },
  gender: {
    type: String,
  },
  language: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  country: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  phone: {
    type: String,
  },
  openid: {
    type: String,
    default: true
  },
  
})

var articleSchema = new Schema({
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  place: {
    type: String,
  },
  phone: {
    type: String,
  },
  describe: {
    type: String,
  },
  type: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  nickName: {
    type: String,
  },
  openid: {
    type: String,
  },
  images: {
    type: String,
  },
  date: {
    type: String,
  },
  comments:{
    type:Array,
  },
  isfind: {
    type: Boolean,
  },
})

var User = mongoose.model('User', userSchema)
var Article = mongoose.model('Article', articleSchema)

module.exports.User = mongoose.model('User', userSchema)
module.exports.Article = mongoose.model('Article', articleSchema)
// const user = new User({
//   userName:'冯菌',
//   userid: '9999',
//   password: '123456',
//   userPhone:15566262239,
//   userRights:'kezhang'
// })

// user.save(function (err, ret) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('保存成功')
//     console.log(ret)
//   }
// })