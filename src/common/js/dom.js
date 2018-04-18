import $ from 'jquery'
// 删除Array里面指定的值
export function deleteArray (arr, str) {
  let newArr = []
  $.each(arr, (item, value) => {
    if (value === str) {
      return
    } else {
      newArr.push(value)
    }
  })
  return newArr
}

// 通过class获取指定属性的值
export function attrValByClass (className, data) {
  let dataVal = []
  for (let i = 0; i < $('.' + className).length; i++) {
    dataVal.push($('.' + className).eq(i).find('td img').attr(data))
  }
  return dataVal
}
