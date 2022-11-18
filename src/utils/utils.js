import { getAction } from '@/api/api'
/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj === 'object')) {
    return
  }

  for (const key in obj) {
    if (
      // eslint-disable-next-line no-prototype-builtins
      obj.hasOwnProperty(key) &&
      (obj[key] === null || obj[key] === undefined || obj[key] === '')
    ) {
      delete obj[key]
    }
  }
  return obj
}

// rpx转px
export const rpxToPx = (rpx) => {
  return rpx / 750 * wx.getSystemInfoSync().windowWidth
}

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 获取字典数据
export function getDict(dict) {
  if (!dict) return
  return new Promise(resolve => {
    getAction(`/system/dict/data/type/${dict}`).then(res => {
      resolve(
        res.data.map(n => {
          return {
            label: n.dictLabel,
            value: n.dictValue
          }
        })
      )
    })
  })
}
