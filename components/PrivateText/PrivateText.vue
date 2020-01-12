<template>
  <span>
    <span
      v-if="text !== null"
      :class="['table__item-action', isVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
      @click="isVisible = !isVisible"
    />
    <span v-if="isVisible"> {{ text }} </span>
    <span v-else>{{ hideString(text) }}</span>
  </span>
</template>

<style lang="scss">
@import './PrivateText.scss';
</style>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      isVisible: false
    }
  },
  mounted: function() {},
  methods: {
    hideString(x) {
      if (x !== null) {
        const template = '*'.repeat(x.length)
        return x.replace(x, template)
      } else {
        return 'n/a'
      }
    }
  }
}
</script>
