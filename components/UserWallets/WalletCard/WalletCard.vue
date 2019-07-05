<template>
  <Card col="3" :hover="true" @click.native="setActiveWallet(wallet)">
    <div class="wallet-card">
      <div class="wallet-card__icon">
        <Wallet />
      </div>
      <div class="wallet-card__data">
        <div class="wallet-card__header">
          <div class="wallet-card__title">{{wallet.pivot.label}}</div>
          <span class="wallet-card__actions fe fe-more-horizontal" @mouseenter="isActions = true"></span>
          <div
            :class="['wallet-card__actions-modal', isActions === true ? 'wallet-card__actions-modal_visible' : null]"
            @mouseleave="isActions = false"
            @click="openDeleteWalletModal(wallet)"
          >
            <div class="wallet-card__actions-item">
              <span class="wallet-card__actions-icon fe fe-trash-2"></span>
              <span class="wallet-card__actions-title">{{$t('delete')}}</span>
            </div>
          </div>
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
      balanceUSD: 0,
      isActions: false
    }
  },
  computed: mapGetters({
    activeWallet: 'activeWallet/getActiveWallet',
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
    },
    openDeleteWalletModal(wallet) {
      this.$store.dispatch('activeWallet/updateActiveWallet', wallet)
      this.$store.dispatch('modals/updateDeleteWalletModalVisible', true)
    },
    setActiveWallet(wallet) {
      if (this.isActions === false) {
        this.$store.dispatch('activeWallet/updateActiveWallet', wallet)
        this.$router.push({ path: `/wallet-tracker/${wallet.address}` })
      } else {
        return false
      }
    }
  }
}
</script>
