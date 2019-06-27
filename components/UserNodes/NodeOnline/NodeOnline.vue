<template>
  <div class="node-online">
    <span
      :class="['node-online__status', offlineNodes === false ? 'node-online__status_positive' : 'node-online__status_negative']"
    ></span>
    <span v-if="offlineNodes === false" class="node-online__title">{{$t('allNodesAreMining')}}</span>
    <span
      v-else
      class="node-online__title"
    >{{offlineNodes}} {{$t('of')}} {{$t('nodes')}} {{filters.ALL}} {{$t('areNotMining')}}</span>
  </div>
</template>

<style lang="scss">
@import './NodeOnline.scss';
</style>

<script>
export default {
  components: {},
  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      offlineNodes: false
    }
  },
  destroyed() {},
  mounted: function() {
    Object.keys(this.filters).forEach(key => {
      if (
        this.filters[key] > 0 &&
        key !== 'ALL' &&
        key !== 'PERSIST_FINISHED'
      ) {
        this.offlineNodes += this.filters[key]
      }
    })
  },
  methods: {}
}
</script>
