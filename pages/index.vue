<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{$t('dashboard')}}</h1>
      <Grid>
        <GeneralMiningStats />
        <GeneralNetworkStats />
        <DailyBalance />
        <MediumNews />
        <MarketStats />
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import Grid from '~/components/Grid/Grid.vue'
import GeneralNetworkStats from '~/components/GeneralStats/GeneralNetworkStats.vue'
import GeneralMiningStats from '~/components/GeneralStats/GeneralMiningStats.vue'
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import MarketStats from '~/components/MarketStats/MarketStats.vue'
import MediumNews from '~/components/MediumNews/MediumNews.vue'
import DailyBalance from '~/components/DailyBalance/DailyBalance.vue'

export default {
  middleware: 'isAuth',
  components: {
    Grid,
    GeneralNetworkStats,
    GeneralMiningStats,
    ContentWrapper,
    MarketStats,
    MediumNews,
    DailyBalance
  },
  created() {
    const config = {
      page: 1,
      aggregate: 'hour'
    }
    this.$store.dispatch('userWallets/updateUserWalletsConfig', config)
    this.$store.dispatch('userWallets/updateUserWallets')
  }
}
</script>
