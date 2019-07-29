<template>
  <Card col="12" padding="none">
    <div class="card-header">
      <div>
        <h3 class="card-header__title">
          {{$t('transactions')}}
          <span
            class="card-header__counter"
          >{{totalTransactions}} {{$t('inTotal')}}</span>
        </h3>
      </div>
      <div class="card-header__right">
        <div class="page-navigation__pagination card-header__navigation">
          <Pagination :page="prevPage" type="prev" @click.native="getTransactions(prevPage)" />
          <Pagination :page="nextPage" type="next" @click.native="getTransactions(nextPage)" />
        </div>
        <div class="card-header__viewAll">
          <span>
            <a
              :href="`https://explorer.nknx.org/addresses/${activeWallet.address}`"
              target="_blank"
              class="text_link"
            >{{$t('viewInExplorer')}}</a>
          </span>
        </div>
      </div>
    </div>
    <div class="overflow-x">
      <table class="table">
        <thead class="table__header">
          <tr class="table__row">
            <th class="table__title" style="width: 10%;">{{$t('block')}}</th>
            <th class="table__title">{{$t('hash')}}</th>
            <th class="table__title">{{$t('type')}}</th>
            <th class="table__title">{{$t('created')}}</th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="tx in transactions" :key="tx.height" class="table__row">
            <td class="table__item">
              <a
                :href="`https://explorer.nknx.org/blocks/${tx.block_height}`"
                target="_blank"
                class="text_link"
              >{{tx.block_height}}</a>
            </td>
            <td class="table__item">
              <a
                :href="`https://explorer.nknx.org/transactions/${tx.hash}`"
                target="_blank"
                class="text_link"
              >{{tx.hash}}</a>
            </td>
            <td class="table__item">
              <TransactionTypeTitle :type="tx.txType" />
            </td>
            <td class="table__item">{{$moment(tx.created_at+"Z").fromNow()}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>

<style lang="scss">
@import './WalletTransactions.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import Pagination from '~/components/Pagination/Pagination'
import TransactionTypeTitle from '~/components/TransactionTypeTitle/TransactionTypeTitle'

export default {
  components: {
    Card,
    Pagination,
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
