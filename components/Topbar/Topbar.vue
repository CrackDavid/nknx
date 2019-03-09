<template>
  <div class="topbar">
    <div v-if="price.prices" class="col col_xs_4">
      <div class="row">
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
    </div>
    <div class="col col_xs_8">
      <div class="row row_end_xs">
        <span class="topbar__block">
          <span class="topbar__status topbar__status_positive"/> 18/18 Mining
        </span>
        <span class="topbar__block">875 tNKN per day</span>
        <span class="topbar__block">
          <span class="fe fe-activity topbar__icon"/>
          {{ networkStatus.status }}
        </span>
        <span class="topbar__block">
          <span class="fe fe-layers topbar__icon"/>
          {{ networkNodes.stats.totalNodes }} Total Nodes
        </span>
        <span v-if="networkStatus" class="topbar__block">
          <span class="fe fe-git-branch topbar__icon"/>
          {{ networkStatus.version }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    price: "price/getCurrentPrice",
    networkStatus: "network/getNetworkStatus",
    networkNodes: "network/getNetworkNodes"
  }),
  destroyed() {
    clearInterval(this.intervalPrice);
    clearInterval(this.intervalNetworkStatus);
    clearInterval(this.intervalNetworkNodes);
  },
  mounted: function() {
    this.updatePrice();
    this.updateNetworkStatus();
    this.updateNetworkNodes();
    this.intervalPrice = setInterval(this.updatePrice, 60000);
    this.intervalNetworkStatus = setInterval(this.updateNetworkStatus, 60000);
    this.intervalNetworkNodes = setInterval(this.updateNetworkNodes, 60000);
  },
  methods: {
    updatePrice() {
      this.$store.dispatch("price/getCurrentPrice");
    },
    updateNetworkStatus() {
      this.$store.dispatch("network/getCurrentNetworkStatus");
    },
    updateNetworkNodes() {
      this.$store.dispatch("network/getCurrentNetworkNodes");
    }
  }
};
</script>
