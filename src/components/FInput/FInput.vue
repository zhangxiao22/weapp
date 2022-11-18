<template>
  <div class="container">
    <van-field :value="value"
               :label="label"
               clearable
               size="large"
               :type="type"
               :disabled="disabled"
               :required="required"
               :autosize="autosize"
               :readonly="readonly"
               :placeholder="`请输入${label}`"
               :border="border"
               input-align="right"
               :error="error"
               :error-message="errorMessage"
               error-message-align="right"
               @change="handleChange"
               @clear="handleClear"
               @focus="error=false"
               @blur="validate" />
  </div>
</template>

<script>
export default {
  name: 'QRInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
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
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      error: false
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
    handleClear() {
      this.$emit('input', '')
    },
    handleChange({ detail }) {
      // 双向绑定
      this.$emit('input', detail)
      this.$emit('change', detail)
    },
    // 只做非空校验
    validate() {
      return !(this.error = !(this.required ? !!this.value : true))
    }
  }
}
</script>

<style scoped lang="scss">
</style>
