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
      <Pagination
        :page="userConfig.prevPage"
        type="prev"
        @click.native="changePage(userConfig.prevPage)"
      />
      <Pagination
        :page="userConfig.nextPage"
        type="next"
        @click.native="changePage(userConfig.nextPage)"
      />
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
  props: {},
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
      newConfig.prevPage = null
      newConfig.nextPage = null
      newConfig.loading = true
      this.$store.dispatch('userNodes/updateUserConfig', newConfig)
      this.$store.dispatch('userNodes/updateUserNodes')
    },
    search: debounce(function(searchInput) {
      let newConfig = Object.assign({}, this.userConfig)
      newConfig.search = searchInput
      newConfig.prevPage = null
      newConfig.nextPage = null
      newConfig.loading = true
      this.$store.dispatch('userNodes/updateUserConfig', newConfig)
      this.$store.dispatch('userNodes/updateUserNodes')
    }, 1500)
  }
}
</script>
