<template>
  <Card
    :col="$mq === 'xl' ? '4' : $mq === 'llg' ? '6' : $mq === 'lg' ? '6' : '12'"
  >
    <div class="card-header card-header_border">
      <h3 class="card-header__title">{{ $t('newConfiguration') }}</h3>
    </div>
    <div class="modal__body modal__body_wrap">
      <div class="modal-input_full">
        <label class="modal-input__label">{{ $t('label') }}</label>
        <div class="modal-input__wrapper">
          <input v-model="label" class="modal-input__control" type="text" />
        </div>
      </div>

      <div class="modal-input_full">
        <label class="modal-input__label">{{ $t('beneficiaryAddress') }}</label>
        <div class="modal-input__wrapper">
          <input v-model="address" class="modal-input__control" type="text" />
        </div>
      </div>

      <div class="modal-input_full">
        <label class="modal-input__label">{{ $t('deploymentOptions') }}</label>
        <div class="modal-input__wrapper">
          <div class="modal-radio__group">
            <Checkbox
              class="modal-radio__item"
              name="disableUFW"
              :value="disableUFW"
              @change="changeDisableUFW"
              >{{ $t('disableUFW') }}</Checkbox
            >
          </div>
        </div>
        <div class="modal-input__wrapper">
          <div class="modal-radio__group">
            <Checkbox
              class="modal-radio__item"
              name="downloadChain"
              :value="downloadChain"
              @change="changeDownloadChain"
              >{{ $t('downloadChain') }}</Checkbox
            >
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
        :theme="isValid ? 'primary' : 'white'"
        :disabled="!isValid"
        @click.native="isValid ? saveData() : false"
        >{{ $t('add') }}</Button
      >
    </div>
  </Card>
</template>

<style lang="scss">
@import './NewFastDeploy.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import Checkbox from '~/components/Controls/Checkbox/Checkbox.vue'

export default {
  components: {
    Card,
    Button,
    Checkbox
  },
  data: function() {
    return {
      address: '',
      label: 'Default',
      loading: false,
      downloadChain: true,
      enableWebUI: false,
      disableUFW: false
    }
  },
  computed: {
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
  mounted() {
    this.clearData()
  },
  methods: {
    clearData() {
      this.label = 'Default'
      this.address = ''
      this.downloadChain = true
      this.enableWebUI = false
      this.disableUFW = false
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
      this.loading = true

      this.$axios
        .post('fast-deploy/configurations', {
          label: label,
          beneficiary_addr: address,
          download_chain: downloadChain,
          enable_web_ui: enableWebUI,
          disable_ufw: disableUFW
        })
        .then(response => {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'newFastDeployConfigSuccess',
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
