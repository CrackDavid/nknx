<template>
  <Card col="12">
    <div class="wallet-overview">
      <div class="wallet-overview__header">
        <div class="wallet-overview__total">
          <div class="wallet-overview__item">
            <div class="wallet-overview__title">{{$t('totalBalance')}}</div>
            <div class="wallet-overview__value">
              {{Number(totalNknValue).toFixed(2) | commaNumber}}
              <span
                class="wallet-overview__symbol"
              >NKN</span>
            </div>
          </div>
        </div>
        <div class="wallet-overview__stats">
          <div class="wallet-overview__item">
            <div class="wallet-overview__title">{{$t('wallets')}}</div>
            <div class="wallet-overview__value">{{totalWallets | commaNumber}}</div>
          </div>
          <div class="wallet-overview__item">
            <div class="wallet-overview__title">{{$t('totalValue')}}</div>
            <div class="wallet-overview__value">${{totalUsdValue | commaNumber}}</div>
          </div>
          <div class="wallet-overview__controls">
            <Button
              class="wallet-overview__btn"
              type="button"
              :theme="currentSet === '1day' ? 'secondary' : 'default'"
              @click.native="toggleDataSet('hour', '1day')"
            >1 {{$t('day')}}</Button>
            <Button
              class="wallet-overview__btn"
              type="button"
              :theme="currentSet === '3days' ? 'secondary' : 'default'"
              @click.native="toggleDataSet('hour', '3days')"
            >3 {{$t('days')}}</Button>
            <Button
              class="wallet-overview__btn"
              type="button"
              :theme="currentSet === '1week' ? 'secondary' : 'default'"
              @click.native="toggleDataSet('day', '1week')"
            >1 {{$t('week')}}</Button>
          </div>
        </div>
      </div>
      <WalletOverviewChart :sumWalletSnapshots="sumWalletSnapshots" :dataSet="currentSet" />
    </div>
  </Card>
</template>

<style lang="scss">
@import './WalletOverview.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import WalletOverviewChart from '~/components/Charts/WalletOverviewChart'
import Button from '~/components/Button/Button.vue'

export default {
  components: {
    Card,
    WalletOverviewChart,
    Button
  },
  props: {
    sumWalletSnapshots: {
      type: Array,
      default: () => []
    },
    totalWallets: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return {
      totalUsdValue: 0,
      dailyChange: 0,
      totalNknValue: 0,
      currentSet: '1week'
    }
  },
  computed: mapGetters({
    price: 'price/getCurrentPrice',
    userWalletsConfig: 'userWallets/getUserWalletsConfig',
    userWallets: 'userWallets/getUserWallets'
  }),
  destroyed() {},
  mounted: function() {
    this.calcTotalUsdValue()
  },
  methods: {
    toggleDataSet: function(aggregate, currentSet) {
      this.currentSet = currentSet
      let newConfig = Object.assign({}, this.userWalletsConfig)
      newConfig.aggregate = aggregate
      this.$store.dispatch('userWallets/updateUserWalletsConfig', newConfig)
      this.$store.dispatch('userWallets/updateUserWallets')
    },
    calcTotalUsdValue() {
      const sumWalletSnapshots = this.sumWalletSnapshots
      const latestSnapshot = sumWalletSnapshots[0].balance
      const usdPrice = this.price.prices[0].price
      this.totalNknValue = latestSnapshot
      this.totalUsdValue = Number(latestSnapshot * usdPrice).toFixed(2)
    }
  }
}
</script>
