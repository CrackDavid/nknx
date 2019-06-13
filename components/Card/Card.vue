<template>
  <div
    class="card"
    :class="[col ? `card_col_${col}` : null, row ? `card_row_${row}` : null, padding ? `card_padding_${padding}` : null]"
  >
    <slot/>
  </div>
</template>

<style lang="scss">
@import './Card.scss';
</style>

<script>
export default {
  components: {},
  props: {
    col: {
      type: String,
      default: '12'
    },
    row: {
      type: String,
      default: '1'
    },
    padding: {
      type: String,
      default: 'normal'
    }
  },
  data: () => {
    return {}
  },
  mounted: function() {},
  methods: {}
}
</script>
