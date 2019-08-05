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
              <Pagination :page="prevPage" type="prev" @click.native="changePage(prevPage)" />
              <Pagination :page="nextPage" type="next" @click.native="changePage(nextPage)" />
            </div>
          </div>
          <div class="divider"></div>
          <Button
            v-if="wallets.length > 0"
            theme="danger"
            @click.native="openDeleteAllWalletsModal"
          >
            <span class="button__icon fe fe-trash-2"></span>
            {{$t('deleteAllWallets')}}
          </Button>
        </div>
        <NewWalletCard @click.native="openNewWalletModal()" />
        <template v-if="!loading">
          <WalletCard v-for="wallet in wallets" :key="wallet.pivot.wallet_id" :wallet="wallet" />
        </template>
        <template v-else>
          <WalletCardLoader v-for="(walletLoader, index) in walletLoaders" :key="index" />
        </template>
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
import Button from '~/components/Button/Button.vue'
import WalletCardLoader from '~/components/Loaders/WalletCardLoader/WalletCardLoader.vue'

export default {
  head() {
    return {
      title: this.$t('walletTracker')
    }
  },
  middleware: 'isAuth',
  components: {
    ContentWrapper,
    Grid,
    WalletCard,
    NewWalletCard,
    Pagination,
    WalletOverview,
    Button,
    WalletCardLoader
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
      loading: false,
      walletLoaders: 7
    }
  },
  computed: {
    ...mapGetters({
      userWallets: 'userWallets/getUserWallets',
      userWalletsConfig: 'userWallets/getUserWalletsConfig'
    })
  },
  watch: {
    userWallets: function(newWallets, oldWallets) {
      this.fetchWalletsData()
    }
  },
  created() {
    const config = {
      page: 1,
      aggregate: 'day'
    }
    this.$store.dispatch('userWallets/updateUserWalletsConfig', config)
    this.$store.dispatch('userWallets/updateUserWallets')
  },
  mounted() {
    this.fetchWalletsData()
  },
  methods: {
    changePage(page) {
      let newConfig = Object.assign({}, this.userWalletsConfig)
      newConfig.page = page
      this.loading = true
      this.nextPage = null
      this.prevPage = null
      this.$store.dispatch('userWallets/updateUserWalletsConfig', newConfig)
      this.$store.dispatch('userWallets/updateUserWallets')
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
    openNewWalletModal() {
      this.$store.dispatch('modals/updateNewWalletModalVisible', true)
    },
    openDeleteAllWalletsModal() {
      this.$store.dispatch('modals/updateDeleteAllWalletsModalVisible', true)
    }
  }
}
</script>
