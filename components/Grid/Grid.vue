<template>
  <div :class="['grid', customHeight ? 'grid_custom-height' : null]">
    <slot />
  </div>
</template>

<style lang="scss">
@import './Grid.scss';
</style>

<script>
export default {
  components: {},
  props: {
    customHeight: {
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
