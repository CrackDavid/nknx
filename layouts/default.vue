<template>
  <div
    v-if="price && networkStats && networkStatus && dailyHistoryPrice && dailyTransactions && dailyBlocks"
  >
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
    networkStatus: 'network/getNetworkStatus',
    dailyHistoryPrice: 'price/getDailyHistoryPrice',
    dailyTransactions: 'transactions/getDailyTransactions',
    dailyBlocks: 'blocks/getDailyBlocks'
  }),
  destroyed() {
    clearInterval(this.intervalPrice)
    clearInterval(this.intervalNetworkStats)
    clearInterval(this.intervalNetworkStatus)
    clearInterval(this.intervalDailyHistoryPrice)
    clearInterval(this.intervalDailyTransactions)
    clearInterval(this.intervalDailyBlocks)
  },
  mounted: function() {
    this.updatePrice()
    this.updateNetworkStats()
    this.updateNetworkStatus()
    this.updateDailyHistoryPrice()
    this.updateDailyTransactions()
    this.updateDailyBlocks()

    this.intervalPrice = setInterval(this.updatePrice, 60000)
    this.intervalNetworkStats = setInterval(this.updateNetworkStats, 60000)
    this.intervalNetworkStatus = setInterval(this.updateNetworkStatus, 60000)
    this.intervalDailyHistoryPrice = setInterval(
      this.updateDailyHistoryPrice,
      60000
    )
    this.intervalDailyTransactions = setInterval(
      this.updateDailyTransactions,
      60000
    )
    this.intervalDailyBlocks = setInterval(this.updateDailyBlocks, 60000)
  },
  methods: {
    updatePrice() {
      this.$store.dispatch('price/updateCurrentPrice')
    },
    updateNetworkStats() {
      this.$store.dispatch('network/updateNetworkStats')
    },
    updateNetworkStatus() {
      this.$store.dispatch('network/updateNetworkStatus')
    },
    updateDailyHistoryPrice() {
      this.$store.dispatch('price/updateDailyHistoryPrice')
    },
    updateDailyTransactions() {
      this.$store.dispatch('transactions/updateDailyTransactions')
    },
    updateDailyBlocks() {
      this.$store.dispatch('blocks/updateDailyBlocks')
    }
  }
}
</script>
