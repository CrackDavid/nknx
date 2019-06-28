<template>
  <div class="node-search-bar">
    <div class="node-search-bar__search">
      <input class="node-search-bar__control" type="text" :placeholder="$t('searchAllNodes')">
    </div>
    <div class="node-search-bar__pagination">
      <Pagination :page="prevPage" type="prev" @click.native="$emit('getNodes', prevPage)"/>
      <Pagination :page="nextPage" type="next" @click.native="$emit('getNodes', nextPage)"/>
    </div>
  </div>
</template>

<style lang="scss">
@import './NodeSearchBar.scss';
</style>

<script>
import Pagination from '~/components/Pagination/Pagination'

export default {
  components: { Pagination },
  props: {
    prevPage: {
      type: Number,
      default: null
    },
    nextPage: {
      type: Number,
      default: null
    }
  },
  data: () => {
    return {}
  },
  destroyed() {},
  mounted: function() {},
  methods: {}
}
</script>
