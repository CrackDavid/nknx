<template>
  <ul class="settings-tabs">
    <li
      v-for="tab in tabs"
      :key="tab"
      :class="['settings-tabs__item', tab === active ? 'settings-tabs__item_active' : null]"
      @click="changeTab(tab)"
      @mousemove="markerMove"
      @mouseleave="markerInitialize"
    >{{$t(tab)}}</li>
    <li class="settings-tabs__marker"></li>
  </ul>
</template>

<style lang="scss">
@import './SettingsTabs.scss';
</style>

<script>
export default {
  components: {},
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    onTabChange: {
      type: Function,
      default: () => {}
    }
  },
  data: () => {
    return {
      active: 'myAccount'
    }
  },
  destroyed() {},
  mounted: function() {
    this.markerInitialize()
  },
  methods: {
    changeTab(tab) {
      this.active = tab
      this.$emit('onTabChange', tab)
    },
    markerInitialize() {
      const marker = document.getElementsByClassName('settings-tabs__marker')[0]
      const currentActiveElement = document.getElementsByClassName(
        'settings-tabs__item_active'
      )[0]
      const currentActiveElementOffset = currentActiveElement.offsetLeft
      const currentActiveElementWidth = currentActiveElement.offsetWidth
      marker.style.left = currentActiveElementOffset + 'px'
      marker.style.width = currentActiveElementWidth + 'px'
    },
    markerMove(e) {
      const marker = document.getElementsByClassName('settings-tabs__marker')[0]
      const currentElement = e.target
      const currentElementOffset = currentElement.offsetLeft
      const currentActiveElementWidth = currentElement.offsetWidth
      marker.style.left = currentElementOffset + 'px'
      marker.style.width = currentActiveElementWidth + 'px'
    }
  }
}
</script>
