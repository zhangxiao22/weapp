import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
import { api } from './api/api.js'
import { parseTime, dicts } from '@/utils/utils'
Vue.prototype.$api = api
Vue.prototype.$parseTime = parseTime
// 全局分享
import shareMixins from './mixins/shareMixins'
Vue.mixin(shareMixins)
const app = new Vue({
  ...App
})
app.$mount()
