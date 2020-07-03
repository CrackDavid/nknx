<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{ $t('nknxFastDeploy') }}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{ $t('editFastDeployConfig') }}</div>
        <div class="modal__body modal__body_wrap">
          <div class="modal-input_full">
            <label class="modal-input__label">{{ $t('label') }}</label>
            <div class="modal-input__wrapper">
              <input v-model="label" class="modal-input__control" type="text" />
            </div>
          </div>

          <div class="modal-input_full">
            <label class="modal-input__label">
              {{
              $t('beneficiaryAddress')
              }}
            </label>
            <div class="modal-input__wrapper">
              <input v-model="address" class="modal-input__control" type="text" />
            </div>
          </div>

          <div class="modal-input_full">
            <label class="modal-input__label">
              {{
              $t('deploymentOptions')
              }}
            </label>
            <div class="modal-input__wrapper">
              <div class="modal-radio__group">
                <Checkbox
                  class="modal-radio__item"
                  name="downloadChain"
                  :value="downloadChain"
                  @change="changeDownloadChain"
                >{{ $t('downloadChain') }}</Checkbox>
                <Checkbox
                  class="modal-radio__item"
                  name="enableWebUI"
                  :value="enableWebUI"
                  @change="changeEnableWebUI"
                >{{ $t('enableWebUI') }}</Checkbox>
                <Checkbox
                  class="modal-radio__item"
                  name="disableUFW"
                  :value="disableUFW"
                  @change="changeDisableUFW"
                >{{ $t('disableUFW') }}</Checkbox>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__footer modal__footer_no-margin">
          <span
            :class="[
              'modal__footer-loader fe fe-loader',
              loading === true ? 'modal__footer-loader_visible' : null
            ]"
          ></span>
          <Button
            class="modal__footer-button"
            type="button"
            theme="white"
            @click.native="closeModal"
          >{{ $t('cancel') }}</Button>
          <Button
            class="modal__footer-button"
            type="button"
            :theme="isValid ? 'primary' : 'white'"
            :disabled="!isValid"
            @click.native="isValid ? saveData() : false"
          >{{ $t('edit') }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './EditFastDeployConfigModal.scss';
</style>

<script>
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'
import Button from '~/components/Button/Button.vue'
import Checkbox from '~/components/Controls/Checkbox/Checkbox.vue'

export default {
  components: { Button, Checkbox },
  mixins: [clickaway],
  data: () => {
    return {
      address: '',
      label: '',
      loading: false,
      downloadChain: true,
      enableWebUI: false,
      disable_ufw: false
    }
  },
  computed: {
    ...mapGetters({
      editFastDeployConfigModalVisible:
        'modals/getFastDeployConfigModalVisible',
      activeFastDeployConfig: 'fastDeployConfigs/getActiveFastDeployConfig'
    }),
    isValid() {
      if (this.isAddress && this.label.length && this.loading === false) {
        return true
      } else {
        return false
      }
    },
    isAddress() {
      const address = this.address
      const regexp = /^((^NKN([A-Za-z0-9]){33}){1})$/
      return regexp.test(address)
    }
  },
  destroyed() {},
  created() {},
  mounted() {
    this.label = this.activeFastDeployConfig.label
    this.address = this.activeFastDeployConfig.beneficiary_addr
    this.downloadChain = this.activeFastDeployConfig.download_chain
    this.enableWebUI = this.activeFastDeployConfig.enable_web_ui
    this.disableUFW = this.activeFastDeployConfig.disable_ufw
  },
  methods: {
    closeModal() {
      this.$store.dispatch(
        'modals/updateEditFastDeployConfigModalVisible',
        false
      )
    },
    changeDownloadChain() {
      this.downloadChain = !this.downloadChain
    },
    changeEnableWebUI() {
      this.enableWebUI = !this.enableWebUI
    },
    changeDisableUFW() {
      this.disableUFW = !this.disableUFW
    },
    saveData() {
      const { address, label, downloadChain, enableWebUI, disableUFW } = this
      const id = this.activeFastDeployConfig.id

      this.loading = true

      this.$axios
        .put(`fast-deploy/configurations/${id}`, {
          label: label,
          beneficiary_addr: address,
          download_chain: downloadChain,
          enable_web_ui: enableWebUI,
          disable_ufw: disableUFW
        })
        .then(response => {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'editFastDeployConfigSuccess',
            color: 'success',
            timeout: true
          })
          this.$store.dispatch('fastDeployConfigs/updateFastDeployConfigs', 1)
          this.clearData()
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.$store.dispatch('snackbar/updateSnack', {
            snack: error.response.data.msg,
            color: 'error',
            timeout: true
          })
        })
    }
  }
}
</script>
