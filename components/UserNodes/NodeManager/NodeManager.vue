<template>
  <table class="node-manager">
    <thead>
      <th>
        <NodeCheckbox @click.native="selectAll()"/>
      </th>
      <th v-for="heading in headings" :key="heading">{{$t(heading)}}</th>
    </thead>
    <tbody>
      <tr v-for="node in nodes" :key="node.pivot.node_id">
        <td>
          <NodeCheckbox v-model="selected" :val="node"/>
        </td>
        <td>{{node.pivot.label}}</td>
        <td>{{node.addr}}</td>
        <td>
          <NodeStatus :status="node.syncState" :online="node.online"/>
        </td>
        <td>{{node.latestBlockHeight}}</td>
        <td>{{node.version | nodeVersion}}</td>
        <td>{{node.relayMessageCount}}</td>
        <td>
          <span class="node-manager__actions fe fe-more-horizontal"></span>
        </td>
      </tr>
    </tbody>
  </table>
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
      headings: [
        'name',
        'ipAddress',
        'status',
        'latestBlock',
        'currentVersion',
        'relayedMessages',
        'actions'
      ],
      selected: [],
      isAll: false
    }
  },
  mounted: function() {
    console.log(this.nodes)
  },
  methods: {
    selectAll() {
      this.isAll = !this.isAll
      this.isAll === true ? (this.selected = this.nodes) : (this.selected = [])
    }
  }
}
</script>
