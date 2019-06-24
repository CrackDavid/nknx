<template>
  <div class="node-online">
    <span
      :class="['node-online__status', offlineNodes === 0 ? 'node-online__status_positive' : 'node-online__status_negative']"
    ></span>
    <span v-if="offlineNodes === 0" class="node-online__title">{{$t('allNodesAreOnline')}}</span>
    <span
      v-else
      class="node-online__title"
    >{{offlineNodes}} {{$t('of')}} {{$t('nodes')}} {{nodes.length}} {{$t('areOffline')}}</span>
  </div>
</template>

<style lang="scss">
@import './NodeOnline.scss';
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
      offlineNodes: 0
    }
  },
  destroyed() {},
  mounted: function() {
    this.nodes.forEach(node => {
      if (!node.online) {
        this.offlineNodes += 1
      }
    })
  },
  methods: {}
}
</script>
