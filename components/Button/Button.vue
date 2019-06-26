<template>
  <button
    v-if="type=='button'"
    class="button"
    :class="[theme ? `button_theme_${theme}` : null, full ? `button_full` : null]"
    @click="onClickButton"
  >
    <slot/>
  </button>
  <a
    v-else-if="type==='link'"
    :href="url"
    target="_blank"
    class="button"
    :class="[theme ? `button_theme_${theme}` : null, full ? `button_full` : null]"
  >
    <slot/>
  </a>
  <nuxt-link
    v-else-if="type==='router'"
    :to="localePath(url)"
    class="button"
    :class="[theme ? `button_theme_${theme}` : null, full ? `button_full` : null]"
  >
    <slot/>
  </nuxt-link>
</template>

<style lang="scss">
@import './Button';
</style>

<script>
export default {
  components: {},
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    },
    url: {
      type: String,
      default: ''
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {}
  },
  mounted: function() {},
  methods: {
    onClickButton(event) {
      this.$emit('clicked', '')
    }
  }
}
</script>
