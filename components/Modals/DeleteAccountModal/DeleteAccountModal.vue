<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{ $t('accountSettings') }}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{ $t('deleteAccount') }}</div>
        <div class="modal__body modal__body_wrap">
          <div class="modal__message text_color_danger">
            {{ $t('deleteAccountConfirm') }}
          </div>
          <div
            :class="[
              'modal-input',
              isError === true
                ? 'modal-input_error'
                : isSuccess === true
                ? 'modal-input_success'
                : null
            ]"
          >
            <div class="modal-input__alert">{{ $t(alertMsg) }}</div>
          </div>
        </div>
        <div class="modal__footer">
          <span
            :class="[
              'modal__footer-loader fe fe-loader',
              isLoading === true ? 'modal__footer-loader_visible' : null
            ]"
          ></span>
          <Button
            class="modal__footer-button"
            type="button"
            theme="white"
            @click.native="closeModal"
            >{{ $t('cancel') }}</Button
          >
          <Button
            class="modal__footer-button"
            type="button"
            theme="primary"
            @click.native="deleteAccount"
            >{{ $t('confirm') }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './DeleteAccountModal.scss';
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
      isError: false,
      isSuccess: false,
      alertMsg: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      deleteAccountModalVisible: 'modals/getDeleteAccountModalVisible'
    })
  },
  destroyed() {},
  created: function() {},
  mounted: function() {},
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateDeleteAccountModalVisible', false)
    },
    deleteAccount() {
      const self = this
      this.isLoading = true
      this.$axios
        .$delete(`user/$`)
        .then(response => {
          self.alertMsg = 'successAccountDeleteAlert'
          self.isSuccess = true
          self.isLoading = false
          setTimeout(self.closeModal, 1000)
          this.$auth.logout().then(function() {
            window.location.href = 'https://auth.nknx.org/logout'
          })
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedAccountDeleteAlert'
          self.isLoading = false
        })
    }
  }
}
</script>
