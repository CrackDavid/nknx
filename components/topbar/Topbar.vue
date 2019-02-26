<template>
  <div class="row topbar">
    <span>{{ price }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
