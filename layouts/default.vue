<template>
  <div v-if="price && networkStats && networkStatus">
    <Topbar/>
    <Headerbar/>
    <Sidebar/>
    <nuxt class="content" :class="sidebarExpanded ? 'content_collapsed' : null"/>
  </div>
  <Preloader v-else/>
</template>
<script>
import { mapGetters } from 'vuex'

import Sidebar from '~/components/Sidebar/Sidebar'
import Topbar from '~/components/Topbar/Topbar'
import Headerbar from '~/components/Headerbar/Headerbar'
import Preloader from '~/components/Preloader/Preloader'

export default {
  components: {
    Sidebar,
    Topbar,
    Headerbar,
    Preloader
  },
  computed: mapGetters({
    sidebarExpanded: 'sidebar/get',
    price: 'price/getCurrentPrice',
    networkStats: 'network/getNetworkStats',
    networkStatus: 'network/getNetworkStatus'
  }),
  destroyed() {
    clearInterval(this.intervalPrice)
    clearInterval(this.intervalNetworkStats)
    clearInterval(this.intervalNetworkStatus)
  },
  mounted: function() {
    this.updatePrice()
    this.updateNetworkStats()
    this.updateNetworkStatus()
    this.intervalPrice = setInterval(this.updatePrice, 60000)
    this.intervalNetworkStats = setInterval(this.updateNetworkStats, 60000)
    this.intervalNetworkStatus = setInterval(this.updateNetworkStatus, 60000)
  },
  methods: {
    updatePrice() {
      this.$store.dispatch('price/getCurrentPrice')
    },
    updateNetworkStats() {
      this.$store.dispatch('network/updateNetworkStats')
    },
    updateNetworkStatus() {
      this.$store.dispatch('network/updateNetworkStatus')
    }
  }
}
</script>
