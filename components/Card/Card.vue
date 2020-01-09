<template>
  <div
    class="card"
    :class="[
      col ? `card_col_${col}` : null,
      colStart ? `card_col-start_${colStart}` : null,
      colEnd ? `card_col-end_${colEnd}` : null,
      row ? `card_row_${row}` : null,
      padding ? `card_padding_${padding}` : null,
      hover ? 'card_hover' : null
    ]"
  >
    <slot />
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
    colStart: {
      type: String,
      default: 'auto'
    },
    colEnd: {
      type: String,
      default: 'auto'
    },
    row: {
      type: String,
      default: '1'
    },
    padding: {
      type: String,
      default: 'normal'
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {}
  },
  mounted: function() {},
  methods: {}
}
</script>
