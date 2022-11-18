import { https } from './http'
export const getAction = (url, data) => https({ url, method: 'get', data })
export const postAction = (url, data) => https({ url, method: 'post', data })
export const api = {
  // 用户信息
  userInfo: (data) => getAction('/ccp-bsd-mng/api/user/getInfo', data),
  // 登录
  login: (data) => postAction('/ccp-cgd-access/oauth/token', data)
}

