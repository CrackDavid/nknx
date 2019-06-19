<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{$t('dashboard')}}</h1>
      <Grid>
        <GeneralStats/>
        <GeneralStats/>
        <GeneralStats/>
        <MediumNews/>
        <MarketStats/>
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import Grid from '~/components/Grid/Grid.vue'
import GeneralStats from '~/components/GeneralStats/GeneralStats.vue'
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import MarketStats from '~/components/MarketStats/MarketStats.vue'
import MediumNews from '~/components/MediumNews/MediumNews.vue'

export default {
  components: { Grid, GeneralStats, ContentWrapper, MarketStats, MediumNews }
}
</script>
