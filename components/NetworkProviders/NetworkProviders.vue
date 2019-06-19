<template>
  <Card col="3">
    <div class="network-providers">
      <div class="network-providers__header">
        <h3 class="network-providers__heading">{{$t('nodeProvider')}}</h3>
      </div>
    </div>
    <NetworkProvidersChart/>
    <div class="network-providers__top">
      <div class="network-providers__top-title">
        <div>{{$t('top3Providers')}}</div>
      </div>
      <div v-for="item in providersTop" :key="item.isp" class="network-providers__top-item">
        <div class="network-providers__top-icon">
          <img :src="'/icons/'+item.isp + '.svg' || '' " alt>
        </div>
        <div class="network-providers__top-stats">
          <div class="network-providers__top-heading">
            <div class="network-providers__top-name">{{item.isp}}</div>
            <div class="network-providers__top-counter">{{item.count}}</div>
          </div>
          <div class="network-providers__top-bar" :style="{width: item.percent+'%'}"></div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './NetworkProviders.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import NetworkProvidersChart from '~/components/Charts/NetworkProvidersChart.vue'

export default {
  components: {
    Card,
    NetworkProvidersChart
  },
  data: () => {
    return {
      providersTop: null
    }
  },
  computed: mapGetters({
    networkProviders: 'network/getNetworkProviders'
  }),
  mounted: function() {
    this.getProvidersTop()
  },
  methods: {
    getProvidersTop: function() {
      this.providersTop = this.networkProviders.slice(0, 3)
    }
  }
}
</script>
