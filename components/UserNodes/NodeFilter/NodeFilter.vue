<template>
  <ul class="node-filter">
    <li
      v-for="(filterCount, filterName) in filters"
      :key="filterName"
      :class="['node-filter__item', filterName === active ? 'node-filter__item_active' : null]"
      @click="filterNodes(filterName)"
      @mousemove="markerMove"
      @mouseleave="markerInitialize"
    >{{filterName}} ({{filterCount}})</li>
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
    },
    filters: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      active: 'ALL'
    }
  },
  destroyed() {},
  mounted: function() {
    this.markerInitialize()
  },
  methods: {
    filterNodes(filterItem) {
      let filter = filterItem
      this.active = filterItem
      if (filterItem === 'ALL') {
        filter = ''
      }
      this.$emit('getNodes', 1, filter)
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
