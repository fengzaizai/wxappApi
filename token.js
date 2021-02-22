const jwt = require('jsonwebtoken')

module.exports.entoken = function (userId) {
  return new Promise((resolve, reject) => {
    const userid = userId

    const PRIVATE_KEY = 'tokenKey'

    const JWT_EXPIRED = 72*60*60

    const token = jwt.sign({
      userid
    }, PRIVATE_KEY, {
      expiresIn: JWT_EXPIRED
    })
    // console.log(token)
    resolve(token)
  }) 
}

module.exports.detoken = function (token) {
  return new Promise((resolve, reject) => {
    const PRIVATE_KEY = 'tokenKey'
    //解析token
    let verifyToken = jwt.verify(token, PRIVATE_KEY)
    // console.log(verifyToken.userid)
    if(verifyToken.userid){
      resolve(verifyToken)
    }else{
      reject("tokenError")
    }
  })
}
