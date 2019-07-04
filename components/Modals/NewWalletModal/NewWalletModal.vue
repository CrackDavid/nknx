<template>
  <div class="modal-wrapper">
    <div v-on-clickaway="closeModal" class="modal-form">
      <div class="modal__header">
        <div class="modal__heading">{{$t('walletTracker')}}</div>
        <span class="modal__close fe fe-x" @click="closeModal"></span>
      </div>
      <div class="modal__title">{{$t('addWallet')}}</div>
      <div class="modal__body">
        <div
          :class="['modal-input', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
        >
          <label class="modal-input__label">{{$t('walletAddress')}}</label>
          <div class="modal-input__wrapper">
            <input
              v-model="address"
              v-validate="{ required: true, regex: /^NKN([A-Za-z0-9]){33}/ }"
              class="modal-input__control"
              type="text"
              name="nknaddress"
              required
              @focus="clearData"
            />
            <span
              :class="['modal-input__icon fe', isError === true || isInvalid === true ? 'fe-x' : isSuccess ? 'fe-check' : null]"
            ></span>
          </div>
          <div class="modal-input__alert">{{ errors.first('nknaddress') }} {{$t(alertMsg)}}</div>
        </div>
        <div class="modal-input">
          <label class="modal-input__label">{{$t('walletLabel')}}</label>
          <div class="modal-input__wrapper">
            <input v-model="label" class="modal-input__control" type="text" @focus="clearData" />
          </div>
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
          :theme="isValidated === true ? 'primary' : 'white'"
          :disabled="isValidated === true ? false : true"
          @click.native="isValidated === true ? addWallet() : false"
        >{{$t('confirm')}}</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './NewWalletModal.scss';
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
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      newWalletModalVisible: 'modals/getNewWalletModalVisible'
    }),
    isInvalid() {
      if (
        this.fields.nknaddress !== undefined &&
        this.fields.nknaddress.changed === true
      ) {
        return this.fields.nknaddress.invalid
      } else {
        return false
      }
    },
    isValidated() {
      if (this.fields.nknaddress !== undefined) {
        return this.fields.nknaddress.valid
      } else {
        return false
      }
    }
  },
  destroyed() {
    this.clearData()
  },
  created: function() {},
  mounted: function() {},
  methods: {
    clearData() {
      this.isError = false
      this.isSuccess = false
      this.alertMsg = ''
    },
    closeModal() {
      this.$store.dispatch('modals/updateNewWalletModalVisible', false)
    },
    addWallet() {
      const self = this
      const address = this.address
      const label = this.label
      this.isLoading = true
      this.$axios
        .$post('wallets', {
          label: label,
          address: address
        })
        .then(response => {
          const { duplicate, failed, saved } = response.data
          if (duplicate.length > 0) {
            self.isError = true
            self.alertMsg = 'duplicateWalletAlert'
          } else if (failed.length > 0) {
            self.isError = true
            self.alertMsg = 'failedWalletAlert'
          } else if (saved.length > 0) {
            self.alertMsg = 'successWalletAlert'
            self.isSuccess = true
            setTimeout(self.closeModal, 1000)
          }
          self.isLoading = false
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedWalletAlert'
          self.isLoading = false
        })
    }
  }
}
</script>
