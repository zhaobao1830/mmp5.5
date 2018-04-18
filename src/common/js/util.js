/**
 * Created by zb on 2018/4/9.
 */
// 验证手机号
export function checkTel (tel) {
  let re = new RegExp('^1[3|4|5|7|8|][0-9]{9}')
  if (!re.test(tel)) {
    alert('请输入正确手机号！')
    return false
  }
}
