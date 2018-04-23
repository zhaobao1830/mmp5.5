/**
 * Created by zb on 2018/4/9.
 */
// 验证手机号
export function checkTel (tel) {
  let re = new RegExp('^1[3|4|5|7|8|][0-9]{9}')
  if (!re.test(tel)) {
    this.$message('请输入正确手机号！')
    return false
  }
}

// 是否是正整数
export function isIntNum (val) {
  var regPos = /^[0-9]+$/ // 非负整数
  if (regPos.test(val)) {
    return true
  } else {
    return false
  }
}
