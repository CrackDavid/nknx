<template>
  <div class="wallet-side">
    <div class="wallet-side__top">
      <div class="wallet-side__header">
        <div class="wallet-side__title">{{$t('myWallets')}}</div>
        <div class="wallet-side__new fe fe-plus" @click="openNewWalletModal"></div>
      </div>
      <WalletPreview v-for="wallet in wallets" :key="wallet.address" :wallet="wallet" />
    </div>
    <div class="wallet-side__footer">
      <div v-if="wallets.length > 0" class="page-navigation">
        <div class="page-navigation__pagination">
          <Pagination :page="prevPage" type="prev" @click.native="changePage(prevPage)" />
          <Pagination :page="nextPage" type="next" @click.native="changePage(nextPage)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'WalletSide.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import WalletPreview from '~/components/UserWallets/WalletPreview/WalletPreview'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: { WalletPreview, Pagination },
  data: () => {
    return {
      nextPage: null,
      prevPage: null,
      current_page: 1,
      from: 0,
      to: 0,
      loading: false,
      wallets: []
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
  destroyed() {},
  created() {
    const config = {
      page: 1,
      aggregate: 'day'
    }
    this.$store.dispatch('userWallets/updateUserWalletsConfig', config)
    this.$store.dispatch('userWallets/updateUserWallets')
  },
  mounted: function() {
    this.fetchWalletsData()
  },
  methods: {
    changePage(page) {
      let newConfig = Object.assign({}, this.userWalletsConfig)
      newConfig.page = page
      this.$store.dispatch('userWallets/updateUserWalletsConfig', newConfig)
      this.$store.dispatch('userWallets/updateUserWallets')
    },
    openNewWalletModal() {
      this.$store.dispatch('modals/updateNewWalletModalVisible', true)
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
    }
  }
}
</script>
