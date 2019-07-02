<template>
  <Card col="12">
    <div class="wallet-overview">
      <div class="wallet-overview__header">
        <div class="wallet-overview__total">
          <div class="wallet-overview__item">
            <div class="wallet-overview__title">{{$t('totalBalance')}}</div>
            <div class="wallet-overview__value">
              {{Number(sumWalletSnapshots[sumWalletSnapshots.length - 1].sum).toFixed(2) | commaNumber}}
              <span class="wallet-overview__symbol">NKN</span>
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
          <div class="wallet-overview__item">
            <div class="wallet-overview__title">{{$t('change24h')}}</div>
            <div
              :class="['wallet-overview__value', dailyChange > 0 ? 'wallet-overview__value_positive' : 'wallet-overview__value_negative']"
            >${{dailyChange | commaNumber}}</div>
          </div>
        </div>
      </div>
      <WalletOverviewChart :sumWalletSnapshots="sumWalletSnapshots" />
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

export default {
  components: {
    Card,
    WalletOverviewChart
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
      dailyChange: 0
    }
  },
  computed: mapGetters({
    price: 'price/getCurrentPrice'
  }),
  destroyed() {},
  mounted: function() {
    this.calcTotalUsdValue()
    if (this.sumWalletSnapshots.length > 24) {
      this.calcDailyChange()
    }
  },
  methods: {
    calcTotalUsdValue() {
      const sumWalletSnapshots = this.sumWalletSnapshots
      const latestSnapshot =
        sumWalletSnapshots[sumWalletSnapshots.length - 1].sum
      const usdPrice = this.price.prices[0].price
      this.totalUsdValue = Number(latestSnapshot * usdPrice).toFixed(2)
    },
    calcDailyChange() {
      const sumWalletSnapshots = this.sumWalletSnapshots
      const latestSnapshot =
        sumWalletSnapshots[sumWalletSnapshots.length - 1].sum
      const prevDaySnapshot =
        sumWalletSnapshots[sumWalletSnapshots.length - 24].sum
      const usdPrice = this.price.prices[0].price
      const change = latestSnapshot - prevDaySnapshot
      this.dailyChange = Number(change * usdPrice).toFixed(2)
    }
  }
}
</script>
