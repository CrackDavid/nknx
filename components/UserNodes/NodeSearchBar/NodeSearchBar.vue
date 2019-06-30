<template>
  <div class="node-search-bar">
    <div class="node-search-bar__search">
      <input
        v-model="searchInput"
        class="node-search-bar__control"
        type="text"
        :placeholder="$t('searchAllNodes')"
        @input="search(searchInput)"
      />
    </div>
    <div class="node-search-bar__pagination">
      <Pagination :page="prevPage" type="prev" @click.native="$emit('getNodes', prevPage)" />
      <Pagination :page="nextPage" type="next" @click.native="$emit('getNodes', nextPage)" />
    </div>
  </div>
</template>

<style lang="scss">
@import './NodeSearchBar.scss';
</style>

<script>
import Pagination from '~/components/Pagination/Pagination'
import debounce from 'lodash.debounce'

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
    },
    currentPage: {
      type: Number,
      default: 1
    },
    activeFilter: {
      type: String,
      default: ''
    },
    activeSort: {
      type: String,
      default: 'node_user.label'
    },
    activeOrder: {
      type: String,
      default: 'desc'
    }
  },
  data: () => {
    return {
      searchInput: ''
    }
  },
  destroyed() {},
  mounted: function() {},
  methods: {
    search: debounce(function(searchInput) {
      this.$emit(
        'getNodes',
        this.currentPage,
        this.activeFilter,
        this.activeSort,
        this.activeOrder,
        searchInput
      )
    }, 1500)
  }
}
</script>
