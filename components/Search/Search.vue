<template>
  <div class="search" :class="[`search_type_${type}`, error.length > 0 ? 'search_error' : null]">
    <span class="search__icon fe fe-search"></span>
    <input type="text" class="search__control" :placeholder="error.length > 0  ? error : text">
  </div>
</template>

<style lang="scss">
@import './Search';
</style>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {}
  },
  mounted: function() {},
  methods: {}
}
</script>
