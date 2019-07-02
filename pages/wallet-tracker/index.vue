<template>
  <div>
    <ContentWrapper>
      <Grid>
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
        <NewWalletCard />
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

export default {
  components: {
    ContentWrapper,
    Grid,
    WalletCard,
    NewWalletCard,
    Pagination
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
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'activeWallet/getActiveWallet'
    })
  },
  mounted() {
    this.getWallets(this.current_page)
  },
  methods: {
    getWallets(page) {
      const self = this
      // Checking if page exists
      if (page === null) {
        return false
      }
      self.loading = true
      // Disabling pagination untill data fetched
      self.nextPage = null
      self.prevPage = null
      // Fetcing data
      this.$axios.$get(`wallets?page=${page}`).then(function(response) {
        const {
          data,
          current_page,
          prev_page_url,
          next_page_url,
          from,
          to,
          total
        } = response.wallets
        self.wallets = data
        self.totalWallets = total
        self.from = from
        self.to = to
        self.currentPage = current_page
        self.prevPage = prev_page_url != null ? self.currentPage - 1 : null
        self.nextPage = next_page_url != null ? self.currentPage + 1 : null
        self.loading = false
      })
    },
    setActiveWallet(wallet) {
      this.$store.dispatch('activeWallet/updateActiveWallet', wallet)
      this.$router.push({ path: `/wallet-tracker/${wallet.address}` })
    }
  }
}
</script>
