<template>
  <div class="container">
    <Input :label="label"
           :required="required"
           type="textarea"
           autosize
           :value="value"
           :readonly="readonly"
           @change="handleChange" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
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
    }
  },
  data() {
    return {
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
    handleChange(detail) {
      // 双向绑定
      this.$emit('input', detail)
      this.$emit('change', detail)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
}
</style>
