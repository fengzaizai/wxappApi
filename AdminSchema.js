const {
  Promise
} = require('mongoose')
const sql = require('./sql')

module.exports.findOne = function (query) {
  return new Promise(function (resolve, reject) {
    sql.Admin.findOne({
      ...query
    }, function (err, ret) {
      // console.log(ret)
      resolve(ret)
    })
  })
}

module.exports.findOneAndUpdate = function (query, updata) {
  return new Promise(function (resolve, reject) {
    sql.Admin.findOneAndUpdate({
      ...query
    }, {
      ...updata
    }, function (err, ret) {
      // console.log(ret)
      resolve(ret)
    })
  })
}

module.exports.findOneAndAdd = function (query) {
  return new Promise(function (resolve, reject) {
    sql.Admin.findOne({
      userid: query.userid
    }, function (err, ret) {
      // console.log(ret)
      if (!ret) {
        const user = new sql.Admin({
          ...query
        })
        user.save(function (err, ret2) {
          if (err) {
            console.log(err)
          } else {
            console.log('保存成功')
            resolve(ret2)
          }
        })
      } else {
        reject(1)
      }

    })
  })

}

module.exports.findOneAndRemove = function (query) {
  return new Promise(function (resolve, reject) {
    sql.Admin.findOneAndRemove({
      ...query
    }, function (err, ret) {
      // console.log(ret)
      resolve(ret)
    })
  })
}

module.exports.find = function () {
  return new Promise((resolve, reject) => {
    sql.Admin.find(function (err, ret) {
      ret.forEach(v => {
        //处理密码与openid
        v.password = ''
        v.openid = ''
      })
      resolve(ret)
    })
  })
}