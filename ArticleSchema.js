const {
  Promise
} = require('mongoose')
const sql = require('./sql')

module.exports.find = function (query) {
  return new Promise(function (resolve, reject) {
    sql.Article.find({
      ...query
    }, function (err, ret) {
      // console.log(ret)
      resolve(ret)
    })
  })
}

module.exports.findOne = function(query){
  return new Promise((resolve,reject) => {
    sql.Article.findOne({
      ...query
    },function(err,ret){
      resolve(ret)
    })
  })
}

module.exports.findOneAndUpdate = function (query, updata) {
  return new Promise(function (resolve, reject) {
    sql.Article.findOneAndUpdate({
      ...query
    }, {
      ...updata
    }, function (err, ret) {
      // console.log(ret)
      resolve(ret)
    })
  })
}

module.exports.Add = function (query) {
  return new Promise(function (resolve, reject) {
    const article = new sql.Article({
      ...query
    })
    article.save(function (err, ret2) {
      if (err) {
        console.log(err)
      } else {
        console.log('保存成功')
        resolve(ret2)
      }
    })

  })

}

module.exports.findOneAndDelete = function (query) {
  return new Promise(function (resolve, reject) {
    sql.Article.findOneAndDelete({
      ...query
    }, function (err, ret) {
      // console.log(ret)
      resolve(ret)
    })
  })
}