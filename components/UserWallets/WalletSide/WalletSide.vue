<template>
  <div class="wallet-side">
    <div class="wallet-side__title">{{$t('myWallets')}}</div>
  </div>
</template>

<style lang="scss">
@import 'WalletSide.scss';
</style>

<script>
export default {
  components: {},
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      balanceUSD: 0,
      wallets: [
        {
          address: 'NhWjY9iwD5Ad8DafiEWbTo4buLpBomdttH',
          label: 'My Primary Wallet',
          balanceNKN: 84650,
          color1: '#61E786',
          color2: '#2CCB96'
        },
        {
          address: 'NiNvBp3cNYvpfGdR2kAUhbQd8RqN4yHEEE',
          label: 'My Secondary Wallet',
          balanceNKN: 35000,
          color1: '#DD5E89',
          color2: '#F7BB97'
        }
      ]
    }
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
