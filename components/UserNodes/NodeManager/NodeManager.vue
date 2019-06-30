<template>
  <table class="node-manager">
    <thead>
      <th>
        <NodeCheckbox @click.native="selectAll()" />
      </th>
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
    <tbody>
      <tr v-for="node in nodes" :key="node.pivot.node_id">
        <td>
          <NodeCheckbox v-model="selected" :val="node" />
        </td>
        <td>{{node.pivot.label}}</td>
        <td>{{node.addr}}</td>
        <td>
          <NodeStatus :status="node.syncState" />
        </td>
        <td>{{node.height}}</td>
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
    },
    currentPage: {
      type: Number,
      default: 1
    },
    activeFilter: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      headings: [
        { value: 'node_user.label', title: 'name' },
        { value: 'addr', title: 'ipAddress' },
        { value: '', title: 'status' },
        { value: '', title: 'latestBlock' },
        { value: '', title: 'currentVersion' },
        { value: '', title: 'relayedMessages' },
        { value: '', title: 'actions' }
      ],
      selected: [],
      isAll: false,
      active: 'node_user.label',
      order: false
    }
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

      const currentSort = this.order === true ? 'asc' : 'desc'
      this.$emit(
        'getNodes',
        this.currentPage,
        this.activeFilter,
        sort,
        currentSort
      )
    },
    selectAll() {
      this.isAll = !this.isAll
      this.isAll === true ? (this.selected = this.nodes) : (this.selected = [])
    }
  }
}
</script>
