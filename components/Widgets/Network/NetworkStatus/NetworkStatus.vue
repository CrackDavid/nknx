<template>
  <Card>
    <Blinks/>
    <div
      class="network-status"
      :class="{'network-status_negative': networkSatus!='PersistFinished', 'network-status_positive': networkSatus=='PersistFinished'}"
    >
      <div class="network-status__version">
        {{ networkVersion }}
      </div>
      <div class="network-status__status">
        {{ networkSatus }}
      </div>
      <div class="network-status__title">
        {{ $t('networkStatus') }}
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/Card/Card.vue'
import Blinks from '~/components/Modifiers/Blinks/Blinks.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card,
    Blinks
  },
  data: () => {
    return {
      networkSatus: null,
      networkVersion: null
    }
  },
  computed: mapGetters({
    networkStatus: 'network/getNetworkStatus'
  }),
  mounted: function() {
    this.networkSatus = this.networkStatus.status
    this.networkVersion = this.networkStatus.version
  }
}
</script>
