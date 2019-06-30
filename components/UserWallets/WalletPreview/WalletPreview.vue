<template>
  <div
    class="wallet-preview"
    :class="{'wallet-preview_active': activeWallet.address === wallet.address }"
    @click="toggleActiveWallet(wallet)"
  >
    <div class="wallet-preview__data">
      <div class="wallet-preview__label">
        <span v-if="wallet.pivot !== undefined">{{wallet.pivot.label}}</span>
      </div>
      <div class="wallet-preview__value">
        {{Number(wallet.balance).toFixed(2) | commaNumber}}
        <span
          class="wallet-preview__currency"
        >NKN</span>
      </div>
      <div class="wallet-preview__converter">${{balanceUSD| commaNumber}} USD</div>
    </div>
    <div class="wallet-preview__chart">
      <WalletPreviewChart
        v-if="wallet.wallet_snapshots.length > 1"
        :address="wallet.address"
        :snapshots="wallet.wallet_snapshots"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import './WalletPreview.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import WalletPreviewChart from '~/components/Charts/WalletPreviewChart.vue'

export default {
  components: { WalletPreviewChart },
  props: {
    wallet: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      balanceUSD: 0
    }
  },
  computed: mapGetters({
    price: 'price/getCurrentPrice',
    activeWallet: 'activeWallet/getActiveWallet'
  }),
  destroyed() {},
  mounted: function() {
    this.fetchUsdBalance()
  },
  methods: {
    fetchUsdBalance() {
      const usdPrice = this.price.prices[0].price
      this.balanceUSD = (this.wallet.balance * usdPrice).toFixed(2)
    },
    toggleActiveWallet(wallet) {
      this.$store.dispatch('activeWallet/updateActiveWallet', wallet)
    }
  }
}
</script>
