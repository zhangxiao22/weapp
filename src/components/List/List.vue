<template>
  <view class="container safe-box">
    <template v-if="list.length">
      <slot name="list"
            :scope="{list}" />
      <view v-if="loading"
            style="text-align:center;">
        <van-loading color="#1989fa" />
      </view>
      <view v-if="last"
            class="last">到底了</view>
    </template>
    <van-empty v-else
               image="search"
               description="无数据" />
  </view>
</template>

<script>
import { filterObj } from '@/utils/utils'
import { getAction, postAction } from '@/api/api'
// import { listMixins } from '@/mixins/listMixins.js'
export default {
  options: {
    styleIsolation: 'shared'
  },
  props: {
    /**
     * @param {String} url 请求列表接口
     */
    url: {
      type: String,
      default: '',
      required: true
    },
    filter: {
      type: Object,
      default: () => { }
    }
  },
  // mixins: [listMixins],
  data() {
    return {
      // filter: {},
      page: 1,
      last: false,
      loading: false,
      list: []
    }
  },
  computed: {
    system() {
      return wx.getSystemInfoSync()
    }
  },
  created() {
    uni.$on('refresh', () => {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      this.refresh()
    })
  },
  mounted() {
    this.autoRefresh()
  },
  // onPullDownRefresh() {
  //   console.log(111111111)
  //   this.refresh()
  // },
  // onReachBottom() {
  //   if (this.last) return
  //   this.page++
  //   this.loadData({ page: this.page })
  // },
  methods: {
    pullDownRefresh() {
      this.refresh()
    },
    reachBottom() {
      if (this.last) return
      this.page++
      this.loadData({ pageNum: this.page })
    },
    // 手动刷新
    autoRefresh() {
      if (this.system.platform === 'devtools') {
        // 开发工具需要手动触发
        this.refresh()
      } else {
        wx.startPullDownRefresh()
      }
    },
    async refresh() {
      clearTimeout(this.time)
      const t1 = new Date().getTime()
      // if (this.system.platform !== 'devtools') {
      //   wx.startPullDownRefresh()
      // }
      await this.init()
      const t2 = new Date().getTime()
      const t = (t2 - t1) > 1000 ? t2 - t1 : 1000 - (t2 - t1)
      this.time = setTimeout(() => {
        wx.stopPullDownRefresh()
        // console.log(new Date().getTime() - t1)
      }, t)
    },
    init() {
      return Promise.all([
        this.loadData({ refresh: true })
      ])
    },
    // search(params) {
    //   this.filter = { ...params }
    //   uni.pageScrollTo({
    //     scrollTop: 0,
    //     duration: 0
    //   })
    //   // nextTick防止页面滚动效果
    //   this.$nextTick(() => {
    //     this.autoRefresh()
    //   })
    // },
    loadData({ pageNum = 1, pageSize = 10, refresh = false } = {}) {
      if (!this.url) return
      // 去空
      const params = filterObj({ pageNum, pageSize, ...this.filter })
      // 导航条加载动画
      wx.showNavigationBarLoading()
      // wx.showLoading({
      //   title: '加载中',
      //   mask: true
      // })
      !refresh && (this.loading = true)
      return new Promise((resolve) => {
        // setTimeout(() => {
        getAction(this.url, params).then((res) => {
          if (refresh) {
            this.page = 1
            this.list = res.data.list
          } else {
            this.list.push(...res.data.list)
          }
          console.log('list??????', this.list)
          this.last = !res.data.hasNext
          if (this.last) {
            // uni.showToast({
            //   icon: 'none',
            //   title: '已加载所有数据'
            // })
          }
        })
          .finally(() => {
            this.loading = false
            wx.hideNavigationBarLoading()
            // wx.hideLoading()
            resolve()
          })
        // }, refresh ? 0 : 3000)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
