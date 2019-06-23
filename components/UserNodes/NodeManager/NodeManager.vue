<template>
  <v-client-table :columns="columns" :data="nodes" :options="options" class="node-manager">
    <template slot="h__check">
      <NodeCheckbox @click.native="selectAll()"/>
    </template>
    <template slot="check" slot-scope="props">
      <NodeCheckbox v-model="selected" :val="props.row"/>
    </template>
    <template slot="syncState" slot-scope="props">
      <NodeStatus :status="props.row.syncState" :online="props.row.online"/>
    </template>
  </v-client-table>
</template>

<style lang="scss">
@import './NodeManager.scss';
</style>

<script>
import NodeStatus from '~/components/UserNodes/NodeStatus/NodeStatus.vue'
import NodeCheckbox from '~/components/UserNodes/NodeCheckbox/NodeCheckbox.vue'

export default {
  components: { NodeStatus, NodeCheckbox },
  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      columns: [
        'check',
        'pivot.label',
        'addr',
        'syncState',
        'latestBlockHeight',
        'sversion',
        'relayMessageCount',
        'actions'
      ],
      selected: [],
      isAll: false,
      options: {
        headings: {
          'pivot.label': 'name',
          addr: 'ipAddress',
          syncState: 'status',
          latestBlockHeight: 'latestBlock',
          sversion: 'currentVersion',
          relayMessageCount: 'relayedMessages',
          actions: 'actions'
        },
        sortable: ['pivot.label', 'latestBlockHeight'],
        filterable: ['pivot.label', 'latestBlockHeight'],
        rowClassCallback(row) {
          return row.online !== true ? 'node-manager_state_offline' : null
        }
      }
    }
  },
  mounted: function() {},
  methods: {
    selectAll() {
      this.isAll = !this.isAll
      this.isAll === true ? (this.selected = this.nodes) : (this.selected = [])
    }
  }
}
</script>
