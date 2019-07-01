<template>
  <div>
    <ContentWrapper>
      <Grid>
        <WalletCard
          v-for="wallet in wallets"
          :key="wallet.pivot.wallet_id"
          :wallet="wallet"
          @click.native="setActiveWallet(wallet)"
        />
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import WalletCard from '~/components/UserWallets/WalletCard/WalletCard.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    WalletCard
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
        self.wallets = response.wallets.data
      })
    },
    setActiveWallet(wallet) {
      this.$store.dispatch('activeWallet/updateActiveWallet', wallet)
      this.$router.push({ path: `/wallet-tracker/${wallet.address}` })
    }
  }
}
</script>
