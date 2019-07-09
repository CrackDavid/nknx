<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{$t('walletTracker')}}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{$t('deleteAllWallets')}}</div>
        <div class="modal__body modal__body_wrap">
          <div class="modal__message">{{$t('deleteAllWalletsConfirm')}}</div>
          <div
            :class="['modal-input', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
          >
            <div class="modal-input__alert">{{$t(alertMsg)}}</div>
          </div>
        </div>
        <div class="modal__footer">
          <span
            :class="['modal__footer-loader fe fe-loader',  isLoading === true ? 'modal__footer-loader_visible' : null]"
          ></span>
          <Button
            class="modal__footer-button"
            type="button"
            theme="white"
            @click.native="closeModal"
          >{{$t('cancel')}}</Button>
          <Button
            class="modal__footer-button"
            type="button"
            theme="primary"
            @click.native="deleteAllWallets"
          >{{$t('confirm')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './DeleteAllWalletsModal.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Button },
  mixins: [clickaway],
  data: () => {
    return {
      address: '',
      label: '',
      isError: false,
      isSuccess: false,
      alertMsg: '',
      isLoading: false,
      isInvalid: false
    }
  },
  computed: {
    ...mapGetters({
      deleteAllWalletsModalVisible: 'modals/getDeleteAllWalletsModalVisible'
    })
  },
  destroyed() {},
  created: function() {},
  mounted: function() {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateDeleteAllWalletsModalVisible', false)
    },
    deleteAllWallets() {
      const self = this
      this.isLoading = true
      this.$axios
        .$delete(`wallets`)
        .then(response => {
          self.alertMsg = 'successAllWalletsDeleteAlert'
          self.isSuccess = true
          self.$store.dispatch('userWallets/updateUserWallets')
          self.isLoading = false
          setTimeout(self.closeModal, 1000)
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedAllWalletsDeleteAlert'
          self.isLoading = false
        })
    }
  }
}
</script>
