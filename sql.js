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
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  openid: {
    type: String,
  }
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
    type: Array,
  },
  date: {
    type: String,
  },
  comments: {
    type: Array,
  },
  isfind: {
    type: Boolean,
  },
  releaseStatus: {
    type: String
  },
})

var adminSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  identity: {
    type: String
  },
  state: {
    type: Boolean
  }
})

var User = mongoose.model('User', userSchema)
var Article = mongoose.model('Article', articleSchema)
var Admin = mongoose.model('Admin', adminSchema)

module.exports.User = mongoose.model('User', userSchema)
module.exports.Article = mongoose.model('Article', articleSchema)
module.exports.Admin = mongoose.model('Admin', adminSchema)