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
        col="none"
        padding="medium"
        @click.native="openFastDeployModal(provider)"
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
      providers: ['DigitalOcean', 'Linode', 'AWS', 'Vultr', 'Custom']
    }
  },
  computed: {
    ...mapGetters({
      userProviders: 'userProviders/getUserProviders'
    })
  },
  mounted() {},
  methods: {
    toSettings() {
      this.$router.push({ path: `/account-settings` })
    },
    openFastDeployModal(provider) {
      this.$store.dispatch(
        'fastDeployProvider/updateFastDeployProvider',
        provider
      )
      this.$store.dispatch('modals/updateFastDeployModalVisible', true)
    }
  }
}
</script>
