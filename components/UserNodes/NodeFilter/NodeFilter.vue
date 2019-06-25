<template>
  <ul class="node-filter">
    <li
      v-for="filter in filters"
      :key="filter.title"
      :class="['node-filter__item', filter.state === active ? 'node-filter__item_active' : null]"
      @click="filterNodes(filter)"
      @mousemove="markerMove"
      @mouseleave="markerInitialize"
    >{{$t(filter.title)}}</li>
    <li class="node-filter__marker"></li>
  </ul>
</template>

<style lang="scss">
@import './NodeFilter.scss';
</style>

<script>
export default {
  components: {},
  props: {
    nodes: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return {
      active: 'All',
      filters: [
        {
          state: 'All',
          title: 'All'
        },
        {
          state: 'PERSIST_FINISHED',
          title: 'PersistFinished'
        },
        {
          state: 'WAIT_FOR_SYNCING',
          title: 'WaitForSyncing'
        },
        {
          state: 'SYNC_FINISHED ',
          title: 'SyncFinished'
        },
        {
          state: 'SYNC_STARTED ',
          title: 'SyncStarted'
        }
      ]
    }
  },
  destroyed() {},
  mounted: function() {
    this.markerInitialize()
  },
  methods: {
    filterNodes(filterItem) {
      const { state } = filterItem
      let filteredNodes = []

      if (state === 'All') {
        filteredNodes = this.nodes
      } else {
        filteredNodes = this.nodes.filter(node => {
          return node.syncState === state
        })
      }
      this.active = state
      this.$emit('getFilteredNodes', filteredNodes)
    },
    markerInitialize() {
      const marker = document.getElementsByClassName('node-filter__marker')[0]
      const currentActiveElement = document.getElementsByClassName(
        'node-filter__item_active'
      )[0]
      const currentActiveElementOffset = currentActiveElement.offsetLeft
      const currentActiveElementWidth = currentActiveElement.offsetWidth
      marker.style.left = currentActiveElementOffset + 'px'
      marker.style.width = currentActiveElementWidth + 'px'
    },
    markerMove(e) {
      const marker = document.getElementsByClassName('node-filter__marker')[0]
      const currentElement = e.target
      const currentElementOffset = currentElement.offsetLeft
      const currentActiveElementWidth = currentElement.offsetWidth
      marker.style.left = currentElementOffset + 'px'
      marker.style.width = currentActiveElementWidth + 'px'
    }
  }
}
</script>
