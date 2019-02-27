<template>
  <div class="topbar">
    <div class="row">
      <div class="col-xs-12">
        <div class="box"><activity-icon class="custom-class"></activity-icon></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ActivityIcon } from 'vue-feather-icons'

export default {
  components: {
    ActivityIcon
  },
  computed: mapGetters({
    price: 'price/get'
  }),
  destroyed() {
    clearInterval(this.interval)
  },
  mounted: function() {
    this.updatePrice()
    this.interval = setInterval(this.updatePrice, 6000)
  },
  methods: {
    updatePrice() {
      this.$store.dispatch('price/getCurrentPrice')
    }
  }
}
</script>
