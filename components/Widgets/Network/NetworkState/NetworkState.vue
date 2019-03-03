<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
      <Card>
        <div class="general-stats">
          <div class="general-stats__item">
            <div class="general-stats__title">{{ networkNodes.stats.totalNodes }}</div>
            <div class="general-stats__subtitle">Current Network Nodes</div>
          </div>
          <div class="general-stats__divider"></div>
          <div class="general-stats__item">
            <div class="general-stats__data">
              <div class="general-stats__data-item">
                <div class="general-stats__data-icon">
                  <GlobeIcon></GlobeIcon>
                </div>
                <div class="general-stats__data-description">
                  <div class="general-stats__data-title">{{ networkNodes.stats.totalCountries }}</div>
                  <div class="general-stats__data-subtitle">Countries</div>
                </div>
              </div>
              <div class="general-stats__data-item">
                <div class="general-stats__data-icon">
                  <DatabaseIcon></DatabaseIcon>
                </div>
                <div class="general-stats__data-description">
                  <div class="general-stats__data-title">{{ networkNodes.stats.totalProviders }}</div>
                  <div class="general-stats__data-subtitle">Node Providers</div>
                </div>
              </div>
            </div>
            <div class="general-stats__data">
              <div class="general-stats__data-item">
                <div class="general-stats__data-icon">
                  <BoxIcon></BoxIcon>
                </div>
                <div class="general-stats__data-description">
                  <div class="general-stats__data-title">{{dailyBlocks[0].count}}</div>
                  <div class="general-stats__data-subtitle">Blocks 24h</div>
                </div>
              </div>
              <div class="general-stats__data-item">
                <div class="general-stats__data-icon">
                  <ShuffleIcon></ShuffleIcon>
                </div>
                <div class="general-stats__data-description">
                  <div class="general-stats__data-title">{{dailyTransactions[0].count}}</div>
                  <div class="general-stats__data-subtitle">Transactions 24h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </vs-col>
  </vs-row>
</template>

<script>
import Card from '~/components/Card/Card.vue'
import { mapGetters } from 'vuex'
import {
  GlobeIcon,
  DatabaseIcon,
  BoxIcon,
  ShuffleIcon
} from 'vue-feather-icons'

export default {
  components: {
    Card,
    GlobeIcon,
    DatabaseIcon,
    BoxIcon,
    ShuffleIcon
  },
  computed: mapGetters({
    networkStatus: 'network/getNetworkStatus',
    networkNodes: 'network/getNetworkNodes',
    dailyTransactions: 'transactions/getDailyTransactions',
    dailyBlocks: 'blocks/getDailyBlocks'
  }),
  destroyed() {
    clearInterval(this.intervalNetworkStatus)
    clearInterval(this.intervalNetworkNodes)
    clearInterval(this.intervalDailyTransactions)
    clearInterval(this.intervalDailyBlocks)
  },
  mounted: function() {
    this.updateNetworkStatus()
    this.updateNetworkNodes()
    this.updateDailyTransactions()
    this.updateDailyBlocks()
    this.intervalNetworkStatus = setInterval(this.updateNetworkStatus, 60000)
    this.intervalNetworkNodes = setInterval(this.updateNetworkNodes, 60000)
    this.intervalDailyTransactions = setInterval(
      this.updateDailyTransactions,
      60000
    )
    this.intervalDailyBlocks = setInterval(this.updateDailyBlocks, 60000)
  },
  methods: {
    updateNetworkStatus() {
      this.$store.dispatch('network/getCurrentNetworkStatus')
    },
    updateNetworkNodes() {
      this.$store.dispatch('network/getCurrentNetworkNodes')
    },
    updateDailyTransactions() {
      this.$store.dispatch('transactions/getDailyTransactions')
    },
    updateDailyBlocks() {
      this.$store.dispatch('blocks/getDailyBlocks')
    }
  }
}
</script>
