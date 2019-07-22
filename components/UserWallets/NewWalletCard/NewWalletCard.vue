<template>
  <div class="new-wallet-card">
    <button class="new-wallet-card__btn">
      <Plus class="new-wallet-card__icon" />
    </button>
    <div class="new-wallet-card__title">{{$t('addNewWallet')}}</div>
  </div>
</template>

<style lang="scss">
@import './NewWalletCard.scss';
</style>

<script>
import Plus from '~/assets/icons/plus.svg'

export default {
  components: { Plus },
  data: () => {
    return {}
  },

  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
