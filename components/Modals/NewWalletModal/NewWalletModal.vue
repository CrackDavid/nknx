<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{$t('walletTracker')}}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{$t('addWallet')}}</div>
        <div class="modal-switch">
          <div
            :class="['modal-switch__button', currentView === 'single' ? 'modal-switch__button_active' : null]"
            @click="switchView('single')"
          >{{$t('single')}}</div>
          <div
            :class="['modal-switch__button', currentView === 'multiple' ? 'modal-switch__button_active' : null]"
            @click="switchView('multiple')"
          >{{$t('multiple')}}</div>
        </div>
        <template v-if="currentView === 'single'">
          <div class="modal__body">
            <div
              :class="['modal-input', isError === true || isInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
            >
              <label class="modal-input__label">{{$t('walletAddress')}}</label>
              <div class="modal-input__wrapper">
                <input
                  v-model="address"
                  v-validate="{ required: true, regex: /^((^NKN([A-Za-z0-9]){33}){1})$/ }"
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
        </template>
        <template v-else>
          <div class="modal__body modal__body_wrap">
            <div class="modal__body-title">{{$t('enterMultipleAddresses')}}</div>
            <div
              :class="['modal-input modal-input_full', isError === true || isMultipleInvalid === true ? 'modal-input_error' : isSuccess === true ? 'modal-input_success' : null]"
            >
              <label class="modal-input__label">{{$t('walletAddresses')}}</label>
              <div class="modal-input__wrapper">
                <textarea
                  v-model="address"
                  v-validate="{ required: true, regex: /(?=.*[^\.]$)NKN([A-Za-z0-9]){33}/igm }"
                  data-vv-as="nknaddresses"
                  name="nknaddresses"
                  class="modal-input__control modal-input__control_textarea"
                  type="text"
                  required
                  @focus="clearData"
                />
                <span
                  :class="['modal-input__icon fe', isError === true || isMultipleInvalid === true ? 'fe-x' : isSuccess ? 'fe-check' : null]"
                ></span>
              </div>
              <div class="modal-input__alert">{{ errors.first('nknaddresses') }} {{$t(alertMsg)}}</div>
            </div>
            <div class="modal-input">
              <label class="modal-input__label">{{$t('walletsName')}}</label>
              <div class="modal-input__wrapper">
                <input v-model="label" class="modal-input__control" type="text" @focus="clearData" />
              </div>
            </div>
            <ul class="modal-list">
              <li
                v-for="wallet in failedWallets"
                :key="wallet"
                class="modal-list__item"
              >- {{wallet}} {{$t('isNotAWallet')}}</li>
              <li
                v-for="wallet in duplicateWallets"
                :key="wallet"
                class="modal-list__item"
              >- {{wallet}} {{$t('walletIsDusplicate')}}</li>
              <li
                v-for="wallet in successWallets"
                :key="wallet"
                class="modal-list__item"
              >- {{wallet}} {{$t('successfullyAdded')}}</li>
            </ul>
          </div>
        </template>
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
            v-if="currentView === 'single'"
            class="modal__footer-button"
            type="button"
            :theme="isValidated === true ? 'primary' : 'white'"
            :disabled="isValidated === true ? false : true"
            @click.native="isValidated === true ? addWallet() : false"
          >{{$t('addWallet')}}</Button>
          <Button
            v-if="currentView === 'multiple'"
            class="modal__footer-button"
            type="button"
            :theme="isMultipleValidated === true ? 'primary' : 'white'"
            :disabled="isMultipleValidated === true ? false : true"
            @click.native="isMultipleValidated === true ? addWallet() : false"
          >{{$t('addWallets')}}</Button>
        </div>
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
      isLoading: false,
      currentView: 'single',
      failedWallets: [],
      duplicateWallets: [],
      successWallets: []
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
    },
    isMultipleInvalid() {
      if (
        this.fields.nknaddresses !== undefined &&
        this.fields.nknaddresses.changed === true
      ) {
        return this.fields.nknaddresses.invalid
      } else {
        return false
      }
    },
    isMultipleValidated() {
      if (this.fields.nknaddresses !== undefined) {
        return this.fields.nknaddresses.valid
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
      this.failedWallets = []
      this.duplicateWallets = []
      this.successWallets = []
    },
    closeModal() {
      this.$store.dispatch('modals/updateNewWalletModalVisible', false)
    },
    switchView(val) {
      this.currentView = val
      this.address = ''
      this.label = ''
      this.clearData()
    },
    addWallet() {
      const self = this
      const label = this.label
      let address = this.address
      this.isLoading = true

      if (this.currentView === 'multiple') {
        address = address.replace(/\s/g, '')
        const addressRegExp = /(?=.*[^]$)NKN([A-Za-z0-9]){33}/gim
        let addressArray = []
        addressArray = address.match(addressRegExp)
        if (addressArray.length > 10 || addressArray === null) {
          self.isError = true
          self.alertMsg = 'allowedOnly10Wallets'
          return false
        } else {
          address = addressArray.join()
        }
      }

      this.$axios
        .$post('wallets', {
          label: label,
          address: address
        })
        .then(response => {
          const { duplicate, failed, saved } = response.data
          self.successWallets = saved
          self.failedWallets = failed
          self.duplicateWallets = duplicate

          if (duplicate.length > 0) {
            self.isError = true
            self.alertMsg = 'duplicateNewWalletAlert'
          } else if (failed.length > 0) {
            self.isError = true
            self.alertMsg = 'failedNewWalletAlert'
          } else if (saved.length > 0) {
            self.alertMsg = 'successNewWalletAlert'
            self.isSuccess = true
            setTimeout(self.closeModal, 1000)
          }
          self.$store.dispatch('userWallets/updateUserWallets')
          self.isLoading = false
        })
        .catch(error => {
          self.isError = true
          self.alertMsg = 'failedNewWalletAlert'
          self.isLoading = false
        })
    }
  }
}
</script>
