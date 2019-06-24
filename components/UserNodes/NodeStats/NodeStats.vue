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
          <div class="node-stats__title">{{$t('averageRewardPerDay')}}</div>
          <div class="node-stats__value">
            {{daily | commaNumber}}
            <span class="node-stats__currency">NKN</span>
          </div>
          <div class="node-stats__tooltip">
            <!-- <span
              :class="{'node-stats__tooltip_negative': parseFloat(item.tooltip.number)<0 && item.tooltip.isChange, 'node-stats__tooltip_positive': parseFloat(item.tooltip.number)>0 && item.tooltip.isChange}"
            >{{item.tooltip.number}}</span>-->
            {{$t('up this week')}}
          </div>
        </div>
      </div>

      <div class="node-stats__item">
        <div class="node-stats__icon node-stats__icon_color_red fe fe-credit-card"></div>
        <div class="node-stats__data">
          <div class="node-stats__title">{{$t('totalMined')}}</div>
          <div class="node-stats__value">
            {{total | commaNumber}}
            <span class="node-stats__currency">NKN</span>
          </div>
          <div class="node-stats__tooltip">{{monthly | commaNumber}} {{$t('minedIn')}} march</div>
        </div>
      </div>

      <div class="node-stats__item">
        <div class="node-stats__icon node-stats__icon_color_orange fe fe-dollar-sign"></div>
        <div class="node-stats__data">
          <div class="node-stats__title">{{$t('totalProfit')}}</div>
          <div class="node-stats__value">
            ${{totalProfit | commaNumber}}
            <span class="node-stats__currency">USD</span>
          </div>
          <div class="node-stats__tooltip">${{monthlyProfit | commaNumber}} {{$t('profitIn')}} march</div>
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
    return {
      monthlyProfit: 0,
      totalProfit: 0
    }
  },
  computed: mapGetters({
    networkStats: 'network/getNetworkStats',
    price: 'price/getCurrentPrice'
  }),
  destroyed() {},
  mounted: function() {
    this.calcProfit()
  },
  methods: {
    calcProfit() {
      this.monthlyProfit = (this.monthly * this.price.prices[0].price).toFixed(
        0
      )

      this.totalProfit = (this.total * this.price.prices[0].price).toFixed(0)
    }
  }
}
</script>
