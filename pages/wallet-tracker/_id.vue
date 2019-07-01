<template>
  <div class="page__wallet-tracker">
    <ContentWrapper :centered="false" class="page__wallet-tracker-wrapper">
      <Grid v-if="wallets.length > 0">
        <WalletPanel />
        <WalletBalanceHistory />
        <WalletTransactions />
      </Grid>
    </ContentWrapper>
    <WalletSide :wallets="wallets" />
  </div>
</template>

<script>
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import WalletPanel from '~/components/UserWallets/WalletPanel/WalletPanel.vue'
import WalletSide from '~/components/UserWallets/WalletSide/WalletSide.vue'
import WalletBalanceHistory from '~/components/UserWallets/WalletBalanceHistory/WalletBalanceHistory.vue'
import WalletTransactions from '~/components/UserWallets/WalletTransactions/WalletTransactions.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    WalletPanel,
    WalletSide,
    WalletBalanceHistory,
    WalletTransactions
  },
  data: () => {
    return { wallets: [] }
  },

  mounted() {
    this.getWallets()
  },
  methods: {
    getWallets() {
      const self = this
      this.$axios.$get('wallets').then(response => {
        self.wallets = response.wallets.data
      })
    }
  }
}
</script>
