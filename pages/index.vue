<template>
  <div>
    <div class="row">
      <div class="col col_xs_9">
        <div class="row">
          <div class="col col_xs_4">
            <NetworkState/>
          </div>
          <div class="col col_xs_4"/>
          <div class="col col_xs_4"/>
        </div>
        <div class="row">
          <div class="col col_xs_12">
            <MarketStats/>
          </div>
        </div>
      </div>

      <div class="col col_xs_3">

          <NknxNews/>

      </div>
    </div>
  </div>
</template>

<script>
import NetworkState from '~/components/Widgets/Network/NetworkState/NetworkState.vue'
import MarketStats from '~/components/Widgets/Market/MarketStats/MarketStats.vue'
import NknxNews from '~/components/Widgets/News/NknxNews/NknxNews.vue'

export default {
  auth: false,
  components: {
    NetworkState,
    MarketStats,
    NknxNews
  }
}
</script>
