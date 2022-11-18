<template>
  <view class="container">
    <view class="placehold"
          :style="{height:height+'px'}" />
    <view class="footer-fix safe-box">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      height: 0
    }
  },
  created() {

  },
  mounted() {
    wx.createSelectorQuery()
      .in(this)
      .select('.footer-fix')
      .boundingClientRect()
      .exec((res = []) => {
        this.height = res[0].height
      })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.container {
  .placehold {
  }
  .footer-fix {
    z-index: 20;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
