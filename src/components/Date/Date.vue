<template>
  <view class="container">
    <van-field :value="text"
               :label="label"
               :placeholder="`请选择${label}`"
               :border="border"
               readonly
               size="large"
               :required="required"
               input-align="right"
               is-link
               @click.native="open" />
    <van-calendar :show="show"
                  @close="show=false"
                  @confirm="onConfirm" />
  </view>
</template>

<script>
export default {
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
      // text: '',
      show: false
    }
  },
  computed: {
    // defaultDate() {
    //   return
    // },
    text() { return this.formate(this.value) }
  },
  created() {
    // console.log('this.value??????', this.value)
  },
  methods: {
    open() {
      !this.readonly && (this.show = true)
    },
    onDisplay() {
      this.show = true
    },
    onClose() {
      this.show = false
    },
    // timestamp => string
    formate(time) {
      return this.parseTime(time, '{y}-{m}-{d}')
    },
    onConfirm({ detail }) {
      console.log(detail)
      this.show = false
      // 双向绑定
      this.$emit('input', this.formate(detail))
      this.$emit('change', this.formate(detail))
    }
  }

}
</script>

<style scoped lang="scss">
.container {
}
</style>
