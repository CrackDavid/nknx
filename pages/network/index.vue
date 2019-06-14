<template>
  <div>
    <ContentWrapper>
      <Grid>
        <NetworkStatus/>
        <DailyTransactions/>
        <DailyBlocks/>
        <NetworkMap/>
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

export default {
  components: {
    ContentWrapper,
    Grid,
    NetworkStatus,
    DailyTransactions,
    DailyBlocks,
    NetworkMap
  }
}
</script>
