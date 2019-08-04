<template>
  <div>
    <div class="node-stats">
      <div class="node-stats__item">
        <div class="node-stats__icon node-stats__icon_color_purple fe fe-layers"></div>
        <div class="node-stats__data">
          <div class="node-stats__title">{{$t('monitoredNodes')}}</div>
          <div class="node-stats__value">{{nodes}}</div>
          <div class="node-stats__tooltip">{{networkStats.totalNodes}} {{$t('inNetwork')}}</div>
        </div>
      </div>

      <div class="node-stats__item">
        <div class="node-stats__icon node-stats__icon_color_green fe fe-codepen"></div>
        <div class="node-stats__data">
          <div class="node-stats__title">{{$t('reward24')}}</div>
          <div class="node-stats__value">
            {{Number(reward24).toFixed(2) | commaNumber}}
            <span class="node-stats__currency">NKN</span>
          </div>
          <div class="node-stats__tooltip"></div>
        </div>
      </div>

      <div class="node-stats__item">
        <div class="node-stats__icon node-stats__icon_color_red fe fe-credit-card"></div>
        <div class="node-stats__data">
          <div class="node-stats__title">{{$t('totalMined')}}</div>
          <div class="node-stats__value">
            {{Number(total).toFixed(2) | commaNumber}}
            <span class="node-stats__currency">NKN</span>
          </div>
        </div>
      </div>

      <div class="node-stats__item">
        <div class="node-stats__icon node-stats__icon_color_orange fe fe-dollar-sign"></div>
        <div class="node-stats__data">
          <div class="node-stats__title">{{$t('totalProfit')}}</div>
          <div class="node-stats__value">
            ${{Number(total * price.prices[0].price).toFixed(0) | commaNumber}}
            <span
              class="node-stats__currency"
            >USD</span>
          </div>
          <div
            class="node-stats__tooltip"
          >${{Number(daily * price.prices[0].price).toFixed(0) | commaNumber}} {{$t('profitToday')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './NodeStats.scss';
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    nodes: {
      type: Number,
      default: 0
    },
    daily: {
      type: Number,
      default: 0
    },
    reward24: {
      type: Number,
      default: 0
    },
    monthly: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },

  data: () => {
    return {}
  },
  computed: mapGetters({
    networkStats: 'network/getNetworkStats',
    price: 'price/getCurrentPrice'
  }),
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
