export const listMixins = {
  data() {
    return {
    }
  },
  onLoad(e) {
    this.query = e
  },
  onShow() {
  },
  computed: {

  },
  onPullDownRefresh() {
    this.$refs.list?.pullDownRefresh()
  },
  onReachBottom() {
    this.$refs.list?.reachBottom()
  },
  methods: {

  }
}
