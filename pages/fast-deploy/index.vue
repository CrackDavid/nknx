<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{ $t(pageTitle) }}</h1>
      <Grid class="page__account-settings" :customHeight="true">
        <NewFastDeploy />
        <FastDeployConfigs />
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NewFastDeploy from '~/components/FastDeploy/NewFastDeploy/NewFastDeploy.vue'
import FastDeployConfigs from '~/components/FastDeploy/FastDeployConfigs/FastDeployConfigs.vue'

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
    FastDeployConfigs
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
