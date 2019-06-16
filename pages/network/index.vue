<template>
  <div>
    <ContentWrapper>
      <Grid>
        <NetworkStatus/>
        <DailyTransactions/>
        <DailyBlocks/>
        <NetworkMap/>
        <CountryList/>
        <Releases/>
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NetworkStatus from '~/components/NetworkStatus/NetworkStatus.vue'
import DailyTransactions from '~/components/DailyTransactions/DailyTransactions.vue'
import DailyBlocks from '~/components/DailyBlocks/DailyBlocks.vue'
import NetworkMap from '~/components/NetworkMap/NetworkMap.vue'
import Releases from '~/components/Releases/Releases.vue'
import CountryList from '~/components/CountryList/CountryList.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    NetworkStatus,
    DailyTransactions,
    DailyBlocks,
    NetworkMap,
    Releases,
    CountryList
  }
}
</script>
