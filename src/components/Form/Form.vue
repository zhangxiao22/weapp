<template>
  <div class="container">
    <van-cell-group :border="border">
      <slot />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'QRForm',
  props: {
    border: {
      type: Boolean,
      default: false
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
    validate() {
      // console.log(this.$children)
      const flag = []
      this.$children.forEach(n => {
        if (n.validate) {
          flag.push(n.validate())
        } else {
          flag.push(true)
        }
      })
      return flag.every(n => n)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
