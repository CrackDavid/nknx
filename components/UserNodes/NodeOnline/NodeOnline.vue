<template>
  <div class="node-online">
    <span
      :class="['node-online__status', offlineNodes === false ? 'node-online__status_positive' : 'node-online__status_negative']"
    ></span>
    <template v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'">
      <span v-if="offlineNodes === false" class="node-online__title">{{$t('allNodesAreMining')}}</span>
      <span
        v-else
        class="node-online__title"
      >{{offlineNodes}} {{$t('of')}} {{filters.ALL}} {{$t('areNotMining')}}</span>
    </template>
  </div>
</template>

<style lang="scss">
@import './NodeOnline.scss';
</style>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      userNodes: 'userNodes/getUserNodes'
    })
  },
  watch: {
    userNodes: function(newVal, oldVal) {
      this.calcOnline()
    }
  },
  mounted: function() {
    this.calcOnline()
  },
  destroyed() {},
  methods: {
    calcOnline() {
      this.offlineNodes = false
      Object.keys(this.filters).forEach(key => {
        if (
          this.filters[key] > 0 &&
          key !== 'ALL' &&
          key !== 'PERSIST_FINISHED'
        ) {
          this.offlineNodes += this.filters[key]
        }
      })
    }
  }
}
</script>
