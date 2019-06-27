<template>
  <button
    class="pagination"
    :class="page === null ? 'pagination_disabled' :  'pagination_enabled'"
    :disabled="page === null"
  >
    <Arrow
      class="pagination__arrow"
      :class="type=='prev' ? 'pagination__arrow_type_prev' :  'pagination__arrow_type_next'"
    />
  </button>
</template>

<style lang="scss">
@import './Pagination.scss';
</style>

<script>
import Arrow from '@/assets/icons/Arrow.svg'

export default {
  components: { Arrow },
  props: {
    page: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
