<template>
  <Card
    :col="$mq === 'xl' ? '3' : $mq === 'llg' ? '6' : $mq === 'lg' ? '6' : '12'"
    row="2"
    padding="none"
  >
    <div class="general-stats">
      <div class="general-stats__item">
        <div class="general-stats__title">{{ networkStats.totalNodes }}</div>
        <div class="general-stats__subtitle">{{$t('currentNetworkNodes')}}</div>
      </div>
      <template v-if="open === true && $mq !== 'lg' && $mq !=='llg' && $mq !=='xl'">
        <div class="general-stats__divider" />
        <div class="general-stats__item">
          <div class="general-stats__data">
            <div v-for="item in items" :key="item.title" class="general-stats__data-item">
              <span class="fe general-stats__data-icon" :class="item.icon" />
              <div class="general-stats__data-description">
                <div class="general-stats__data-title">{{ item.data }}</div>
                <div class="general-stats__data-subtitle">{{$t(item.title)}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="$mq !== 'xs' && $mq !=='sm' && $mq !=='md'">
        <div class="general-stats__divider" />
        <div class="general-stats__item">
          <div class="general-stats__data">
            <div v-for="item in items" :key="item.title" class="general-stats__data-item">
              <span class="fe general-stats__data-icon" :class="item.icon" />
              <div class="general-stats__data-description">
                <div class="general-stats__data-title">{{ item.data }}</div>
                <div class="general-stats__data-subtitle">{{$t(item.title)}}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div
        v-if="$mq === 'xs' || $mq ==='sm' || $mq ==='md'"
        :class="['general-stats__toggle', open !== true ? 'fe fe-chevron-down' : 'fe fe-chevron-up']"
        @click="toggle"
      ></div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './GeneralStats.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  data: () => {
    return {
      open: false,
      items: {
        countries: {
          icon: 'fe-globe',
          title: 'countries',
          data: null
        },
        providers: {
          icon: 'fe-database',
          title: 'nodeProviders',
          data: null
        },
        blocks: {
          icon: 'fe-box',
          title: 'blocks',
          data: null
        },
        transactions: {
          icon: 'fe-shuffle',
          title: 'transactions',
          data: null
        }
      }
    }
  },
  computed: mapGetters({
    networkStats: 'network/getNetworkStats'
  }),
  destroyed() {},
  mounted: function() {
    this.updateNetworkStats()
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    updateNetworkStats() {
      this.items.countries.data = this.networkStats.totalCountries
      this.items.providers.data = this.networkStats.totalProviders
      this.items.blocks.data = this.networkStats.totalBlocks
      this.items.transactions.data = this.networkStats.totalTransactions
    }
  }
}
</script>
