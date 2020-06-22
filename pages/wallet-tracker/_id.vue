<template>
  <div class="page__wallet-tracker">
    <ContentWrapper :centered="false" class="page__wallet-tracker-wrapper">
      <div v-if="$mq === 'md' || $mq === 'sm' || $mq === 'xs'">
        <nuxt-link to="/wallet-tracker" class="mobile-back">
          <Arrow class="mobile-back__icon" />
          {{$t('backToOverview')}}
        </nuxt-link>
      </div>
      <Grid v-if="activeWallet !== false">
        <WalletPanel />
        <WalletBalanceHistory />
        <WalletTransactions v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'" />
        <MobileWalletTransactions v-else />
      </Grid>
    </ContentWrapper>
    <WalletSide
      v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'"
      :wallets="userWallets.wallets.data"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Arrow from '@/assets/icons/arrow.svg'
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import WalletPanel from '~/components/UserWallets/WalletPanel/WalletPanel.vue'
import WalletSide from '~/components/UserWallets/WalletSide/WalletSide.vue'
import WalletBalanceHistory from '~/components/UserWallets/WalletBalanceHistory/WalletBalanceHistory.vue'
import WalletTransactions from '~/components/UserWallets/WalletTransactions/WalletTransactions.vue'
import MobileWalletTransactions from '~/components/UserWallets/MobileWalletTransactions/MobileWalletTransactions.vue'

export default {
  head() {
    return {
      title: this.$t('myWallet')
    }
  },
  middleware: 'isAuth',
  components: {
    ContentWrapper,
    Grid,
    WalletPanel,
    WalletSide,
    WalletBalanceHistory,
    WalletTransactions,
    MobileWalletTransactions,
    Arrow
  },
  data: () => {
    return { wallets: [] }
  },
  computed: {
    ...mapGetters({
      userWallets: 'userWallets/getUserWallets',
      activeWallet: 'activeWallet/getActiveWallet',
      pageTitle: 'pageTitle/getPageTitle'
    })
  },
  created() {
    this.$store.dispatch('pageTitle/updatePageTitle', 'walletDetails')
  },
  mounted() {},
  methods: {}
}
</script>
