<template>
  <div class="container">
    <!-- <van-cell :title="label"
              :value="text"
              is-link
              size="large"
              :clickable="!readonly"
              :border="border"
              @click="open" /> -->
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
    <van-popup :show="show"
               position="bottom"
               round
               lock-scroll
               @close="show=false"
               @touchmove.stop>
      <van-picker ref="picker"
                  show-toolbar
                  :default-index="defaultIndex"
                  :columns="columns"
                  @cancel="show=false"
                  @confirm="onConfirm" />
    </van-popup>
  </div>

</template>

<script>
import { getDict } from '@/utils/utils'
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
    // 字典
    dict: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    // placeholder: {
    //   type: String,
    //   default: '请选择'
    // },
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
      dictOptions: [],
      show: false
      // text: ''
    }
  },
  computed: {
    finalOptions() {
      if (this.dict) {
        return this.dictOptions
      } else {
        return this.options
      }
    },
    defaultIndex() {
      return this.finalOptions.findIndex(n => String(n.value) === String(this.value)) || 0
    },
    text() {
      return this.finalOptions.find(n => String(n.value) === String(this.value))?.label || ''
    },
    columns() {
      return this.finalOptions.map(n => n.label)
    }
  },
  watch: {
  },
  created() {
    if (this.dict) {
      getDict(this.dict).then(res => {
        this.dictOptions = res
      })
    }
  },
  mounted() {

  },
  methods: {
    open() {
      !this.readonly && (this.show = true)
    },
    reset() {
      this.$emit('input', '')
      const value = this.finalOptions[0].label
      this.$refs.picker.setValues([value])
    },
    onConfirm({ detail }) {
      const { value, index } = detail
      // 显示值赋值
      // this.text = value
      // 双向绑定
      this.$emit('input', this.finalOptions[index].value)
      this.$emit('change', this.finalOptions[index])
      // 过一个生命周期再发送事件给u-form-item，否则this.$emit('input')更新了父组件的值，但是微信小程序上
      // 尚未更新到u-form-item，导致获取的值为空，从而校验混论
      // 这里不能延时时间太短，或者使用this.$nextTick，否则在头条上，会造成混乱
      // setTimeout(() => {
      //   // 将当前的值发送到 u-form-item 进行校验
      //   dispatch(this, 'u-form-item', 'on-form-change', 'aaaaa')
      // }, 50)
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
