<template>
  <div class="page__wallet-tracker">
    <ContentWrapper :centered="false" class="page__wallet-tracker-wrapper">
      <Grid v-if="activeWallet !== false">
        <WalletPanel />
        <WalletBalanceHistory />
        <WalletTransactions />
      </Grid>
    </ContentWrapper>
    <WalletSide :wallets="userWallets.wallets.data" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import WalletPanel from '~/components/UserWallets/WalletPanel/WalletPanel.vue'
import WalletSide from '~/components/UserWallets/WalletSide/WalletSide.vue'
import WalletBalanceHistory from '~/components/UserWallets/WalletBalanceHistory/WalletBalanceHistory.vue'
import WalletTransactions from '~/components/UserWallets/WalletTransactions/WalletTransactions.vue'

export default {
  middleware: 'isAuth',
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
  computed: {
    ...mapGetters({
      userWallets: 'userWallets/getUserWallets',
      activeWallet: 'activeWallet/getActiveWallet'
    })
  },
  mounted() {},
  methods: {}
}
</script>
