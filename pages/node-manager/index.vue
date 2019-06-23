<template>
  <div>
    <ContentWrapper>
      <h1 class="page__title">{{$t('myNodes')}}</h1>
      <Grid>
        <NodeManager v-if="nodes.length > 0" :nodes="nodes"/>
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NodeManager from '~/components/UserNodes/NodeManager/NodeManager.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    NodeManager
  },
  data: () => {
    return {
      nodes: []
    }
  },
  mounted() {
    this.getNodes()
  },
  methods: {
    getNodes() {
      const self = this
      this.$axios.$get('nodes').then(response => {
        self.nodes = response
      })
    }
  }
}
</script>
