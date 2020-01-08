<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{$t('receive')}} NKN</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{activeWallet.address}}</div>
        <div class="modal__body modal__body_wrap">
          <vueQr class="modal__qr" :value="activeWallet.address" :size="250"></vueQr>
          <div class="modal__message">{{$t('receiveWalletQrMessage')}}</div>
        </div>
        <div class="modal__footer">
          <Button
            class="modal__footer-button"
            type="button"
            theme="white"
            @click.native="closeModal"
          >{{$t('close')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './ReceiveWalletModal.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import vueQr from 'qrcode.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Button, vueQr },
  mixins: [clickaway],
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      receiveWalletModalVisible: 'modals/getReceiveWalletModalVisible',
      activeWallet: 'activeWallet/getActiveWallet'
    })
  },
  destroyed() {},
  created: function() {},
  mounted: function() {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateReceiveWalletModalVisible', false)
    }
  }
}
</script>
