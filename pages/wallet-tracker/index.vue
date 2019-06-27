<template>
  <div class="page__wallet-tracker">
    <ContentWrapper :centered="false" class="page__wallet-tracker-wrapper">
      <Grid>
        <WalletPanel/>
      </Grid>
    </ContentWrapper>
    <WalletSide :wallets="wallets"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    return { wallets: [] }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'activeWallet/getActiveWallet'
    })
  },
  mounted() {
    this.getWallets()
  },
  methods: {
    getWallets() {
      const self = this
      this.$axios.$get('wallets').then(response => {
        self.wallets = response.data
        self.setActiveWallet(response.data[0])
      })
    },
    setActiveWallet(wallet) {
      this.$store.dispatch('activeWallet/updateActiveWallet', wallet)
    }
  }
}
</script>
