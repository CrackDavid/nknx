<template>
  <div>
    <div class="page__node-manager">
      <div class="page__node-manager-heading">
        <div class="page__node-manager-left">
          <h1>{{$t(pageTitle)}}</h1>
          <NodeOnline v-if="totalNodes > 0" :filters="filters" />
        </div>

        <template v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'">
          <div class="page__node-manager-right">
            <Button theme="success" @click.native="openFastDeployModal">
              <span class="button__icon fe fe-upload-cloud"></span>
              {{$t('fastDeploy')}}
            </Button>
            <Button @click.native="openNewNodeModal">
              <span class="button__icon fe fe-plus"></span>
              {{$t('addNodes')}}
            </Button>
            <Button v-if="totalNodes > 0" theme="danger" @click.native="openDeleteAllNodesModal">
              <span class="button__icon fe fe-trash-2"></span>
              {{$t('deleteAllNodes')}}
            </Button>
          </div>
        </template>

        <template v-else>
          <div class="page__node-manager-mobile-controls">
            <Button class="page__node-manager-btn" theme="default" @click.native="isActions = true">
              <span style="margin-right: 0;" class="button__icon fe fe-more-horizontal"></span>
              <div
                :class="['node-manager__actions-modal node-manager__actions-modal_more', isActions === true ? 'node-manager__actions-modal_visible' : null]"
              >
                <div class="node-manager__actions-item" @click="openFastDeployModal">
                  <span class="node-manager__actions-icon fe fe-upload-cloud"></span>
                  <span class="node-manager__actions-title">{{$t('fastDeploy')}}</span>
                </div>
                <div class="node-manager__actions-item" @click="openDeleteAllNodesModal">
                  <span class="node-manager__actions-icon fe fe-trash-2"></span>
                  <span class="node-manager__actions-title">{{$t('deleteAllNodes')}}</span>
                </div>
              </div>
            </Button>
            <Button class="page__node-manager-btn" @click.native="openNewNodeModal">
              <span class="button__icon fe fe-plus"></span>
              {{$t('addNodes')}}
            </Button>
          </div>
        </template>
      </div>
      <NodeStats :nodes="totalNodes" :total="total" :daily="daily" :reward24="reward24" />
      <NodeFilter v-if="totalNodes > 0" :nodes="nodes" :filters="filters" />
    </div>

    <ContentWrapper v-if="totalNodes > 0">
      <Grid>
        <NodeSearchBar />
        <NodeManager v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'" :nodes="nodes" />
        <template v-else>
          <template v-if="!userConfig.loading">
            <NodeCardMobile v-for="node in nodes" :key="node.addr" :node="node" />
          </template>
          <template v-else>
            <WalletCardLoader v-for="(loader, index) in loaders" :key="index" />
          </template>
        </template>
      </Grid>
    </ContentWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ContentWrapper from '~/components/ContentWrapper/ContentWrapper.vue'
import Grid from '~/components/Grid/Grid.vue'
import NodeManager from '~/components/UserNodes/NodeManager/NodeManager.vue'
import NodeCardMobile from '~/components/UserNodes/NodeCardMobile/NodeCardMobile.vue'
import NodeStats from '~/components/UserNodes/NodeStats/NodeStats.vue'
import NodeOnline from '~/components/UserNodes/NodeOnline/NodeOnline.vue'
import NodeFilter from '~/components/UserNodes/NodeFilter/NodeFilter.vue'
import NodeSearchBar from '~/components/UserNodes/NodeSearchBar/NodeSearchBar.vue'
import Button from '~/components/Button/Button.vue'
import WalletCardLoader from '~/components/Loaders/WalletCardLoader/WalletCardLoader.vue'

export default {
  head() {
    return {
      title: this.$t('nodeManager')
    }
  },
  middleware: 'isAuth',
  components: {
    ContentWrapper,
    Grid,
    NodeManager,
    NodeStats,
    NodeOnline,
    NodeFilter,
    NodeSearchBar,
    Button,
    NodeCardMobile,
    WalletCardLoader
  },
  data: () => {
    return {
      nodes: [],
      filters: {},
      isActions: false,
      totalNodes: 0,
      total: 0,
      daily: 0,
      reward24: 0,
      loading: true,
      nextPage: null,
      prevPage: null,
      from: 0,
      to: 0,
      loaders: 10
    }
  },
  computed: {
    ...mapGetters({
      userNodes: 'userNodes/getUserNodes',
      userNodesStats: 'userNodes/getUserNodesStats',
      userConfig: 'userNodes/getUserConfig',
      pageTitle: 'pageTitle/getPageTitle'
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
      sort: 'relayMessageCount',
      order: 'desc',
      search: '',
      page: 1
    }
    this.$store.dispatch('userNodes/updateUserConfig', config)
    this.$store.dispatch('userNodes/updateUserNodes')
    this.$store.dispatch('pageTitle/updatePageTitle', 'myNodes')
  },
  mounted() {
    this.fetchNodesData()
  },
  methods: {
    openNewNodeModal() {
      this.$store.dispatch('modals/updateNewNodeModalVisible', true)
    },
    openDeleteAllNodesModal() {
      this.$store.dispatch('modals/updateDeleteAllNodesModalVisible', true)
    },
    openFastDeployModal() {
      this.$store.dispatch('modals/updateFastDeployModalVisible', true)
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
      this.total = this.userNodesStats.rewardAll
      this.reward24 = this.userNodesStats.reward24
      this.daily = Number(this.userNodes.sumNodeSnapshots[0].mined)
      this.totalNodes = this.userNodes.statCounts.ALL
      this.from = from
      this.to = to

      let newConfig = Object.assign({}, this.userConfig)
      newConfig.page = current_page
      newConfig.prevPage = prev_page_url != null ? current_page - 1 : null
      newConfig.nextPage = next_page_url != null ? current_page + 1 : null
      newConfig.loading = false
      this.$store.dispatch('userNodes/updateUserConfig', newConfig)
    }
  }
}
</script>
