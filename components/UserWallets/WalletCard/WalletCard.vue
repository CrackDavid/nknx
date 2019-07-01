<template>
  <Card col="3" :hover="true">
    <div class="wallet-card">
      <div class="wallet-card__icon">
        <Wallet />
      </div>
      <div class="wallet-card__data">
        <div class="wallet-card__header">
          <div class="wallet-card__title">{{wallet.pivot.label}}</div>
          <span class="wallet-card__actions fe fe-more-horizontal"></span>
        </div>
        <div class="wallet-card__value">
          {{Number(wallet.balance).toFixed(2) | commaNumber}}
          <span class="wallet-card__symbol">NKN</span>
        </div>
        <div class="wallet-card__converter">${{balanceUSD | commaNumber}} USD</div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './WalletCard.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'
import Wallet from '~/assets/icons/Wallet.svg'

export default {
  components: { Card, Wallet },
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
    price: 'price/getCurrentPrice'
  }),
  destroyed() {},
  mounted: function() {
    this.fetchUsdBalance()
  },
  methods: {
    fetchUsdBalance() {
      const usdPrice = this.price.prices[0].price
      this.balanceUSD = (this.wallet.balance * usdPrice).toFixed(2)
    }
  }
}
</script>
