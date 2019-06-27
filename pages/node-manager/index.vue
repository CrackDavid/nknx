<template>
  <div>
    <div class="page__node-manager">
      <div class="page__node-manager-heading">
        <h1>{{$t('myNodes')}}</h1>
        <NodeOnline v-if="!loading && filters.ALL > 0" :filters="filters"/>
      </div>
      <NodeStats :nodes="totalNodes" :total="total | nknValue" :daily="daily"/>
      <NodeFilter
        v-if="nodes.length>0"
        :nodes="nodes"
        :filters="filters"
        @getFilteredNodes="getFilteredNodes"
      />
    </div>

    <ContentWrapper>
      <Grid>
        <NodeManager v-if="nodes.length > 0" :nodes="filteredNodes"/>
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
import NodeFilter from '~/components/UserNodes/NodeFilter/NodeFilter.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    NodeManager,
    NodeStats,
    NodeOnline,
    NodeFilter
  },
  data: () => {
    return {
      nodes: [],
      filteredNodes: [],
      filters: {},
      totalNodes: 0,
      total: 0,
      daily: 0,
      loading: true
    }
  },
  mounted() {
    this.getNodes()
  },
  methods: {
    getNodes() {
      const self = this
      this.$axios.$get('nodes').then(response => {
        self.filters = response.statCounts
        self.nodes = response.nodes.data
        self.filteredNodes = self.nodes
        self.total = response.rewardAll
        self.today = response.rewardToday
        self.totalNodes = response.statCounts.ALL
        self.loading = false
      })
    },
    getFilteredNodes(filtered) {
      this.filteredNodes = filtered
    }
  }
}
</script>
