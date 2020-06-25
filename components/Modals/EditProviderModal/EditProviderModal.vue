<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div v-on-clickaway="closeModal" class="modal-form">
        <div class="modal__header">
          <div class="modal__heading">{{ $t('accountSettings') }}</div>
          <span class="modal__close fe fe-x" @click="closeModal"></span>
        </div>
        <div class="modal__title">{{ $t('editProvider') }}</div>
        <div class="modal__body modal__body_wrap">
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
            theme="white"
            @click.native="closeModal"
            >{{ $t('cancel') }}</Button
          >
          <Button
            class="modal__footer-button"
            type="button"
            :theme="!isDisabled ? 'primary' : 'white'"
            :disabled="isDisabled"
            @click.native="!isDisabled ? saveData() : false"
            >{{ $t('edit') }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './EditProviderModal.scss';
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
    ...mapGetters({
      editProviderModalVisible: 'modals/getEditProviderModalVisible',
      activeProvider: 'activeProvider/getActiveProvider'
    }),
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
      if (
        this.apiSecret === null ||
        this.provider !== 'AWS' ||
        this.apiSecret.length > 0
      ) {
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
  destroyed() {},
  created() {},
  mounted() {
    this.name = this.activeProvider.profile_name
    this.apiSecret = this.activeProvider.api_secret
    this.apiToken = this.activeProvider.api_token
    this.provider = this.activeProvider.provider
  },
  methods: {
    closeModal() {
      this.$store.dispatch('modals/updateEditProviderModalVisible', false)
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
      const id = this.activeProvider.id

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
        .put(`vps-keys/${id}`, payload)
        .then(response => {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'vpsKeyEditSuccess',
            color: 'success',
            timeout: true
          })
          this.loading = false
          this.$store.dispatch('userProviders/updateUserProviders', 1)
          this.closeModal()
        })
        .catch(error => {
          this.loading = false
          this.$store.dispatch('snackbar/updateSnack', {
            snack: error.response.data.msg,
            color: 'error',
            timeout: true
          })
          this.closeModal()
        })
    }
  }
}
</script>
