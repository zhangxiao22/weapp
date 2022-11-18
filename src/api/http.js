export function https(config) {
  const token = wx.getStorageSync('token')
  // 设置请求头
  config.header = {
    ...config.headers,
    // 'content-type': config.contentType || 'application/x-www-form-urlencoded',
    token
  }
  config.url = `${process.env.VUE_APP_API_BASE_URL}${process.env.VUE_APP_BASE_API}${config.url}` // 请求地址
  return new Promise(function (resolve, reject) {
    uni.request({
      ...config,
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data)
          } else if (res.data.code === 401) {
            // 没权限，返回登录页
            uni.reLaunch({
              url: '/pages/login/index'
            })
          } else {
            uni.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            reject()
          }
        } else {
          if (res.statusCode === 404) {
            uni.showToast({
              title: '资源不存在',
              icon: 'none'
            })
          }
          // else if (res.statusCode === 401 || res.statusCode === 403) {
          //   // 没权限，返回登录页
          //   uni.reLaunch({
          //     url: '/pages/login'
          //   })
          // }
          reject()
        }
      },
      fail: (e) => {
        console.error('error:', e)
        uni.showToast({
          title: '网络异常,请稍后再试',
          icon: 'none'
        })
        reject()
      },
      complete: () => { }
    })
  })
}
