<template>
  <Card>
    <div class="wallet-balance-history">
      <div class="wallet-balance-history__header">
        <h3 class="wallet-balance-history__heading">{{$t('balanceHistory')}}</h3>
        <div class="wallet-balance-history__controls">
          <Button
            class="wallet-balance-history__btn"
            type="button"
            :theme="currentSet === '1day' ? 'secondary' : 'default'"
            @click.native="toggleDataSet('hour', '1day')"
          >1 {{$t('day')}}</Button>
          <Button
            class="wallet-balance-history__btn"
            type="button"
            :theme="currentSet === '3days' ? 'secondary' : 'default'"
            @click.native="toggleDataSet('hour', '3days')"
          >3 {{$t('days')}}</Button>
          <Button
            class="wallet-balance-history__btn"
            type="button"
            :theme="currentSet === '1week' ? 'secondary' : 'default'"
            @click.native="toggleDataSet('day', '1week')"
          >1 {{$t('week')}}</Button>
        </div>
      </div>
      <WalletBalanceHistoryChart :dataSet="currentSet" />
    </div>
  </Card>
</template>

<style lang="scss">
@import 'WalletBalanceHistory.scss';
</style>

<script>
import { mapGetters } from 'vuex'

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
      currentSet: '1week'
    }
  },
  computed: {
    ...mapGetters({
      userWalletsConfig: 'userWallets/getUserWalletsConfig',
      userWallets: 'userWallets/getUserWallets',
      activeWallet: 'activeWallet/getActiveWallet'
    })
  },
  watch: {
    userWallets: function(newWallets, oldWallets) {
      const currentActiveWalletId = this.activeWallet.id
      let newActiveWallet = newWallets.wallets.data.filter(wallet => {
        return wallet.id === currentActiveWalletId
      })
      if (newActiveWallet.length > 0) {
        newActiveWallet = newActiveWallet[0]
        this.$store.dispatch('activeWallet/updateActiveWallet', newActiveWallet)
      } else {
        return false
      }
    }
  },
  destroyed() {},
  mounted: function() {},
  methods: {
    toggleDataSet: function(aggregate, currentSet) {
      this.currentSet = currentSet
      let newConfig = Object.assign({}, this.userWalletsConfig)
      newConfig.aggregate = aggregate
      this.$store.dispatch('userWallets/updateUserWalletsConfig', newConfig)
      this.$store.dispatch('userWallets/updateUserWallets')
    }
  }
}
</script>
