<template>
  <Card
    :col="
      $mq === 'xl' ? '4' : $mq === 'llg' ? '12' : $mq === 'lg' ? '12' : '12'
    "
  >
    <div class="card-header card-header_border">
      <h3 class="card-header__title">
        {{ $t('newVpsKey') }}
      </h3>
    </div>
    <div class="modal__body modal__body_wrap">
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('provider')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <Select
            :items="providers"
            :active-item="provider"
            @update="updateProvider"
          />
        </div>
      </div>
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('profileName')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input v-model="name" class="modal-input__control" type="text" />
        </div>
      </div>
      <div class="modal-input modal-input_flex modal-input_full">
        <label class="modal-input__label modal-input__label_flex">{{
          $t('apiToken')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input
            v-model="apiToken"
            class="modal-input__control"
            :type="!apiTokenVisible ? 'password' : 'text'"
          />
          <span
            :class="[
              'modal-input__action',
              apiTokenVisible ? 'fe fe-eye-off' : 'fe fe-eye'
            ]"
            @click="toggleApiTokenVisible"
          />
        </div>
      </div>
      <div
        v-if="provider === 'AWS'"
        class="modal-input modal-input_flex modal-input_full"
      >
        <label class="modal-input__label modal-input__label_flex">{{
          $t('apiSecret')
        }}</label>
        <div class="modal-input__wrapper_flex">
          <input
            v-model="apiSecret"
            class="modal-input__control"
            :type="!apiSecretVisible ? 'password' : 'text'"
          />
          <span
            :class="[
              'modal-input__action',
              apiSecretVisible ? 'fe fe-eye-off' : 'fe fe-eye'
            ]"
            @click="toggleApiSecretVisible"
          />
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
        :theme="!isDisabled ? 'primary' : 'white'"
        :disabled="isDisabled"
        @click.native="!isDisabled ? saveData() : false"
        >{{ $t('add') }}</Button
      >
    </div>
  </Card>
</template>

<style lang="scss">
@import './NewVps.scss';
</style>

<script>
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import Select from '~/components/Controls/Select/Select.vue'

export default {
  components: {
    Card,
    Button,
    Select
  },
  data: () => {
    return {
      providers: ['DigitalOcean', 'Vultr', 'Hetzner'],
      apiToken: '',
      name: 'Personal',
      apiSecret: '',
      provider: 'DigitalOcean',
      loading: false,
      apiTokenVisible: false,
      apiSecretVisible: false
    }
  },
  computed: {
    isName() {
      if (this.name.length > 0) {
        return true
      } else {
        return false
      }
    },
    isApiToken() {
      if (this.apiToken.length > 0) {
        return true
      } else {
        return false
      }
    },
    isApiSecret() {
      if (this.apiSecret.length > 0 || this.provider !== 'AWS') {
        return true
      } else {
        return false
      }
    },
    isDisabled() {
      if (
        this.isName === false ||
        this.isApiToken === false ||
        this.isApiSecret === false ||
        this.loading === true
      ) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.clearData()
  },
  methods: {
    clearData() {
      this.provider = 'DigitalOcean'
      this.apiSecret = ''
      this.apiToken = ''
      this.name = 'Personal'
    },
    updateProvider(provider) {
      this.provider = provider
    },
    toggleApiTokenVisible() {
      this.apiTokenVisible = !this.apiTokenVisible
    },
    toggleApiSecretVisible() {
      this.apiSecretVisible = !this.apiSecretVisible
    },
    saveData() {
      const apiToken = this.apiToken
      const name = this.name
      const apiSecret = this.apiSecret
      const provider = this.provider

      const payload = {
        provider: provider,
        profile_name: name,
        api_token: apiToken
      }

      if (provider === 'AWS') {
        payload.api_secret = apiSecret
      }

      this.loading = true
      this.$axios
        .post('vps-keys', payload)
        .then(response => {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'vpsKeyAddSuccess',
            color: 'success',
            timeout: true
          })
          this.loading = false
          this.$store.dispatch('userProviders/updateUserProviders', 1)
          this.clearData()
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
