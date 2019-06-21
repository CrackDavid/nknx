<template>
  <v-client-table :columns="columns" :data="nodes" :options="options" class="node-manager">
    <template slot="h__check">
      <input type="checkbox" id="checkbox" @click="selectAll()">
    </template>
    <template slot="check" slot-scope="props">
      <input type="checkbox" :checked="props.row.selected" v-model="checked" :value="props.row">
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

export default {
  components: { NodeStatus },
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
      checked: [],
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
        filterable: ['pivot.label', 'latestBlockHeight']
      }
    }
  },
  mounted: function() {},
  methods: {
    selectAll() {
      this.isAll = !this.isAll
      this.isAll === true ? (this.checked = this.nodes) : (this.checked = [])
    }
  }
}
</script>
