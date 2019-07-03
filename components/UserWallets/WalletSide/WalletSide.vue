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
          <Pagination :page="prevPage" type="prev" @click.native="getWallets(prevPage)" />
          <Pagination :page="nextPage" type="next" @click.native="getWallets(nextPage)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'WalletSide.scss';
</style>

<script>
import WalletPreview from '~/components/UserWallets/WalletPreview/WalletPreview'
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: { WalletPreview, Pagination },
  props: {
    wallets: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      nextPage: null,
      prevPage: null,
      current_page: 1,
      from: 0,
      to: 0,
      loading: false
    }
  },
  destroyed() {},
  mounted: function() {
    this.getWallets(this.current_page)
  },
  methods: {
    openNewWalletModal() {
      this.$store.dispatch('modals/updateNewWalletModalVisible', true)
    },
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
          to
        } = response.wallets
        self.wallets = data
        self.from = from
        self.to = to
        self.currentPage = current_page
        self.prevPage = prev_page_url != null ? self.currentPage - 1 : null
        self.nextPage = next_page_url != null ? self.currentPage + 1 : null
        self.loading = false
      })
    }
  }
}
</script>
