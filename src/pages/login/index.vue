<template>
  <view class="content">
    <image src="@/static/logo.png"
           class="logo"
           mode="aspectFit" />
    <van-cell-group :border="false">
      <van-field :value="account"
                 clearable
                 label="账号"
                 input-align="right"
                 placeholder="请输入账号"
                 @change="account=$event.detail" />
      <van-field :model:value="password"
                 type="password"
                 label="密码"
                 input-align="right"
                 placeholder="请输入密码"
                 :border="false"
                 @change="password=$event.detail" />
    </van-cell-group>
    <van-button class="btn"
                type="primary"
                block
                @click="login">登录</van-button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      password: ''
    }
  },
  onLoad() {

  },
  methods: {
    login() {
      // console.log('account????',this.account)
      if (!this.account) {
        return uni.showToast({
          title: '请输入账号',
          icon: 'none'
        })
      }
      if (!this.password) {
        return uni.showToast({
          title: '请输入密码',
          icon: 'none'
        })
      }
      const params = {
        name: this.account,
        password: this.password
      }
      this.$api.login(params).then(res => {
        wx.setStorageSync('token', res.data.access_token)
        uni.reLaunch({ url: '/pages/home/index' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  padding: 25rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 25rpx);
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  .logo {
    width: 200rpx;
    height: 200rpx;
    margin: 25rpx auto;
  }
  .btn {
    margin-top: auto;
  }
}
</style>
