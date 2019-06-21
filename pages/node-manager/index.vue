<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{$t('myNodes')}}</h1>
      <Grid>
        <NodeManager/>
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NodeManager from '~/components/NodeManager/NodeManager.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    NodeManager
  },
  data: () => {
    return {}
  },
  methods: {}
}
</script>
