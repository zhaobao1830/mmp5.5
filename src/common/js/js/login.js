import axios from 'axios'
require('es6-promise').polyfill()
export function authority (obj) {
  let username = '' || sessionStorage.getItem('username')
  // 获取权限
  let data = {
    username: username
  }
  axios({
    // url: 'http://mmp.crecgwm.com/getauthority.php',
    url: obj.$store.state.baseUrl + obj.$store.state.mmpUrl + 'index.php?s=User/Index/getAuthority',
    method: 'POST',
    data: data,
    // params: 'type=selectR',
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(function (response) {
    if (response.data.is_expire !== 'TRUE' && response.data.length !== 0 && response.data.authority) {
      obj.$store.commit('changeAuthority', response.data.authority)
      obj.$store.commit('changeUsername', sessionStorage.getItem('username'))
      obj.$store.commit('loginSu', 'mmpcont')
    }
  })
  .catch(function (err) {
    console.log(err)
  })
}
