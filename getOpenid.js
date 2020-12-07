const Axios = require('axios')

module.exports = function (code) {
  return new Promise(function (resolve, reject) {
    var secret = 'ea584d74e0d26cab34a8a10b87317932'
    var Appid = 'wx299ba13895267dd1'
    var wxUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + Appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';

    Axios.get(wxUrl).then(response => {
      var data = {
        ...response.data,
      }
      resolve(data)
    })
  })
}