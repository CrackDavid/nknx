<template>
  <Card col="3" padding="none">
    <div class="general-stats">
      <div class="general-stats__item">
        <div class="general-stats__title">{{ networkStats.totalNodes }}</div>
        <div class="general-stats__subtitle">{{$t('currentNetworkNodes')}}</div>
      </div>
      <div class="general-stats__divider"/>
      <div class="general-stats__item">
        <div class="general-stats__data">
          <div v-for="item in items" :key="item.title" class="general-stats__data-item">
            <span class="fe general-stats__data-icon" :class="item.icon"/>
            <div class="general-stats__data-description">
              <div class="general-stats__data-title">{{ item.data }}</div>
              <div class="general-stats__data-subtitle">{{$t(item.title)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './GeneralStats.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'

import { mapGetters } from 'vuex'
export default {
  components: {
    Card
  },
  data: () => {
    return {
      items: {
        countries: {
          icon: 'fe-globe',
          title: 'countries',
          data: null
        },
        providers: {
          icon: 'fe-database',
          title: 'nodeProviders',
          data: null
        },
        blocks: {
          icon: 'fe-box',
          title: 'blocks',
          data: null
        },
        transactions: {
          icon: 'fe-shuffle',
          title: 'transactions',
          data: null
        }
      }
    }
  },
  computed: mapGetters({
    networkStats: 'network/getNetworkStats'
  }),
  destroyed() {
    clearInterval(this.intervalNetworkStats)
  },
  mounted: function() {
    this.updateNetworkStats()
    this.intervalNetworkStats = setInterval(this.updateNetworkStats, 60000)
  },
  methods: {
    updateNetworkStats() {
      this.$store.dispatch('network/updateNetworkStats')
      this.items.countries.data = this.networkStats.totalCountries
      this.items.providers.data = this.networkStats.totalProviders
      this.items.blocks.data = this.networkStats.totalBlocks
      this.items.transactions.data = this.networkStats.totalTransactions
    }
  }
}
</script>
