<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{$t(pageTitle)}}</h1>
      <Grid>
        <GeneralMiningStats />
        <GeneralNetworkStats />
        <DailyBalance />
        <MediumNews />
        <DailyMined />
        <MarketStats />
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Grid from '~/components/Grid/Grid.vue'
import GeneralNetworkStats from '~/components/GeneralStats/GeneralNetworkStats.vue'
import GeneralMiningStats from '~/components/GeneralStats/GeneralMiningStats.vue'
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import MarketStats from '~/components/MarketStats/MarketStats.vue'
import MediumNews from '~/components/MediumNews/MediumNews.vue'
import DailyBalance from '~/components/DailyBalance/DailyBalance.vue'
import DailyMined from '~/components/DailyMined/DailyMined.vue'

export default {
  head() {
    return {
      title: this.$t('dashboard')
    }
  },
  middleware: 'isAuth',
  components: {
    Grid,
    GeneralNetworkStats,
    GeneralMiningStats,
    ContentWrapper,
    MarketStats,
    MediumNews,
    DailyBalance,
    DailyMined
  },
  computed: {
    ...mapGetters({
      pageTitle: 'pageTitle/getPageTitle'
    })
  },
  created() {
    const config = {
      page: 1,
      aggregate: 'day'
    }
    this.$store.dispatch('userWallets/updateUserWalletsConfig', config)
    this.$store.dispatch('userWallets/updateUserWallets')
    this.$store.dispatch('pageTitle/updatePageTitle', 'dashboard')
  }
}
</script>
