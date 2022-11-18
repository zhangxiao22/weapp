import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
  
  },
  mutations: {
    
  },
  actions: {
    // 获取用户信息
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        api.userInfo()
          .then((response) => {
            // uni.setStorageSync('userType', response.userType.value)
            // uni.setStorageSync('userInfo', response)
            // uni.setStorageSync('isSubscribe', response.isSubscribe)
            // commit('SET_USER_TYPE', response.userType.value)
            // commit('SET_HAS_REG', response.auditStatus.value === 'Pass')
            // commit('SET_INFO', response)
            // commit('SET_AVATAR', response.avatar)
            // commit('SET_SUBSCRIBE', response.isSubscribe)
            // commit('SET_NAME', {
            //   username: response.account,
            //   realname: response.realname
            // })
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  },
  getters: {
    
  }
})
export default store
