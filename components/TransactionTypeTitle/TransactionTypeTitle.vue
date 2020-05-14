<template>
  <div>{{ $t(title) }}</div>
</template>

<style lang="scss">
@import './TransactionTypeTitle.scss';
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      title: '',
      className: ''
    }
  },
  watch: {
    type: function(newVal, oldVal) {
      this.getTxTitle()
    }
  },
  mounted() {
    this.getTxTitle()
  },
  methods: {
    getTxTitle() {
      const type = this.type
      switch (type) {
        case 'all':
          this.title = 'allTransactions'
          this.className = 'all'
          break
        case 'COINBASE_TYPE':
          this.title = 'miningReward'
          this.className = 'reward'
          break
        case 'TRANSFER_ASSET_TYPE':
          this.title = 'transfer'
          this.className = 'transfer'
          break
        case 'SIG_CHAIN_TXN_TYPE':
          this.title = 'signatureChain'
          this.className = 'sigchain'
          break
        case 'SUBSCRIBE_TYPE':
          this.title = 'subscription'
          this.className = 'subscription'
          break
        case 'REGISTER_NAME_TYPE':
          this.title = 'walletNameRegistration'
          this.className = 'wallet-name-registration'
          break
        case 'TRANSFER_NAME_TYPE':
          this.title = 'walletNameTransfer'
          this.className = 'wallet-name-transfer'
          break
        case 'DELETE_NAME_TYPE':
          this.title = 'walletNameDeletion'
          this.className = 'wallet-name-deletion'
          break
        case 'GENERATE_ID_TYPE':
          this.title = 'generateId'
          this.className = 'generate-id'
          break
        case 'PRUNING_DB_TYPE':
          this.title = 'pruningDb'
          this.className = 'pruning'
          break
        default:
          return false
      }
    }
  }
}
</script>
