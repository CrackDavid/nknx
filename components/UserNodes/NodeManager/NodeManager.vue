<template>
  <div class="overflow-x node-manager__wrapper">
    <table class="node-manager">
      <thead>
        <th
          v-for="heading in headings"
          :key="heading.title"
          :class="active === heading.value && heading.value.length > 0 ? 'node-manager__sort_active' : null"
          @click="heading.value.length > 0 ? sortNodes(heading.value) : null"
        >
          <span class="node-manager__sort-title">
            {{$t(heading.title)}}
            <span
              :class="['node-manager__sort-icon fe', order !== true ? 'fe-chevron-down' : 'fe-chevron-up']"
            ></span>
          </span>
        </th>
      </thead>
      <template v-if="userConfig.loading">
        <tr v-for="headingLoader in headings" :key="headingLoader">
          <td :colspan="headings.length">
            <TableRowLoader />
          </td>
        </tr>
      </template>

      <template v-else>
        <tbody>
          <tr
            v-for="node in nodes"
            :key="node.pivot.node_id"
            :class="node.syncState === 'OFFLINE' ? 'node-manager_state_offline' : null"
          >
            <td>{{node.addr}}</td>
            <td>{{node.pivot.label}}</td>
            <td>
              <NodeStatus :status="node.syncState" />
            </td>
            <td>{{node.height}}</td>
            <td>{{node.version | nodeVersion}}</td>
            <td>{{node.relayMessageCount}}</td>
            <td>
              <NodeMiningHistoryChart
                v-if="node.node_snapshots.length > 0 && node.syncState !== 'OFFLINE'"
                :data="node.node_snapshots"
                :state="node.syncState"
              />
              <span
                v-if="node.syncState === 'OFFLINE' || node.node_snapshots.length === 0"
              >{{$t('n/a')}}</span>
            </td>
            <td>
              <span
                class="node-manager__actions fe fe-more-horizontal"
                @mouseenter="isActions = node.id"
              >
                <div
                  :class="['node-manager__actions-modal', isActions === node.id ? 'node-manager__actions-modal_visible' : null]"
                  @mouseleave="isActions = false"
                  @click="openDeleteNodeModal(node)"
                >
                  <div class="node-manager__actions-item">
                    <span class="node-manager__actions-icon fe fe-trash-2"></span>
                    <span class="node-manager__actions-title">{{$t('delete')}}</span>
                  </div>
                </div>
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>

<style lang="scss">
@import './NodeManager.scss';
</style>

<script>
import { mapGetters } from 'vuex'

import NodeStatus from '~/components/UserNodes/NodeStatus/NodeStatus.vue'
import NodeMiningHistoryChart from '~/components/Charts/NodeMiningHistoryChart.vue'
import TableRowLoader from '~/components/Loaders/TableRowLoader/TableRowLoader.vue'

export default {
  components: { NodeStatus, NodeMiningHistoryChart, TableRowLoader },
  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      headings: [
        { value: 'addr', title: 'ipAddress' },
        { value: 'node_user.label', title: 'name' },
        { value: '', title: 'status' },
        { value: '', title: 'latestBlock' },
        { value: '', title: 'currentVersion' },
        { value: 'relayMessageCount', title: 'relayedMessages' },
        { value: '', title: 'miningHistory' },
        { value: '', title: 'actions' }
      ],
      selected: [],
      isAll: false,
      active: 'relayMessageCount',
      order: false,
      isActions: false,
      loaderCount: 10
    }
  },
  computed: {
    ...mapGetters({
      userConfig: 'userNodes/getUserConfig'
    })
  },
  mounted: function() {},
  methods: {
    sortNodes(sort) {
      if (this.active === sort) {
        this.order = !this.order
      } else {
        this.order = false
      }
      this.active = sort

      const currentOrder = this.order === true ? 'asc' : 'desc'
      let newConfig = Object.assign({}, this.userConfig)
      newConfig.order = currentOrder
      newConfig.sort = this.active

      this.$store.dispatch('userNodes/updateUserConfig', newConfig)
      this.$store.dispatch('userNodes/updateUserNodes')
    },
    selectAll() {
      this.isAll = !this.isAll
      this.isAll === true ? (this.selected = this.nodes) : (this.selected = [])
    },
    openDeleteNodeModal(node) {
      this.$store.dispatch('activeNode/updateActiveNode', node)
      this.$store.dispatch('modals/updateDeleteNodeModalVisible', true)
    }
  }
}
</script>
