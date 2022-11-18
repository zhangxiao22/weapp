<template>
  <view class="container">
    <Form ref="form">
      <FInput v-model="form.aa"
              label="aaaa"
              required
              :readonly="readonly" />
      <FInput v-model="form.b"
              label="bbb"
              required
              :readonly="readonly" />
      <FInput v-model="form.c"
              label="ccc"
              required
              :readonly="readonly" />
      <FInput v-model="form.dd"
              label="dddd"
              required
              :readonly="readonly" />
      <FInput v-model="form.e"
              label="eeee"
              required
              :readonly="readonly" />
      <Upload label="上传图片"
              required
              :border="false" />
    </Form>
    <StickBottom>
      <van-button type="info"
                  block
                  @click="submit">默认按钮</van-button>
    </StickBottom>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      readonly: false

    }
  },
  onLoad() {

  },
  methods: {
    afterRead({ detail }) {
      const { file } = detail
      console.log(file)
    },
    submit() {
      const validate = this.$refs.form.validate()
      console.log('validate......', validate)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // background: #fff;
  // height: 200vh;
  // border: 1px solid red;
}
</style>
