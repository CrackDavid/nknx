<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{$t('walletTracker')}}</h1>
      <Grid>
        <WalletOverview
          v-if="sumWalletSnapshots.length > 0"
          :totalWallets="totalWallets"
          :sumWalletSnapshots="sumWalletSnapshots"
        />
        <div class="page__wallet-tracker-heading">
          <h3 class="page__wallet-tracker-title">{{$t('myWallets')}} ({{totalWallets}})</h3>
          <div v-if="wallets.length > 0" class="page-navigation page__wallet-tracker-navigation">
            <div class="page-navigation__pagination">
              <Pagination :page="prevPage" type="prev" @click.native="getWallets(prevPage)" />
              <Pagination :page="nextPage" type="next" @click.native="getWallets(nextPage)" />
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <NewWalletCard @click.native="openNewWalletModal()" />
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
import NewWalletCard from '~/components/UserWallets/NewWalletCard/NewWalletCard.vue'
import Pagination from '~/components/Pagination/Pagination'
import WalletOverview from '~/components/UserWallets/WalletOverview/WalletOverview'

export default {
  components: {
    ContentWrapper,
    Grid,
    WalletCard,
    NewWalletCard,
    Pagination,
    WalletOverview
  },
  data: () => {
    return {
      wallets: [],
      totalWallets: 0,
      nextPage: null,
      prevPage: null,
      current_page: 1,
      from: 0,
      to: 0,
      sumWalletSnapshots: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'activeWallet/getActiveWallet',
      userWallets: 'userWallets/getUserWallets'
    })
  },
  watch: {
    userWallets: function(newWallets, oldWallets) {
      this.fetchWalletsData()
    }
  },
  mounted() {
    this.fetchWalletsData()
  },
  methods: {
    getWallets(page) {
      // Checking if page exists
      if (page === null) {
        return false
      }
      this.loading = true
      // Disabling pagination untill data fetched
      this.nextPage = null
      this.prevPage = null

      // Fetcing data
      this.$store.dispatch('userWallets/updateUserWallets', page)
    },
    fetchWalletsData() {
      const {
        data,
        current_page,
        prev_page_url,
        next_page_url,
        from,
        to,
        total
      } = this.userWallets.wallets
      this.sumWalletSnapshots = this.userWallets.sumWalletSnapshots
      this.wallets = data
      this.totalWallets = total
      this.from = from
      this.to = to
      this.currentPage = current_page
      this.prevPage = prev_page_url != null ? this.currentPage - 1 : null
      this.nextPage = next_page_url != null ? this.currentPage + 1 : null
      this.loading = false
    },
    setActiveWallet(wallet) {
      this.$store.dispatch('activeWallet/updateActiveWallet', wallet)
      this.$router.push({ path: `/wallet-tracker/${wallet.address}` })
    },
    openNewWalletModal() {
      this.$store.dispatch('modals/updateNewWalletModalVisible', true)
    }
  }
}
</script>
