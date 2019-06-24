<template>
  <div>
    <div class="page__node-manager">
      <div class="page__node-manager-heading">
        <h1>{{$t('myNodes')}}</h1>
        <NodeOnline :nodes="nodes"/>
      </div>
      <NodeStats :nodes="nodes.length"/>
    </div>

    <ContentWrapper>
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
import NodeStats from '~/components/UserNodes/NodeStats/NodeStats.vue'
import NodeOnline from '~/components/UserNodes/NodeOnline/NodeOnline.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    NodeManager,
    NodeStats,
    NodeOnline
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
