<template>
  <Card
    :col="$mq === 'xl' ? '3' : $mq === 'llg' ? '6' : $mq === 'lg' ? '6' : '12'"
    row="2"
    padding="none"
  >
    <div class="general-stats general-stats_gradient">
      <div class="general-stats__item">
        <div class="general-stats__title">
          {{ Number(
          (userNodes.statCounts.ALL / networkStats.totalNodes) * 100
          ).toFixed(2) }}%
        </div>
        <div class="general-stats__subtitle">{{$t('networkControl')}}</div>
      </div>
      <div class="general-stats__divider" />
      <div class="general-stats__item">
        <div class="general-stats__data">
          <div v-for="item in items" :key="item.title" class="general-stats__data-item">
            <span class="fe general-stats__data-icon" :class="item.icon" />
            <div class="general-stats__data-description">
              <div class="general-stats__data-title">
                {{ item.data }}
                <span
                  v-if="item.title !=='activeNodes'"
                  class="general-stats__data-symbol"
                >NKN</span>
              </div>
              <div class="general-stats__data-subtitle">{{$t(item.title)}}</div>
            </div>
          </div>
        </div>
      </div>
      <Button
        class="general-stats__btn modal__footer-button"
        type="router"
        theme="success"
        :full="true"
        url="node-manager"
      >{{$t('viewMyNodes')}}</Button>
    </div>
  </Card>
</template>

<style lang="scss">
@import './GeneralStats.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'

import { mapGetters } from 'vuex'
export default {
  components: {
    Card,
    Button
  },
  data: () => {
    return {
      items: {
        activeNodes: {
          icon: 'fe-layers',
          title: 'activeNodes',
          data: null
        },
        reward24: {
          icon: 'fe-bar-chart-2',
          title: 'reward24',
          data: null
        },
        minedTotal: {
          icon: 'fe-bar-chart',
          title: 'minedTotal',
          data: null
        },
        minedAverage: {
          icon: 'fe-crosshair',
          title: 'minedAverage',
          data: null
        }
      }
    }
  },
  computed: mapGetters({
    userNodes: 'userNodes/getUserNodes',
    userNodesStats: 'userNodes/getUserNodesStats',
    networkStats: 'network/getNetworkStats'
  }),
  destroyed() {},
  mounted: function() {
    this.updateMiningStats()
  },
  methods: {
    updateMiningStats() {
      this.items.activeNodes.data = this.userNodes.statCounts.PERSIST_FINISHED
      this.items.reward24.data =
        '~' + Number(this.userNodesStats.reward24).toFixed(0)
      this.items.minedTotal.data =
        '~' + Number(this.userNodesStats.rewardAll).toFixed(0)
      this.items.minedAverage.data = Number(
        this.userNodesStats.reward24 / this.userNodes.statCounts.ALL
      ).toFixed(3)
    }
  }
}
</script>
