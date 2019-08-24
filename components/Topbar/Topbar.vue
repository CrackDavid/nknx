<template>
  <div v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'" class="topbar">
    <div v-if="price.prices" class="topbar__left">
      <span class="topbar__block">
        NKN/USD: ${{ price.prices[0].price }}
        <span
          :class="{'topbar__block_negative': price.prices[0].percent_change_24h<0, 'topbar__block_positive': price.prices[0].percent_change_24h>0}"
        >({{ price.prices[0].percent_change_24h.toFixed(2) }}%)</span>
      </span>
      <span class="topbar__block">
        NKN/ETH: {{ price.prices[1].price }}
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
        {{ networkVersion | nodeVersion }}
      </span>
    </div>
  </div>
  <div v-else class="topbar-mobile" @click="toggleTopbar">
    <div
      :class="['topbar-mobile__left', topbarExpanded === true ? 'topbar-mobile__left_hidden' : '']"
    >
      <span class="fe fe-activity topbar__icon" />
      <span class="fe fe-layers topbar__icon" />
      <span class="fe fe-git-branch topbar__icon" />
    </div>
    <div class="topbar-mobile__title">{{$t('networkStats')}}</div>
    <span
      :class="['topbar-mobile__toggle', topbarExpanded === true ?  'fe fe-chevron-down' : 'fe fe-chevron-up']"
    ></span>
    <ul :class="['topbar-mobile__list', topbarExpanded === true ? 'topbar-mobile__list_open' : '']">
      <li class="topbar-mobile__list-item">
        <span class="fe fe-activity topbar__icon" />
        {{ networkStatus.syncState }}
      </li>
      <li class="topbar-mobile__list-item">
        <span class="fe fe-layers topbar__icon" />
        {{ networkStats.totalNodes | commaNumber}} {{$t('totalNodes')}}
      </li>
      <li class="topbar-mobile__list-item">
        <span class="fe fe-git-branch topbar__icon" />
        {{ networkVersion | nodeVersion }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import './Topbar';
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      networkVersion: ''
    }
  },
  computed: mapGetters({
    price: 'price/getCurrentPrice',
    topbarExpanded: 'topbar/getTopbar',
    networkStats: 'network/getNetworkStats',
    networkStatus: 'network/getNetworkStatus',
    networkReleases: 'network/getNetworkReleases'
  }),
  destroyed() {},
  mounted: function() {
    this.networkVersion = this.networkReleases[0].tag_name
  },
  methods: {
    toggleTopbar() {
      this.$store.dispatch('topbar/toggleTopbar')
    }
  }
}
</script>
