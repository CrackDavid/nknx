<template>
  <div>
    <div class="row">
      <div class="col col_xs_3">
        <NetworkState/>
      </div>
    </div>
    <div class="row">
      <div class="col col_xs_12">
        <MarketStats/>
      </div>
    </div>
  </div>
</template>

<script>
import NetworkState from '~/components/Widgets/Network/NetworkState/NetworkState.vue'
import MarketStats from '~/components/Widgets/Market/MarketStats/MarketStats.vue'

export default {
  auth: false,
  components: {
    NetworkState,
    MarketStats
  }
}
</script>
