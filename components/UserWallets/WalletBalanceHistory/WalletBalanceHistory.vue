<template>
  <Card>
    <div class="wallet-balance-history">
      <div class="wallet-balance-history__header">
        <h3 class="wallet-balance-history__heading">{{$t('balanceHistory')}}</h3>
        <div class="wallet-balance-history__controls">
          <Button
            v-for="item in toggleItems"
            :key="item.dataSet"
            class="wallet-balance-history__btn"
            type="button"
            :theme="item.dataSet === dataSet ? 'secondary' : 'default'"
            @click.native="toggleDataSet(item)"
          >{{item.days}} {{$t(item.text)}}</Button>
        </div>
      </div>
      <WalletBalanceHistoryChart :dataSet="dataSet" />
    </div>
  </Card>
</template>

<style lang="scss">
@import 'WalletBalanceHistory.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import WalletBalanceHistoryChart from '~/components/Charts/WalletBalanceHistoryChart.vue'

export default {
  components: {
    Card,
    Button,
    WalletBalanceHistoryChart
  },
  data: () => {
    return {
      toggleItems: [
        { text: 'day', days: 1, active: true, dataSet: 24 },
        { text: 'days', days: 2, active: false, dataSet: 48 },
        { text: 'days', days: 3, active: false, dataSet: 72 }
      ],
      dataSet: 24
    }
  },

  destroyed() {},
  mounted: function() {},
  methods: {
    toggleDataSet: function(item) {
      this.dataSet = item.dataSet
    }
  }
}
</script>
