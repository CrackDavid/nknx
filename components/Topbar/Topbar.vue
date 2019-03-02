<template>
  <div class="topbar">
    <vs-row>
      <vs-col
        v-if="price.prices"
        vs-type="flex"
        vs-justify="left"
        vs-align="center"
        vs-w="4"
        class="topbar-left"
      >
        <span class="topbar-block">
          USD/NKN: ${{ price.prices[0].price }}
          <span
            :class="{'negative': price.prices[0].percent_change_24h<0, 'positive': price.prices[0].percent_change_24h>0}"
          >({{ price.prices[0].percent_change_24h.toFixed(2) }}%)</span>
        </span>
        <span class="topbar-block">
          ETH/NKN: {{ price.prices[1].price }}
          <span
            :class="{'negative': price.prices[1].percent_change_24h<0, 'positive': price.prices[1].percent_change_24h>0}"
          >({{ price.prices[1].percent_change_24h.toFixed(2) }}%)</span>
        </span>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="8" class="topbar-right">
        <span class="topbar-block">
          <span class="topbar-status positive"/> 18/18 Mining
        </span>
        <span class="topbar-block">875 tNKN per day</span>
        <span class="topbar-block">
          <activity-icon class="topbar-icon"/>
          {{ networkStatus.status }}
        </span>
        <span class="topbar-block">
          <box-icon class="topbar-icon"/>
          {{ networkNodes.length }} Total Nodes
        </span>
        <span v-if="networkStatus" class="topbar-block">
          <git-branch-icon class="topbar-icon"/>
          {{ networkStatus.version }}
        </span>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ActivityIcon, GitBranchIcon, BoxIcon } from 'vue-feather-icons'

export default {
  components: {
    ActivityIcon,
    GitBranchIcon,
    BoxIcon
  },
  computed: mapGetters({
    price: 'price/get',
    networkStatus: 'network/getNetworkStatus',
    networkNodes: 'network/getNetworkNodes'
  }),
  destroyed() {
    clearInterval(this.intervalPrice)
    clearInterval(this.intervalNetworkStatus)
    clearInterval(this.intervalNetworkNodes)
  },
  mounted: function() {
    this.updatePrice()
    this.updateNetworkStatus()
    this.updateNetworkNodes()
    this.intervalPrice = setInterval(this.updatePrice, 60000)
    this.intervalNetworkStatus = setInterval(this.updateNetworkStatus, 60000)
    this.intervalNetworkNodes = setInterval(this.updateNetworkNodes, 60000)
  },
  methods: {
    updatePrice() {
      this.$store.dispatch('price/getCurrentPrice')
    },
    updateNetworkStatus() {
      this.$store.dispatch('network/getCurrentNetworkStatus')
    },
    updateNetworkNodes() {
      this.$store.dispatch('network/getCurrentNetworkNodes')
    }
  }
}
</script>
