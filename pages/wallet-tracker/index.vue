<template>
  <div class="page__wallet-tracker">
    <ContentWrapper :centered="false" class="page__wallet-tracker-wrapper">
      <Grid>
        <WalletPanel :wallet="activeWallet"/>
      </Grid>
    </ContentWrapper>
    <WalletSide/>
  </div>
</template>

<script>
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import WalletPanel from '~/components/UserWallets/WalletPanel/WalletPanel.vue'
import WalletSide from '~/components/UserWallets/WalletSide/WalletSide.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    WalletPanel,
    WalletSide
  },
  data: () => {
    return { wallets: [], activeWallet: {} }
  },
  mounted() {
    this.getWallets()
  },
  methods: {
    getWallets() {
      const self = this
      this.$axios.$get('wallets').then(response => {
        self.wallets = response
        self.activeWallet = response[0]
        console.log(response)
      })
    }
  }
}
</script>
