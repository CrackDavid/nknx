<template>
  <Card col="12" padding="none">
    <div class="wallet-panel">
      <div class="wallet-panel__left">
        <div class="wallet-panel__label">
          <span v-if="activeWallet">{{activeWallet.pivot.label}}</span>
          <span v-else>{{$t('loading')}}</span>
        </div>
        <div class="wallet-panel__value">
          <span v-if="activeWallet">{{activeWallet.balance | commaNumber}}</span>
          <span v-else>{{$t('loading')}}</span>
          <span class="wallet-panel__currency">NKN</span>
        </div>
        <div v-clipboard:copy="activeWallet.address" class="wallet-panel__address">
          <span v-if="activeWallet">{{activeWallet.address}}</span>
          <span v-else>{{$t('loading')}}</span>
          <i class="fas fa-copy"></i>
        </div>
      </div>
      <div class="wallet-panel__right">
        <div class="wallet-panel__button" @click="openReceiveWalletModal">
          <i class="fas fa-qrcode wallet-panel__icon"></i>
          {{$t('receive')}}
        </div>
        <!-- <div class="wallet-panel__button">
          <i class="fab fa-telegram-plane wallet-panel__icon"></i>
          {{$t('send')}}
        </div>-->
        <div class="wallet-panel__button wallet-panel__button_more">
          <span class="fe fe-more-vertical wallet-panel__icon wallet-panel__icon_more" />
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './WalletPanel.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  props: {},
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      activeWallet: 'activeWallet/getActiveWallet'
    })
  },
  destroyed() {},
  mounted: function() {},
  methods: {
    openReceiveWalletModal() {
      this.$store.dispatch('modals/updateReceiveWalletModalVisible', true)
    }
  }
}
</script>
