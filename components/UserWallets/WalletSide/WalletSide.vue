<template>
  <div class="wallet-side">
    <div class="wallet-side__title">{{$t('myWallets')}}</div>
    <WalletPreview v-for="wallet in wallets" :key="wallet.address" :wallet="wallet"/>
    <div class="wallet-side__footer">
      <Button type="button" theme="gradient" full="true">{{$t('addWallet')}}</Button>
    </div>
  </div>
</template>

<style lang="scss">
@import 'WalletSide.scss';
</style>

<script>
import WalletPreview from '~/components/UserWallets/WalletPreview/WalletPreview'
import Button from '~/components/Button/Button'

export default {
  components: { WalletPreview, Button },
  props: {
    wallets: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {}
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
