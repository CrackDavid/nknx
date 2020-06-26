<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{ $t(pageTitle) }}</h1>
      <Grid class="page__account-settings" :customHeight="true">
        <NewFastDeploy />
        <FastDeployConfigs
          v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'"
        />
        <MobileFastDeployConfigs v-else />
      </Grid>
      <DeployProviderChoice />
      <FastDeployEvents />
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
    FastDeployEvents
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
