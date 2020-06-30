<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{ $t(pageTitle) }}</h1>
      <span class="page__alert"
        >Feel free to read the guide on
        <a
          class="page__alert-link"
          target="_blank"
          href="https://medium.com/nknx/how-to-deploy-a-nkn-node-to-your-favorite-vps-with-nknx-fastdeploy-within-seconds-e38405443828"
          >Medium</a
        ></span
      >
      <Grid :customHeight="true">
        <NewFastDeploy />
        <FastDeployConfigs
          v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'"
        />
        <MobileFastDeployConfigs v-else />
      </Grid>
      <DeployProviderChoice />
      <FastDeployEvents v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'" />
      <MobileFastDeployEvents v-else />
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NewFastDeploy from '~/components/FastDeploy/NewFastDeploy/NewFastDeploy.vue'
import FastDeployConfigs from '~/components/FastDeploy/FastDeployConfigs/FastDeployConfigs.vue'
import MobileFastDeployConfigs from '~/components/FastDeploy/MobileFastDeployConfigs/MobileFastDeployConfigs.vue'
import DeployProviderChoice from '~/components/FastDeploy/DeployProviderChoice/DeployProviderChoice.vue'
import FastDeployEvents from '~/components/FastDeploy/FastDeployEvents/FastDeployEvents.vue'
import MobileFastDeployEvents from '~/components/FastDeploy/MobileFastDeployEvents/MobileFastDeployEvents.vue'

export default {
  head() {
    return {
      title: this.$t('nknxFastDeploy')
    }
  },
  middleware: 'isAuth',
  components: {
    ContentWrapper,
    Grid,
    NewFastDeploy,
    FastDeployConfigs,
    MobileFastDeployConfigs,
    DeployProviderChoice,
    FastDeployEvents,
    MobileFastDeployEvents
  },
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      pageTitle: 'pageTitle/getPageTitle'
    })
  },
  created() {
    this.$store.dispatch('pageTitle/updatePageTitle', 'nknxFastDeploy')
  },
  methods: {}
}
</script>
