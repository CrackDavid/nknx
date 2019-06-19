<template>
  <div
    v-if="price && networkStats && networkStatus && dailyHistoryPrice && dailyTransactions && dailyBlocks && latestSigchain && networkCities && networkCountries && networkProviders"
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
    networkCities: 'network/getNetworkCities',
    networkCountries: 'network/getNetworkCountries',
    networkProviders: 'network/getNetworkProviders',
    dailyHistoryPrice: 'price/getDailyHistoryPrice',
    dailyTransactions: 'transactions/getDailyTransactions',
    dailyBlocks: 'blocks/getDailyBlocks',
    latestSigchain: 'latestSigchain/getLatestSigchain'
  }),
  destroyed() {
    clearInterval(this.intervalPrice)
    clearInterval(this.intervalNetworkStats)
    clearInterval(this.intervalNetworkStatus)
    clearInterval(this.intervalNetworkCities)
    clearInterval(this.intervalNetworkCountries)
    clearInterval(this.intervalNetworkProviders)
    clearInterval(this.intervalDailyHistoryPrice)
    clearInterval(this.intervalDailyTransactions)
    clearInterval(this.intervalDailyBlocks)
    clearInterval(this.intervalLatestSigchain)
  },
  mounted: function() {
    this.updatePrice()
    this.updateNetworkStats()
    this.updateNetworkStatus()
    this.updateNetworkCities()
    this.updateNetworkCountries()
    this.updateNetworkProviders()
    this.updateDailyHistoryPrice()
    this.updateDailyTransactions()
    this.updateDailyBlocks()
    this.updateLatestSigchain()

    this.intervalPrice = setInterval(this.updatePrice, 60000)
    this.intervalNetworkStats = setInterval(this.updateNetworkStats, 60000)
    this.intervalNetworkStatus = setInterval(this.updateNetworkStatus, 60000)
    this.intervalNetworkCities = setInterval(this.updateNetworkCities, 60000)
    this.intervalNetworkCountries = setInterval(
      this.updateNetworkCountries,
      60000
    )
    this.intervalNetworkProviders = setInterval(
      this.updateNetworkProviders,
      60000
    )
    this.intervalDailyHistoryPrice = setInterval(
      this.updateDailyHistoryPrice,
      60000
    )
    this.intervalDailyTransactions = setInterval(
      this.updateDailyTransactions,
      60000
    )
    this.intervalDailyBlocks = setInterval(this.updateDailyBlocks, 60000)
    this.intervalLatestSigchain = setInterval(this.updateLatestSigchain, 60000)
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
    updateNetworkCities() {
      this.$store.dispatch('network/updateNetworkCities')
    },
    updateNetworkCountries() {
      this.$store.dispatch('network/updateNetworkCountries')
    },
    updateNetworkProviders() {
      this.$store.dispatch('network/updateNetworkProviders')
    },
    updateDailyHistoryPrice() {
      this.$store.dispatch('price/updateDailyHistoryPrice')
    },
    updateDailyTransactions() {
      this.$store.dispatch('transactions/updateDailyTransactions')
    },
    updateDailyBlocks() {
      this.$store.dispatch('blocks/updateDailyBlocks')
    },
    updateLatestSigchain() {
      this.$store.dispatch('latestSigchain/updateLatestSigchain')
    }
  }
}
</script>
