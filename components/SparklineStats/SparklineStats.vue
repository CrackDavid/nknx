<template>
  <Card :col="$mq === 'xl' ? '3' : '12'" padding="none">
    <div class="sparkline-stats">
      <div class="sparkline-stats__header">
        <div class="sparkline-stats__title">{{$t(title)}}</div>
        <div
          class="sparkline-stats__change"
          :class="{'sparkline-stats__change_positive': change>0, 'sparkline-stats__change_negative': change<0}"
        >
          <span
            class="fe sparkline-stats__icon"
            :class="{'fe-arrow-up-right':change>0, 'fe-arrow-down-left':change<0}"
          />
          {{change}}%
        </div>
      </div>
      <div class="sparkline-stats__value">
        {{dailyValue | commaNumber}}
        <span
          v-if="symbol.length > 0"
          class="sparkline-stats__symbol"
        >{{symbol}}</span>
      </div>
      <div class="sparkline-stats__chart">
        <slot />
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './SparklineStats.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    change: {
      type: String,
      default: '0'
    },
    dailyValue: {
      type: String,
      default: '0'
    },
    symbol: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {}
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
