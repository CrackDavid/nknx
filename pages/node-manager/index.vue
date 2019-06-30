<template>
  <div>
    <div class="page__node-manager">
      <div class="page__node-manager-heading">
        <h1>{{$t('myNodes')}}</h1>
        <NodeOnline v-if="totalNodes > 0" :filters="filters" />
      </div>
      <NodeStats :nodes="totalNodes" :total="total" :daily="daily" />
      <NodeFilter v-if="totalNodes > 0" :nodes="nodes" :filters="filters" @getNodes="getNodes" />
    </div>

    <ContentWrapper>
      <Grid>
        <NodeSearchBar
          :prevPage="prevPage"
          :nextPage="nextPage"
          :currentPage="currentPage"
          :activeFilter="activeFilter"
          :activeSort="activeSort"
          :activeOrder="activeOrder"
          @getNodes="getNodes"
        />
        <NodeManager
          v-if="totalNodes > 0"
          :nodes="nodes"
          :currentPage="currentPage"
          :activeFilter="activeFilter"
          @getNodes="getNodes"
        />
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
import NodeSearchBar from '~/components/UserNodes/NodeSearchBar/NodeSearchBar.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    NodeManager,
    NodeStats,
    NodeOnline,
    NodeFilter,
    NodeSearchBar
  },
  data: () => {
    return {
      nodes: [],
      filters: {},
      totalNodes: 0,
      total: 0,
      daily: 0,
      loading: true,
      nextPage: null,
      prevPage: null,
      currentPage: 1,
      activeFilter: '',
      from: 0,
      to: 0,
      activeSort: 'node_user.label',
      activeOrder: 'desc',
      activeSearch: ''
    }
  },
  mounted() {
    this.getNodes(
      this.currentPage,
      this.activeFilter,
      this.activeSort,
      this.activeOrder
    )
  },
  methods: {
    getNodes(page, filter, sort, order, search) {
      const self = this
      // Checking if page and filter exists
      if (page === null) {
        return false
      }

      if (filter === undefined) {
        filter = self.activeFilter
      } else {
        self.activeFilter = filter
      }

      if (sort === undefined) {
        sort = self.activeSort
      } else {
        self.activeSort = sort
      }

      if (order === undefined) {
        order = self.activeOrder
      } else {
        self.activeOrder = order
      }

      if (search === undefined) {
        search = self.activeSearch
      } else {
        self.activeSearch = search
      }

      self.loading = true
      // Disabling pagination untill data fetched
      self.nextPage = null
      self.prevPage = null
      // Fetcing data

      this.$axios
        .$get(
          `nodes?page=${page}&syncState=${filter}&orderBy=${sort}&order=${order}&search=${search}`
        )
        .then(response => {
          const {
            current_page,
            prev_page_url,
            next_page_url,
            from,
            to
          } = response.nodes

          self.filters = response.statCounts
          self.nodes = response.nodes.data
          self.filteredNodes = self.nodes
          self.total = response.rewardAll
          self.daily = response.rewardToday
          self.totalNodes = response.statCounts.ALL
          self.from = from
          self.to = to
          self.currentPage = current_page
          self.prevPage = prev_page_url != null ? self.currentPage - 1 : null
          self.nextPage = next_page_url != null ? self.currentPage + 1 : null
          self.loading = false
        })
    }
  }
}
</script>
