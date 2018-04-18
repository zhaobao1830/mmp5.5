// 获取url的参数 这个的url有问题，获取不到window.location.search
export function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')  // 构造一个含有目标参数的正则表达式对象
  var r = window.location.href.split('?')[1].match(reg)   // 匹配目标参数
  if (r != null) return unescape(r[2]); return null // 返回参数值
}
