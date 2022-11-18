<template>
  <div class="container">
    <van-cell :title="label"
              size="large"
              :required="required"
              :border="border"
              use-label-slot>
      <view slot="label"
            class="uploader-box">
        <van-uploader class="uploader"
                      :file-list="fileList"
                      @after-read="afterRead" />
      </view>

    </van-cell>
  </div>

</template>

<script>
export default {
  options: {
    styleIsolation: 'shared'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [
        // {
        //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        //   name: '图片1'
        // }
        // {
        //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        //   name: '图片1'
        // }
        //  {
        //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        //   name: '图片1'
        // }
        //  {
        //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        //   name: '图片1'
        // }, {
        //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        //   name: '图片1'
        // }, {
        //   url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        //   name: '图片1'
        // }
      ]
    }
  },
  computed: {

  },
  watch: {
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.container {
  .uploader-box {
    float: right;
  }
  ::v-deep .uploader {
    .van-uploader__wrapper {
      justify-content: flex-end;
    }
  }
}
</style>
