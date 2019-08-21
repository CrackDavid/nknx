<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{$t(pageTitle)}}</h1>
      <Grid>
        <DailyNodes />
        <DailyTransactions />
        <DailyBlocks />
        <NetworkStatus />
        <NetworkMap />
        <NetworkProviders />
        <CountryList />
        <Releases />
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NetworkStatus from '~/components/NetworkStatus/NetworkStatus.vue'
import DailyTransactions from '~/components/DailyTransactions/DailyTransactions.vue'
import DailyBlocks from '~/components/DailyBlocks/DailyBlocks.vue'
import DailyNodes from '~/components/DailyNodes/DailyNodes.vue'
import NetworkMap from '~/components/NetworkMap/NetworkMap.vue'
import Releases from '~/components/Releases/Releases.vue'
import CountryList from '~/components/CountryList/CountryList.vue'
import NetworkProviders from '~/components/NetworkProviders/NetworkProviders.vue'

export default {
  head() {
    return {
      title: this.$t('network')
    }
  },
  middleware: 'isAuth',
  components: {
    ContentWrapper,
    Grid,
    NetworkStatus,
    DailyTransactions,
    DailyBlocks,
    DailyNodes,
    NetworkMap,
    Releases,
    CountryList,
    NetworkProviders
  },
  computed: {
    ...mapGetters({
      pageTitle: 'pageTitle/getPageTitle'
    })
  },
  created() {
    this.$store.dispatch('pageTitle/updatePageTitle', 'network')
  }
}
</script>
