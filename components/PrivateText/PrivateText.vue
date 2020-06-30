<template>
  <span class="private-text">
    <template v-if="$mq !== 'md' && $mq !== 'sm' && $mq !== 'xs'">
      <span
        v-if="text !== null"
        :class="[
          'private-text__eye',
          isVisible ? 'fe fe-eye-off' : 'fe fe-eye'
        ]"
        @click="isVisible = !isVisible"
      />
      <span v-if="isVisible"> {{ text }} </span>
      <span v-else>{{ hideString(text) }}</span>
    </template>
    <template v-else>
      <span
        v-if="!isVisible"
        class="private-text__reveal"
        @click="isVisible = !isVisible"
        >{{ $t('clickToReveal') }}</span
      >
      <span v-else>{{ text }}</span>
    </template>
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
