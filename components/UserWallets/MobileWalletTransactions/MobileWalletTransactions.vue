<template>
  <Card col="12" padding="none">
    <div class="card-header">
      <div>
        <h3 class="card-header__title">{{$t('transactions')}}</h3>
      </div>
    </div>
    <div class="card__stats">
      <div class="card__stats-title">{{$t('totalTransactions')}}</div>
      <div class="card__stats-value">{{totalTransactions}}</div>
    </div>
    <div class="mobile-wallet-tx">
      <div v-for="tx in transactions" :key="tx.height" class="mobile-wallet-tx__item">
        <div class="mobile-wallet-tx__title">{{$t('block')}}</div>
        <div class="mobile-wallet-tx__value text_wrap_none">
          <a
            :href="`https://explorer.nknx.org/blocks/${tx.block_height}`"
            target="_blank"
            class="text_link"
          >{{tx.block_height}}</a>
        </div>
        <div class="mobile-wallet-tx__title">{{$t('hash')}}</div>
        <div class="mobile-wallet-tx__value text_wrap_none">
          <a
            :href="`https://explorer.nknx.org/transactions/${tx.hash}`"
            target="_blank"
            class="text_link"
          >{{tx.hash}}</a>
        </div>
        <div class="mobile-wallet-tx__title">{{$t('type')}}</div>
        <div class="mobile-wallet-tx__value text_wrap_none">
          <TransactionTypeTitle :type="tx.txType" />
        </div>
        <div class="mobile-wallet-tx__title">{{$t('created')}}</div>
        <div class="mobile-wallet-tx__value">{{$moment(tx.created_at+"Z").fromNow()}}</div>
      </div>
    </div>
    <div class="card-footer" style="padding-bottom: 16px;">
      <a
        :href="`https://explorer.nknx.org/addresses/${activeWallet.address}`"
        target="_blank"
        class="text_link"
      >{{$t('viewInExplorer')}}</a>
    </div>
  </Card>
</template>

<style lang="scss">
@import './MobileWalletTransactions.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'

export default {
  components: {
    Card,
    TransactionTypeTitle
  },
  data: () => {
    return {
      nextPage: null,
      prevPage: null,
      current_page: 1,
      from: 0,
      to: 0,
      loading: false,
      transactions: [],
      totalTransactions: 0
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'activeWallet/getActiveWallet'
    })
  },
  watch: {
    activeWallet: function(newVal, oldVal) {
      this.getTransactions(1)
      this.getWallet()
    }
  },
  mounted: function() {
    this.getWallet()
    this.getTransactions(this.current_page)
  },
  methods: {
    getWallet() {
      const self = this

      this.$axios
        .$get(`addresses/${this.activeWallet.address}`)
        .then(function(response) {
          self.totalTransactions = response.count_transactions
        })
    },
    getTransactions(page) {
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
      this.$axios
        .$get(
          `addresses/${this.activeWallet.address}/transactions/?page=${page}`
        )
        .then(function(response) {
          const {
            data,
            current_page,
            prev_page_url,
            next_page_url,
            from,
            to
          } = response
          self.transactions = data
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
