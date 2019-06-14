<template>
  <Card padding="none" col="3">
    <Blinks/>
    <div
      class="network-status"
      :class="{'network-status_negative': networkSatus!='PersistFinished', 'network-status_positive': networkSatus=='PersistFinished'}"
    >
      <div class="network-status__version">{{ networkVersion | nodeVersion}}</div>
      <div class="network-status__status">{{ networkSatus }}</div>
      <div class="network-status__title">{{ $t('networkStatus') }}</div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './NetworkStatus.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import Blinks from '~/components/Blinks/Blinks.vue'
export default {
  components: {
    Card,
    Blinks
  },
  data: () => {
    return {
      networkSatus: '',
      networkVersion: ''
    }
  },
  computed: mapGetters({
    networkStatus: 'network/getNetworkStatus'
  }),
  mounted: function() {
    this.networkSatus = this.networkStatus.syncState
    this.networkVersion = this.networkStatus.version
  }
}
</script>
