<template>
  <div class="fd-choice">
    <div class="page__wallet-tracker-heading fd-choice__heading">
      <h3 class="page__wallet-tracker-title fd-choice__title">
        {{ $t('deployTo') }}
      </h3>
      <div class="divider"></div>
    </div>
    <div class="fd-choice__wrapper">
      <Card
        v-for="provider in providers"
        :key="provider"
        class="fd-choice__card"
        :class="
          fastDeployConfig.id === 0 || isProviderDisabled(provider)
            ? 'fd-choice__card_disabled'
            : null
        "
        col="none"
        padding="medium"
        @click.native="
          fastDeployConfig.id === 0 || isProviderDisabled(provider)
            ? false
            : openFastDeployModal(provider)
        "
      >
        <img
          :src="`/vps/${provider}.svg`"
          class="fd-choice__img"
          :alt="provider"
        />
        <div class="fd-choice__descr">{{ $t(provider) }}</div>
      </Card>
    </div>
  </div>
</template>

<style lang="scss">
@import './DeployProviderChoice.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import Card from '~/components/Card/Card.vue'

export default {
  components: {
    Card
  },
  data: function() {
    return {
      providers: ['DigitalOcean', 'Vultr', 'Hetzner', 'AWS', 'Custom'],
      keys: []
    }
  },
  computed: {
    ...mapGetters({
      userProviders: 'userProviders/getUserProviders',
      userProvidersFilter: 'userProviders/getUserProvidersFilter',
      fastDeployConfig: 'fastDeployConfigs/getActiveFastDeployConfig'
    })
  },
  mounted() {
    this.getKeys()
  },
  methods: {
    toSettings() {
      this.$router.push({ path: `/account-settings` })
    },
    isProviderDisabled(provider) {
      const currentProvider = this.keys.filter(x => x.provider === provider)
      return provider === 'Custom' ? false : !currentProvider.length > 0
    },
    async getKeys() {
      this.keys = await this.$axios.$get(`vps-keys/sum`)
    },
    openFastDeployCustomModal() {
      this.$store.dispatch('modals/updateFastDeployCustomModalVisible', true)
    },
    async openFastDeployModal(provider) {
      if (provider == 'Custom') {
        this.openFastDeployCustomModal()
      } else {
        const { data } = await this.$axios.$get(`vps-keys/?filter=${provider}`)
        if (data.length < 1) {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'noApiKeyError',
            color: 'error',
            timeout: true
          })
        } else if (this.fastDeployConfig.id === 0) {
          this.$store.dispatch('snackbar/updateSnack', {
            snack: 'noFdConfigError',
            color: 'error',
            timeout: true
          })
        } else {
          this.$store.dispatch(
            'fastDeployProvider/updateFastDeployProvider',
            provider
          )
          this.$store.dispatch('modals/updateFastDeployModalVisible', true)
        }
      }
    }
  }
}
</script>
