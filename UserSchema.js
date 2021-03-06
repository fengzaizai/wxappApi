const {
  Promise
} = require('mongoose')
const sql = require('./sql')

module.exports.findOne = function (query) {
  return new Promise(function (resolve, reject) {
    sql.User.findOne({
      ...query
    }, function (err, ret) {
      resolve(ret)
    })
  })
}

module.exports.findOneAndUpdate = function (query, updata) {
  return new Promise(function (resolve, reject) {
    sql.User.findOneAndUpdate({
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
    sql.User.findOne({
      userId: query.userId
    }, function (err, ret) {
      // console.log(ret)
      if (!ret) {
        sql.User.findOne({
          userName: query.userName
        }, function (err_2, ret_2) {
          if (!ret_2) {
            const user = new sql.User({
              ...query
            })
            user.save(function (err, ret2) {
              if (err) {
                console.log(err)
              } else {
                // console.log('保存成功')
                resolve(ret2)
              }
            })
          }else{
            reject('用户名已存在')
          }
        })
      } else {
        reject('账号已存在')
      }

    })
  })

}

module.exports.findOneAndRemove = function (query) {
  return new Promise(function (resolve, reject) {
    sql.User.findOneAndRemove({
      ...query
    }, function (err, ret) {
      // console.log(ret)
      resolve(ret)
    })
  })
}

module.exports.find = function () {
  return new Promise((resolve, reject) => {
    sql.User.find(function (err, ret) {
      ret.forEach(v => {
        //处理密码与openid
        v.password = ''
        v.openid = ''
      })
      resolve(ret)
    })
  })
}