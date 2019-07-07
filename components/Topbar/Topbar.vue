<template>
  <div class="topbar">
    <div v-if="price.prices" class="topbar__left">
      <span class="topbar__block">
        USD/NKN: ${{ price.prices[0].price }}
        <span
          :class="{'topbar__block_negative': price.prices[0].percent_change_24h<0, 'topbar__block_positive': price.prices[0].percent_change_24h>0}"
        >({{ price.prices[0].percent_change_24h.toFixed(2) }}%)</span>
      </span>
      <span class="topbar__block">
        ETH/NKN: {{ price.prices[1].price }}
        <span
          :class="{'topbar__block_negative': price.prices[1].percent_change_24h<0, 'topbar__block_positive': price.prices[1].percent_change_24h>0}"
        >({{ price.prices[1].percent_change_24h.toFixed(2) }}%)</span>
      </span>
    </div>
    <div class="topbar__right">
      <span v-if="networkStatus" class="topbar__block">
        <span class="fe fe-activity topbar__icon" />
        <span
          :class="{'topbar__block_negative': networkStatus.syncState === 'OFFLINE'}"
        >{{ networkStatus.syncState }}</span>
      </span>
      <span v-if="networkStats" class="topbar__block">
        <span class="fe fe-layers topbar__icon" />
        {{ networkStats.totalNodes | commaNumber}} {{$t('totalNodes')}}
      </span>
      <span v-if="networkStatus" class="topbar__block">
        <span class="fe fe-git-branch topbar__icon" />
        {{ networkStatus.version | nodeVersion }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@import './Topbar';
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    price: 'price/getCurrentPrice',
    networkStats: 'network/getNetworkStats',
    networkStatus: 'network/getNetworkStatus'
  }),
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
