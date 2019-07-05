<template>
  <div>
    <div class="page__node-manager">
      <div class="page__node-manager-heading">
        <div class="page__node-manager-left">
          <h1>{{$t('myNodes')}}</h1>
          <NodeOnline v-if="totalNodes > 0" :filters="filters" />
        </div>
        <div class="page__node-manager-right">
          <Button @click.native="openNewNodeModal">
            <span class="button__icon fe fe-plus"></span>
            {{$t('addNodes')}}
          </Button>
        </div>
      </div>
      <NodeStats :nodes="totalNodes" :total="total" :daily="daily" />
      <NodeFilter v-if="totalNodes > 0" :nodes="nodes" :filters="filters" />
    </div>

    <ContentWrapper>
      <Grid>
        <NodeSearchBar :prevPage="prevPage" :nextPage="nextPage" />
        <NodeManager v-if="totalNodes > 0" :nodes="nodes" />
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NodeManager from '~/components/UserNodes/NodeManager/NodeManager.vue'
import NodeStats from '~/components/UserNodes/NodeStats/NodeStats.vue'
import NodeOnline from '~/components/UserNodes/NodeOnline/NodeOnline.vue'
import NodeFilter from '~/components/UserNodes/NodeFilter/NodeFilter.vue'
import NodeSearchBar from '~/components/UserNodes/NodeSearchBar/NodeSearchBar.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: {
    ContentWrapper,
    Grid,
    NodeManager,
    NodeStats,
    NodeOnline,
    NodeFilter,
    NodeSearchBar,
    Button
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
      from: 0,
      to: 0
    }
  },
  computed: {
    ...mapGetters({
      userNodes: 'userNodes/getUserNodes'
    })
  },
  watch: {
    userNodes: function(newNodes, oldNodes) {
      this.fetchNodesData()
    }
  },
  created() {
    const config = {
      filter: '',
      sort: '',
      order: 'desc',
      search: '',
      page: 1
    }
    this.$store.dispatch('userNodes/updateUserConfig', config)
    this.$store.dispatch('userNodes/updateUserNodes')
  },
  mounted() {
    this.fetchNodesData()
  },
  methods: {
    openNewNodeModal() {
      this.$store.dispatch('modals/updateNewNodeModalVisible', true)
    },
    fetchNodesData() {
      const {
        current_page,
        prev_page_url,
        next_page_url,
        from,
        to,
        data
      } = this.userNodes.nodes
      this.nodes = data
      this.filters = this.userNodes.statCounts
      this.total = this.userNodes.rewardAll
      this.daily = this.userNodes.rewardToday
      this.totalNodes = this.userNodes.statCounts.ALL
      this.from = from
      this.to = to
      this.currentPage = current_page
      this.prevPage = prev_page_url != null ? this.currentPage - 1 : null
      this.nextPage = next_page_url != null ? this.currentPage + 1 : null
      this.loading = false
    }
  }
}
</script>
