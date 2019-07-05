<template>
  <div class="node-search-bar">
    <div class="node-search-bar__search">
      <input
        v-model.trim="searchInput"
        class="node-search-bar__control"
        type="text"
        :placeholder="$t('searchAllNodes')"
        @input="search(searchInput)"
      />
    </div>
    <div class="node-search-bar__pagination">
      <Pagination :page="prevPage" type="prev" @click.native="changePage(prevPage)" />
      <Pagination :page="nextPage" type="next" @click.native="changePage(nextPage)" />
    </div>
  </div>
</template>

<style lang="scss">
@import './NodeSearchBar.scss';
</style>

<script>
import { mapGetters } from 'vuex'

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
    }
  },
  data: () => {
    return {
      searchInput: ''
    }
  },
  computed: {
    ...mapGetters({
      userConfig: 'userNodes/getUserConfig'
    })
  },
  destroyed() {},
  mounted: function() {},
  methods: {
    changePage(page) {
      let newConfig = Object.assign({}, this.userConfig)
      newConfig.page = page
      this.$store.dispatch('userNodes/updateUserConfig', newConfig)
      this.$store.dispatch('userNodes/updateUserNodes')
    },
    search: debounce(function(searchInput) {
      let newConfig = Object.assign({}, this.userConfig)
      newConfig.search = searchInput
      this.$store.dispatch('userNodes/updateUserConfig', newConfig)
      this.$store.dispatch('userNodes/updateUserNodes')
    }, 1500)
  }
}
</script>
